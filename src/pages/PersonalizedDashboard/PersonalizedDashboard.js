import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePanchangam } from '../../hooks/usePanchangam';
import { useSadhana } from '../../hooks/useSadhana';
import MeditationTimer from '../../components/MeditationTimer/MeditationTimer';
import StreakCalendar from '../../components/StreakCalendar/StreakCalendar';
import { getDailyChallenge } from '../../data/dharmaChallenges';
import { getLearningPathway } from '../../data/learningPathways';
import { getWeeklyShloka } from '../../data/shlokaMastery';
import EditGoalsModal from '../../components/EditGoalsModal/EditGoalsModal';
import ShlokaCardModal from '../../components/ShlokaCardModal/ShlokaCardModal';
import './PersonalizedDashboard.css';

const PersonalizedDashboard = () => {
  
  const [isMeditationTimerOpen, setIsMeditationTimerOpen] = useState(false);
  
  // User state
  const [userName, setUserName] = useState('');
  const [greeting, setGreeting] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  
  const [isEditGoalsOpen, setIsEditGoalsOpen] = useState(false);
  
  const { 
    goals: userGoals, 
    customGoals, 
    addCustomGoal, 
    removeCustomGoal, 
    toggleGoal, 
    streak,
    completionHistory,
    pathwayProgress,
    incrementPathwayProgress,
    shlokaPracticeDays,
    incrementShlokaPractice
  } = useSadhana(false);

  // Content state
  const dailyChallenge = getDailyChallenge();
  const currentPathway = getLearningPathway('gita_basics');
  const currentLesson = currentPathway.lessons.find(l => l.day === pathwayProgress) || currentPathway.lessons[currentPathway.lessons.length - 1];
  const weeklyShloka = getWeeklyShloka();
  
  // UI state
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  
  // Shloka Card Modal state
  const [isShlokaModalOpen, setIsShlokaModalOpen] = useState(false);
  
  // Continue reading state
  const [lastRead, setLastRead] = useState(null);

  const { panchangamData, loading: panchangamLoading, currentCity, setCity, cities } = usePanchangam();
  
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Load user preferences & reading history
  useEffect(() => {
    const savedName = localStorage.getItem('userName') || '';
    setUserName(savedName);

    try {
      const savedReading = localStorage.getItem('divine_path_last_read');
      if (savedReading) {
        setLastRead(JSON.parse(savedReading));
      }
    } catch (e) {
      console.warn('Failed to parse last read record', e);
    }
    
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) setGreeting('Good Morning');
      else if (hour < 18) setGreeting('Good Afternoon');
      else setGreeting('Good Evening');
    };
    
    updateGreeting();
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setUserName(newName);
    if (newName.trim()) {
      localStorage.setItem('userName', newName);
    }
  };

  const handleNameKeyPress = (e) => {
    if (e.key === 'Enter' && userName.trim()) {
      setIsEditingName(false);
      e.target.blur();
    }
  };

  // Compute Real-Time Traffic Light Status
  let trafficStatus = null;
  if (panchangamData) {
    const nowEpoch = Date.now();
    const raw = panchangamData.rawTimings || {};
    const isRahuKalam = Boolean(raw.rahuStart && raw.rahuEnd && nowEpoch >= raw.rahuStart && nowEpoch <= raw.rahuEnd);
    const isAbhijit = Boolean(raw.abhijitStart && raw.abhijitEnd && nowEpoch >= raw.abhijitStart && nowEpoch <= raw.abhijitEnd);
    const isBrahma = Boolean(raw.brahmaStart && raw.brahmaEnd && nowEpoch >= raw.brahmaStart && nowEpoch <= raw.brahmaEnd);

    if (isRahuKalam) {
      trafficStatus = { color: 'red', text: 'Rahu Kalam Active', icon: '🔴', message: 'Inauspicious window — avoid new beginnings' };
    } else if (isAbhijit) {
      trafficStatus = { color: 'green', text: 'Abhijit Muhurta Active', icon: '🟢', message: 'Highly auspicious victory window' };
    } else if (isBrahma) {
      trafficStatus = { color: 'green', text: 'Brahma Muhurta Active', icon: '✨', message: 'Divine spiritual hour for sadhana & prayer' };
    } else {
      trafficStatus = { color: 'yellow', text: 'Shubha Vela', icon: '✨', message: 'Favorable time for regular duties & sadhana' };
    }
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-content-area">
        
        {/* Zone 1: Cosmic Welcome */}
        <section className="dashboard-zone zone-welcome">
          <div className="hero-header">
            <div className="hero-greeting-container">
              <h1 className="hero-greeting">
                {greeting}{userName ? `, ${userName}` : ''}!
                {userName && !isEditingName && (
                  <button className="edit-name-btn" onClick={() => setIsEditingName(true)}>✏️</button>
                )}
              </h1>
              {(!userName || isEditingName) && (
                <input
                  type="text"
                  placeholder="Enter your name..."
                  value={userName}
                  onChange={handleNameChange}
                  onKeyPress={handleNameKeyPress}
                  className="name-input"
                  autoFocus={isEditingName}
                  onBlur={() => setIsEditingName(false)}
                />
              )}
              <p className="hero-date">{currentDate}</p>
            </div>
            
            {streak > 0 && (
              <div className="streak-badge-glass">
                <span className="streak-icon">🔥</span>
                <div className="streak-info">
                  <span className="streak-count">{streak}</span>
                  <span className="streak-label">Day Streak</span>
                </div>
              </div>
            )}
          </div>

          {/* Panchang Mini-Status */}
          <div className="panchang-mini-card glass-panel">
             <div className="panchang-mini-header-bar">
               <div className="city-picker-badge" onClick={(e) => e.stopPropagation()}>
                 <span className="city-icon">📍</span>
                 <select 
                   value={currentCity} 
                   onChange={(e) => setCity(e.target.value)}
                   className="dashboard-city-select"
                   aria-label="Select City for Panchangam"
                 >
                   {cities && cities.map(c => (
                     <option key={c.id} value={c.id}>{c.name}</option>
                   ))}
                 </select>
               </div>
               {trafficStatus && (
                 <span className={`timing-status-pill pill-${trafficStatus.color}`}>
                   {trafficStatus.text}
                 </span>
               )}
             </div>

             <Link to="/calendar" className="panchang-mini-link">
               {panchangamLoading ? (
                 <div className="mini-status-loading">Consulting the celestial positions...</div>
               ) : panchangamData ? (
                 <div className="mini-status-content">
                   <div className={`mini-status-indicator indicator-${trafficStatus?.color || 'yellow'}`}>
                     {trafficStatus?.icon || '🕉️'}
                   </div>
                   <div className="mini-status-text">
                      <div className="mini-status-primary">
                        <strong>{panchangamData.almanac?.Tithi?.name}</strong> • {panchangamData.almanac?.Nakshatra?.name}
                      </div>
                      <div className="mini-status-traffic">
                        <span className="traffic-msg">{trafficStatus?.message}</span>
                      </div>
                      <span className="mini-status-sub">Tap for Rahu Kalam, Choghadiya & full timings →</span>
                   </div>
                 </div>
               ) : (
                 <div className="mini-status-loading">Panchang data unavailable</div>
               )}
             </Link>
          </div>

          {/* Continue Reading Shelf (1-Click Resume) */}
          {lastRead && (
            <div className="continue-reading-shelf glass-panel">
              <div className="continue-reading-header">
                <span className="shelf-badge">📖 Continue Reading</span>
                <span className="shelf-time">{new Date(lastRead.timestamp).toLocaleDateString()}</span>
              </div>
              <div className="continue-reading-body">
                <div className="continue-reading-text">
                  <span className="continue-book-name">{lastRead.bookTitle}</span>
                  <h3 className="continue-chapter-name">{lastRead.chapterTitle}</h3>
                </div>
                <Link 
                  to={`/library/${lastRead.bookId}/${lastRead.chapterId}`}
                  className="resume-reading-btn"
                >
                  Resume →
                </Link>
              </div>
            </div>
          )}

          {/* Sadhana Quick Gateways */}
          <div className="sadhana-quick-grid">
            <Link to="/virtual-shrine" className="sadhana-gateway-card glass-panel gateway-mandir">
              <span className="gateway-icon">🪔</span>
              <div className="gateway-details">
                <h4>Virtual Mandir</h4>
                <p>Darshan & Aarti Altar</p>
              </div>
            </Link>
            <Link to="/japa-mala" className="sadhana-gateway-card glass-panel gateway-mala">
              <span className="gateway-icon">📿</span>
              <div className="gateway-details">
                <h4>108 Japa Mala</h4>
                <p>Mantra Chanting Beads</p>
              </div>
            </Link>
          </div>
        </section>

        {/* Zone 2: Your Dharma Journey */}
        <section className="dashboard-zone zone-sadhana">
          <div className="zone-header">
            <h2 className="zone-title">Your Dharma Journey</h2>
            <button className="edit-goals-btn" onClick={() => setIsEditGoalsOpen(true)}>
              ⚙️ Settings
            </button>
          </div>
          
          <div className="dharma-journey-stack">
            
            {/* A. Daily Challenge */}
            <div className="journey-card challenge-card glass-panel">
              <div className="journey-card-header">
                <span className="journey-icon">✨</span>
                <h3>Today's Dharma Challenge</h3>
              </div>
              <p className="challenge-title">{dailyChallenge.title}</p>
              <p className="challenge-desc">{dailyChallenge.description}</p>
            </div>

            {/* B. Learning Pathway */}
            <div className="journey-card learning-card glass-panel" onClick={() => setIsLessonModalOpen(true)}>
              <div className="journey-card-header">
                <span className="journey-icon">📚</span>
                <h3>{currentPathway.title}</h3>
                <span className="pathway-progress-badge">Day {pathwayProgress}/{currentPathway.totalDays}</span>
              </div>
              <div className="learning-preview">
                <h4>{currentLesson.title}</h4>
                <p>Tap to read today's 2-minute lesson →</p>
              </div>
            </div>

            {/* C. Weekly Shloka Mastery */}
            <div className="journey-card shloka-card glass-panel">
              <div className="journey-card-header">
                <span className="journey-icon">🕉️</span>
                <h3>Weekly Mantra Mastery</h3>
                <span className="shloka-progress-badge">{shlokaPracticeDays}/7 Days</span>
              </div>
              <div className="shloka-content">
                <h4 className="shloka-title">{weeklyShloka.title}</h4>
                <p className="shloka-sanskrit">{weeklyShloka.sanskrit}</p>
                <div className="shloka-actions">
                  <button className="shloka-play-btn">🔊 Listen</button>
                  <button 
                    className="shloka-card-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsShlokaModalOpen(true);
                    }}
                  >
                    ✨ Quote Card
                  </button>
                  <button 
                    className={`shloka-practice-btn ${shlokaPracticeDays > 0 ? 'practiced' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      incrementShlokaPractice();
                    }}
                  >
                    {shlokaPracticeDays > 0 ? '✓ Practiced' : 'Mark as Practiced'}
                  </button>
                </div>
              </div>
            </div>

            {/* D. Meditation & Japa */}
            <div className="sadhana-card glass-panel">
              {/* <div className="japa-counter-section">
                <div className="japa-linear-container" onClick={handleJapaIncrement}>
                  <div className="japa-linear-header">
                    <span className="japa-count">{japaCount % 108}</span>
                    <span className="japa-label">/ 108</span>
                  </div>
                  <div className="japa-progress-bar">
                    <div 
                      className="japa-progress-fill"
                      style={{ 
                        width: `${((japaCount % 108) / 108) * 100}%`,
                        backgroundImage: `url(${process.env.PUBLIC_URL || ''}/images/rudraksha_bead.png)`
                      }}
                    ></div>
                  </div>
                </div>
                <div className="malas-completed">
                  <span>{Math.floor(japaCount / 108)}</span> Malas Completed
                </div>
                <p className="japa-hint">Tap bar to count mantra recitations</p>
              </div> */}
              
              <StreakCalendar streak={streak} completionHistory={completionHistory} />
            </div>
            
          </div>
        </section>

        {/* Zone 4: Navigation Hub */}
        <section className="dashboard-zone zone-navigation">
          <h2 className="zone-title">Explore</h2>
          <div className="nav-hub-scroll">
            <Link to="/virtual-shrine" className="nav-hub-item glass-panel">
              <span className="nav-hub-icon">🪔</span>
              <span className="nav-hub-label">Virtual Mandir</span>
            </Link>
            <Link to="/japa-mala" className="nav-hub-item glass-panel">
              <span className="nav-hub-icon">📿</span>
              <span className="nav-hub-label">108 Japa Mala</span>
            </Link>
            <Link to="/gods" className="nav-hub-item glass-panel">
              <span className="nav-hub-icon">🕉️</span>
              <span className="nav-hub-label">Gods Gallery</span>
            </Link>
            <Link to="/library" className="nav-hub-item glass-panel">
              <span className="nav-hub-icon">📚</span>
              <span className="nav-hub-label">Sacred Texts</span>
            </Link>
            <Link to="/pujas" className="nav-hub-item glass-panel">
              <span className="nav-hub-icon">🔱</span>
              <span className="nav-hub-label">Puja Guide</span>
            </Link>
            <Link to="/calendar" state={{ activeTab: 'festivals' }} className="nav-hub-item glass-panel">
              <span className="nav-hub-icon">🎊</span>
              <span className="nav-hub-label">Festivals</span>
            </Link>
            <Link to="/muhurta-finder" className="nav-hub-item glass-panel">
              <span className="nav-hub-icon">🕐</span>
              <span className="nav-hub-label">Muhurtas</span>
            </Link>
          </div>
        </section>

      </div>

      {/* Modals */}
      {isLessonModalOpen && (
        <div className="meditation-overlay">
          <div className="meditation-modal glass-panel lesson-modal">
            <button className="close-btn" onClick={() => setIsLessonModalOpen(false)}>×</button>
            <h2 className="meditation-title">{currentPathway.title}</h2>
            <h3 className="meditation-subtitle">Day {pathwayProgress}: {currentLesson.title}</h3>
            
            <div className="lesson-content-body">
              <p>{currentLesson.content}</p>
            </div>

            <button 
              className="start-session-btn" 
              onClick={() => {
                incrementPathwayProgress(currentPathway.totalDays);
                setIsLessonModalOpen(false);
              }}
            >
              Mark as Read
            </button>
          </div>
        </div>
      )}

      {isMeditationTimerOpen && (
        <MeditationTimer 
          onClose={() => setIsMeditationTimerOpen(false)} 
          onComplete={() => {
            if (!userGoals.meditation) toggleGoal('meditation');
          }}
          initialMinutes={5} 
        />
      )}

      <EditGoalsModal 
        isOpen={isEditGoalsOpen}
        onClose={() => setIsEditGoalsOpen(false)}
        customGoals={customGoals}
        addCustomGoal={addCustomGoal}
        removeCustomGoal={removeCustomGoal}
      />

      <ShlokaCardModal
        isOpen={isShlokaModalOpen}
        onClose={() => setIsShlokaModalOpen(false)}
        shloka={{
          title: weeklyShloka.title,
          sanskrit: weeklyShloka.sanskrit,
          transliteration: weeklyShloka.transliteration,
          english: weeklyShloka.meaning,
          source: 'Weekly Mantra Sadhana'
        }}
      />
    </div>
  );
};

export default PersonalizedDashboard;
