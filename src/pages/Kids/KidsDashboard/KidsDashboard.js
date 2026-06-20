import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { shlokaService } from '../../../services/shlokaService';
import KidsPageTransition from '../../../components/KidsLayout/KidsPageTransition';
import { useSadhana } from '../../../hooks/useSadhana';
import MeditationTimer from '../../../components/MeditationTimer/MeditationTimer';
import './KidsDashboard.css';

const KidsDashboard = () => {
  const [dailyShloka, setDailyShloka] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Kids specific sadhana with stars
  const { goals, toggleGoal, stars } = useSadhana(true);
  const [isMeditationTimerOpen, setIsMeditationTimerOpen] = useState(false);

  useEffect(() => {
    shlokaService.getDailyShloka().then(setDailyShloka);
    
    // Cleanup speech synth if component unmounts
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleListen = () => {
    if ('speechSynthesis' in window && dailyShloka) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(dailyShloka.english);
      utterance.rate = 0.8;
      utterance.pitch = 1.2;
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };
  const handleGoalToggle = (goal) => {
    if (goal === 'quietTime' && !goals.quietTime) {
      setIsMeditationTimerOpen(true);
      return;
    }
    toggleGoal(goal);
  };

  const handleMeditationComplete = () => {
    if (!goals.quietTime) {
      toggleGoal('quietTime');
    }
    setIsMeditationTimerOpen(false);
  };

  return (
    <KidsPageTransition>
      <div className="kids-dashboard">
        <div className="kids-header">
          <h1 className="welcome-title">Hari Om! 🙏</h1>
          
          <div className="dharma-stars">
            <span className="stars-icon">⭐</span>
            <div className="stars-info">
              <span className="stars-count">{stars}</span>
              <span className="stars-label">Dharma Stars</span>
            </div>
          </div>
        </div>

        <section className="kids-sadhana-section">
          <h2>My Daily Habits</h2>
          <div className="kids-sadhana-card">
            <div className={`kids-goal-item ${goals.chant ? 'completed' : ''}`} onClick={() => handleGoalToggle('chant')}>
              <div className="kids-goal-icon">🌸</div>
              <div className="kids-goal-text">Chant Shloka</div>
              <div className="kids-checkbox">{goals.chant ? '⭐' : ''}</div>
            </div>
            
            <div className={`kids-goal-item ${goals.story ? 'completed' : ''}`} onClick={() => handleGoalToggle('story')}>
              <div className="kids-goal-icon">📖</div>
              <div className="kids-goal-text">Read a Story</div>
              <div className="kids-checkbox">{goals.story ? '⭐' : ''}</div>
            </div>
            
            <div className={`kids-goal-item ${goals.quietTime ? 'completed' : ''}`} onClick={() => handleGoalToggle('quietTime')}>
              <div className="kids-goal-icon">🧘</div>
              <div className="kids-goal-text">Quiet Time (5m)</div>
              <div className="kids-checkbox">{goals.quietTime ? '⭐' : ''}</div>
            </div>
          </div>
        </section>
        
        <section className="daily-shloka-section">
          {dailyShloka ? (
            <div className="shloka-card">
              <div className="shloka-header">
                <h2>Daily Shloka</h2>
                <span className="shloka-icon">{dailyShloka.icon}</span>
              </div>
              <div className="shloka-content">
                <p className="sanskrit-text">{dailyShloka.sanskrit}</p>
                <p className="english-text">{dailyShloka.english}</p>
                <div className="meaning-box">
                  <p>{dailyShloka.meaning}</p>
                </div>
              </div>
              <button 
                className={`listen-btn ${isPlaying ? 'playing' : ''}`}
                onClick={handleListen}
              >
                {isPlaying ? '🔊 Listening...' : '▶️ Listen to Shloka'}
              </button>
            </div>
          ) : (
            <div className="shloka-card loading">
              <p>Loading today's Shloka...</p>
            </div>
          )}
        </section>

        <section className="quick-links">
          <h2>What would you like to do?</h2>
          <div className="grid-links">
            <Link to="/kids/stories" className="grid-card story-card">
              <span className="card-emoji">📖</span>
              <h3>Read Stories</h3>
            </Link>
            <Link to="/kids/games" className="grid-card game-card">
              <span className="card-emoji">🎯</span>
              <h3>Play Games</h3>
            </Link>
            <Link to="/kids/chanting" className="grid-card chant-card">
              <span className="card-emoji">🌸</span>
              <h3>Chanting</h3>
            </Link>
          </div>
        </section>
      </div>

      {isMeditationTimerOpen && (
        <MeditationTimer 
          onClose={() => setIsMeditationTimerOpen(false)}
          onComplete={handleMeditationComplete}
          initialMinutes={5}
        />
      )}
    </KidsPageTransition>
  );
};

export default KidsDashboard;
