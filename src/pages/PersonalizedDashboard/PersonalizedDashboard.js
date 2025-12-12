import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePanchangam } from '../../hooks/usePanchangam';
import ShlokaOfTheDay from '../../components/ShlokaOfTheDay/ShlokaOfTheDay';
import { getPrayerOfTheDay } from '../../data/prayers/prayersData';
import { getDailyReading } from '../../data/dailyReadings';
import './PersonalizedDashboard.css';

const PersonalizedDashboard = () => {
  const [userName, setUserName] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [userGoals, setUserGoals] = useState({
    dailyPrayer: false,
    readScripture: false,
    meditation: false,
    japaCount: 0
  });
  const [streak, setStreak] = useState(0);
  const [upcomingFestivals, setUpcomingFestivals] = useState([]);
  const [fastingSchedule, setFastingSchedule] = useState([]);
  const [dailyPrayer, setDailyPrayer] = useState(null);
  const [dailyReading, setDailyReading] = useState(null);
  
  const { panchangamData, loading: panchangamLoading } = usePanchangam();
  
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Load user preferences from localStorage
  useEffect(() => {
    const savedName = localStorage.getItem('userName') || '';
    const savedGoals = JSON.parse(localStorage.getItem('userGoals') || '{}');
    const savedStreak = parseInt(localStorage.getItem('userStreak') || '0');
    
    setUserName(savedName);
    setUserGoals({
      dailyPrayer: savedGoals.dailyPrayer || false,
      readScripture: savedGoals.readScripture || false,
      meditation: savedGoals.meditation || false,
      japaCount: savedGoals.japaCount || 0
    });
    setStreak(savedStreak);
  }, []);

  // Mock upcoming festivals (will integrate with actual festival data)
  useEffect(() => {
    const mockFestivals = [
      { name: 'Maha Shivaratri', date: '2025-02-26', daysAway: 89 },
      { name: 'Holi', date: '2025-03-14', daysAway: 105 },
      { name: 'Ram Navami', date: '2025-04-06', daysAway: 128 },
      { name: 'Hanuman Jayanti', date: '2025-04-13', daysAway: 135 }
    ];
    setUpcomingFestivals(mockFestivals.slice(0, 3));

    // Mock fasting schedule
    const mockFasting = [
      { day: 'Today', type: 'Ekadashi', description: 'Complete fast or fruits only' },
      { day: 'Monday', type: 'Somvar', description: 'Fast for Lord Shiva (optional)' },
      { day: 'Dec 10', type: 'Ekadashi', description: 'Complete fast or fruits only' }
    ];
    setFastingSchedule(mockFasting);

    // Set daily prayer based on time of day
    setDailyPrayer(getPrayerOfTheDay());
    
    // Set daily scripture reading
    setDailyReading(getDailyReading());
  }, []);

  const handleGoalToggle = (goal) => {
    const updatedGoals = { ...userGoals, [goal]: !userGoals[goal] };
    setUserGoals(updatedGoals);
    localStorage.setItem('userGoals', JSON.stringify(updatedGoals));
    
    // Update streak if all goals completed
    const allCompleted = updatedGoals.dailyPrayer && updatedGoals.readScripture && updatedGoals.meditation;
    if (allCompleted) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      localStorage.setItem('userStreak', newStreak.toString());
    }
  };

  const handleJapaIncrement = () => {
    const newCount = userGoals.japaCount + 1;
    const updatedGoals = { ...userGoals, japaCount: newCount };
    setUserGoals(updatedGoals);
    localStorage.setItem('userGoals', JSON.stringify(updatedGoals));
  };

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

  const handleEditName = () => {
    setIsEditingName(true);
  };

  const scrollToPrayer = () => {
    const prayerSection = document.querySelector('.prayer-card');
    if (prayerSection) {
      prayerSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const scrollToScripture = () => {
    const scriptureSection = document.querySelector('.scripture-card');
    if (scriptureSection) {
      scriptureSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="personalized-dashboard">
      {/* Welcome Header */}
      <div className="dashboard-hero">
        <div className="hero-content">
          <h1 className="hero-greeting">
            🙏 Namaste{userName ? `, ${userName}` : ''}!
            {userName && !isEditingName && (
              <button className="edit-name-btn" onClick={handleEditName}>✏️</button>
            )}
          </h1>
          {(!userName || isEditingName) && (
            <div className="name-input-container">
              <input
                type="text"
                placeholder="Enter your name..."
                value={userName}
                onChange={handleNameChange}
                onKeyPress={handleNameKeyPress}
                className="name-input"
                autoFocus={isEditingName}
              />
            </div>
          )}
          <p className="hero-date">{currentDate}</p>
          {streak > 0 && (
            <div className="streak-badge">
              🔥 {streak} Day Streak! Keep it going!
            </div>
          )}
        </div>
      </div>

      <div className="dashboard-container">
        {/* Today's Panchangam Card */}
        <section className="dashboard-card panchangam-card">
          <h2 className="card-title">📅 Today's Panchangam</h2>
          {panchangamLoading ? (
            <p>Loading Panchangam...</p>
          ) : panchangamData ? (
            <div className="panchangam-grid">
              <div className="panchangam-item">
                <span className="panchangam-label">Tithi:</span>
                <span className="panchangam-value">{panchangamData.almanac?.Tithi?.name || 'N/A'}</span>
              </div>
              <div className="panchangam-item">
                <span className="panchangam-label">Nakshatra:</span>
                <span className="panchangam-value">{panchangamData.almanac?.Nakshatra?.name || 'N/A'}</span>
              </div>
              <div className="panchangam-item">
                <span className="panchangam-label">Yoga:</span>
                <span className="panchangam-value">{panchangamData.almanac?.Yoga?.name || 'N/A'}</span>
              </div>
              <div className="panchangam-item">
                <span className="panchangam-label">Karana:</span>
                <span className="panchangam-value">{panchangamData.almanac?.Karana?.name || 'N/A'}</span>
              </div>
              <div className="panchangam-item">
                <span className="panchangam-label">Sunrise:</span>
                <span className="panchangam-value">{panchangamData.solarLunar?.Sunrise || 'N/A'}</span>
              </div>
              <div className="panchangam-item">
                <span className="panchangam-label">Sunset:</span>
                <span className="panchangam-value">{panchangamData.solarLunar?.Sunset || 'N/A'}</span>
              </div>
            </div>
          ) : (
            <p>Panchangam data unavailable</p>
          )}
          <Link to="/calendar" className="view-full-link">
            View Full Calendar →
          </Link>
        </section>

        {/* Daily Goals Tracker */}
        <section className="dashboard-card goals-card">
          <h2 className="card-title">✅ Today's Spiritual Goals</h2>
          <div className="goals-list">
            <div className={`goal-item ${userGoals.dailyPrayer ? 'completed' : ''}`}>
              <div 
                className="goal-content"
                onClick={() => handleGoalToggle('dailyPrayer')}
              >
                <span className="goal-checkbox">
                  {userGoals.dailyPrayer ? '✓' : '○'}
                </span>
                <span className="goal-text">Complete daily prayers</span>
              </div>
              <button 
                className="goal-link-btn"
                onClick={scrollToPrayer}
                title="Go to Daily Prayer"
              >
                🕉️ ↓
              </button>
            </div>
            <div className={`goal-item ${userGoals.readScripture ? 'completed' : ''}`}>
              <div 
                className="goal-content"
                onClick={() => handleGoalToggle('readScripture')}
              >
                <span className="goal-checkbox">
                  {userGoals.readScripture ? '✓' : '○'}
                </span>
                <span className="goal-text">Read scriptures</span>
              </div>
              <button 
                className="goal-link-btn"
                onClick={scrollToScripture}
                title="Go to Daily Reading"
              >
                📜 ↓
              </button>
            </div>
            <div 
              className={`goal-item ${userGoals.meditation ? 'completed' : ''}`}
              onClick={() => handleGoalToggle('meditation')}
            >
              <span className="goal-checkbox">
                {userGoals.meditation ? '✓' : '○'}
              </span>
              <span className="goal-text">Meditation (15 min)</span>
            </div>
          </div>
          
          {/* Japa Counter */}
          <div className="japa-counter">
            <h3 className="japa-title">📿 Mantra Japa Counter</h3>
            <div className="japa-display">{userGoals.japaCount}</div>
            <button className="japa-button" onClick={handleJapaIncrement}>
              + Count Japa
            </button>
            <button 
              className="japa-reset" 
              onClick={() => {
                const updatedGoals = { ...userGoals, japaCount: 0 };
                setUserGoals(updatedGoals);
                localStorage.setItem('userGoals', JSON.stringify(updatedGoals));
              }}
            >
              Reset
            </button>
          </div>
        </section>

        {/* Daily Prayer */}
        <section className="dashboard-card prayer-card">
          <h2 className="card-title">🕉️ Daily Prayer</h2>
          {dailyPrayer && (
            <div className="prayer-content">
              <div className="prayer-header">
                <h3 className="prayer-name">{dailyPrayer.name}</h3>
                <span className="prayer-deity">{dailyPrayer.deity}</span>
                <span className="prayer-time">🕐 {dailyPrayer.time}</span>
              </div>
              
              <div className="prayer-text">
                <div className="prayer-sanskrit">{dailyPrayer.sanskrit}</div>
                <div className="prayer-transliteration">{dailyPrayer.transliteration}</div>
              </div>
              
              <div className="prayer-meaning">
                <strong>Meaning:</strong>
                <p>{dailyPrayer.meaning}</p>
              </div>
              
              <button 
                className="prayer-complete-btn"
                onClick={() => handleGoalToggle('dailyPrayer')}
              >
                {userGoals.dailyPrayer ? '✓ Prayer Completed' : 'Mark as Completed'}
              </button>
            </div>
          )}
        </section>

        {/* Daily Scripture Reading */}
        <section className="dashboard-card scripture-card">
          <h2 className="card-title">📜 Daily Scripture Reading</h2>
          {dailyReading && (
            <div className="scripture-content">
              <div className="scripture-header">
                <h3 className="scripture-name">{dailyReading.scripture}</h3>
                <div className="scripture-meta">
                  <span className="scripture-chapter">📖 {dailyReading.title}</span>
                  <span className="scripture-time">🕐 {dailyReading.readingTime}</span>
                </div>
              </div>
              
              <p className="scripture-summary">{dailyReading.summary}</p>
              
              <div className="key-verse">
                <h4 className="verse-title">✨ Key Verse:</h4>
                <div className="verse-sanskrit">{dailyReading.keyVerse.sanskrit}</div>
                <div className="verse-transliteration">{dailyReading.keyVerse.transliteration}</div>
                <div className="verse-meaning">
                  <strong>Meaning:</strong>
                  <p>{dailyReading.keyVerse.meaning}</p>
                </div>
              </div>
              
              <div className="scripture-actions">
                <Link to={dailyReading.link} className="read-full-btn">
                  Read Full Chapter →
                </Link>
                <button 
                  className="scripture-complete-btn"
                  onClick={() => handleGoalToggle('readScripture')}
                >
                  {userGoals.readScripture ? '✓ Reading Completed' : 'Mark as Completed'}
                </button>
              </div>
              
              <div className="library-link">
                <Link to="/library" className="browse-library-btn">
                  📚 Browse Full Literature Library
                </Link>
              </div>
            </div>
          )}
        </section>

        {/* Shloka of the Day */}
        <section className="dashboard-card shloka-card">
          <ShlokaOfTheDay />
        </section>

        {/* Upcoming Festivals */}
        <section className="dashboard-card festivals-card">
          <h2 className="card-title">🎉 Upcoming Festivals</h2>
          <div className="festivals-list">
            {upcomingFestivals.map((festival, index) => (
              <div key={index} className="festival-item">
                <div className="festival-info">
                  <h3 className="festival-name">{festival.name}</h3>
                  <p className="festival-date">{festival.date}</p>
                </div>
                <div className="festival-countdown">
                  <span className="countdown-number">{festival.daysAway}</span>
                  <span className="countdown-label">days</span>
                </div>
              </div>
            ))}
          </div>
          <Link to="/festivals" className="view-full-link">
            View All Festivals →
          </Link>
        </section>

        {/* Fasting Schedule */}
        <section className="dashboard-card fasting-card">
          <h2 className="card-title">🌙 Fasting Schedule</h2>
          <div className="fasting-list">
            {fastingSchedule.map((fast, index) => (
              <div key={index} className="fasting-item">
                <div className="fasting-day">{fast.day}</div>
                <div className="fasting-details">
                  <h3 className="fasting-type">{fast.type}</h3>
                  <p className="fasting-description">{fast.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="dashboard-card quick-actions-card">
          <h2 className="card-title">⚡ Quick Actions</h2>
          <div className="quick-actions-grid">
            <Link to="/gods" className="quick-action-btn">
              <span className="action-icon">🕉️</span>
              <span className="action-label">Gods Gallery</span>
            </Link>
            <Link to="/library" className="quick-action-btn">
              <span className="action-icon">📚</span>
              <span className="action-label">Sacred Texts</span>
            </Link>
            <Link to="/pujas" className="quick-action-btn">
              <span className="action-icon">🔱</span>
              <span className="action-label">Puja Guide</span>
            </Link>
            <Link to="/ashtottaram" className="quick-action-btn">
              <span className="action-icon">🙏</span>
              <span className="action-label">108 Names</span>
            </Link>
          </div>
        </section>

        {/* Practical Hindu Living */}
        <section className="dashboard-card practical-living-card">
          <h2 className="card-title">🕉️ Practical Hindu Living</h2>
          <div className="practical-actions">
            <Link to="/muhurta-finder" className="practical-action-btn">
              <span className="action-icon">🕐</span>
              <span className="action-label">Muhurta Finder</span>
              <span className="action-desc">Find auspicious times</span>
            </Link>
            <Link to="/fasting-guide" className="practical-action-btn">
              <span className="action-icon">🍃</span>
              <span className="action-label">Fasting Guide</span>
              <span className="action-desc">Daily fasting rules</span>
            </Link>
            <Link to="/festival-countdown" className="practical-action-btn">
              <span className="action-icon">🎊</span>
              <span className="action-label">Festival Prep</span>
              <span className="action-desc">Preparation checklists</span>
            </Link>
            <Link to="/puja-reminders" className="practical-action-btn">
              <span className="action-icon">🔔</span>
              <span className="action-label">Puja Reminders</span>
              <span className="action-desc">Daily worship alerts</span>
            </Link>
          </div>
        </section>

        {/* Progress Summary */}
        <section className="dashboard-card progress-card">
          <h2 className="card-title">📊 Your Progress</h2>
          <div className="progress-stats">
            <div className="stat-item">
              <div className="stat-icon">🔥</div>
              <div className="stat-value">{streak}</div>
              <div className="stat-label">Day Streak</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">📿</div>
              <div className="stat-value">{userGoals.japaCount}</div>
              <div className="stat-label">Japa Today</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">✅</div>
              <div className="stat-value">
                {[userGoals.dailyPrayer, userGoals.readScripture, userGoals.meditation].filter(Boolean).length}/3
              </div>
              <div className="stat-label">Goals Done</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PersonalizedDashboard;
