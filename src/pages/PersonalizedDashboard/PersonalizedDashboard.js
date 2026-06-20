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
  
  const { panchangamData, loading: panchangamLoading } = usePanchangam();
  
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Dynamic theme is now handled globally in App.js

  // Load user preferences
  useEffect(() => {
    const savedName = localStorage.getItem('userName') || '';
    setUserName(savedName);
    
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

  // Compute Traffic Light Status
  let trafficStatus = null;
  if (panchangamData) {
    const isRahuKalam = false; // Mock
    const isAbhijit = true; // Mock

    trafficStatus = { color: 'yellow', text: 'Neutral Time', icon: '🟡', message: 'Good for routine tasks' };
    if (isRahuKalam) {
      trafficStatus = { color: 'red', text: 'Rahu Kalam', icon: '🔴', message: 'Avoid new important tasks' };
    } else if (isAbhijit) {
      trafficStatus = { color: 'green', text: 'Highly Auspicious', icon: '🟢', message: 'Abhijit Muhurat is active' };
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
          <Link to="/adults/calendar" className="panchang-mini-card glass-panel">
             {panchangamLoading ? (
               <div className="mini-status-loading">Consulting the stars...</div>
             ) : panchangamData ? (
               <div className="mini-status-content">
                 <div className={`mini-status-indicator indicator-${trafficStatus.color}`}>
                   {trafficStatus.icon}
                 </div>
                 <div className="mini-status-text">
                    <div className="mini-status-primary">
                      <strong>{panchangamData.almanac?.Tithi?.name}</strong> • {panchangamData.almanac?.Nakshatra?.name}
                    </div>
                    <div className="mini-status-traffic">
                      {trafficStatus.text}: <span className="traffic-msg">{trafficStatus.message}</span>
                    </div>
                    <span className="mini-status-sub">Tap for full calendar & timings →</span>
                 </div>
               </div>
             ) : (
               <div className="mini-status-loading">Panchang data unavailable</div>
             )}
          </Link>
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
            <Link to="/adults/gods" className="nav-hub-item glass-panel">
              <span className="nav-hub-icon">🕉️</span>
              <span className="nav-hub-label">Gods Gallery</span>
            </Link>
            <Link to="/adults/library" className="nav-hub-item glass-panel">
              <span className="nav-hub-icon">📚</span>
              <span className="nav-hub-label">Sacred Texts</span>
            </Link>
            <Link to="/adults/pujas" className="nav-hub-item glass-panel">
              <span className="nav-hub-icon">🔱</span>
              <span className="nav-hub-label">Puja Guide</span>
            </Link>
            <Link to="/adults/calendar" state={{ activeTab: 'festivals' }} className="nav-hub-item glass-panel">
              <span className="nav-hub-icon">🎊</span>
              <span className="nav-hub-label">Festivals</span>
            </Link>
            <Link to="/adults/muhurta-finder" className="nav-hub-item glass-panel">
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
    </div>
  );
};

export default PersonalizedDashboard;
