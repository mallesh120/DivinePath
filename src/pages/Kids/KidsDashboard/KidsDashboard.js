import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { shlokaService } from '../../../services/shlokaService';
import KidsPageTransition from '../../../components/KidsLayout/KidsPageTransition';
import { useSadhana } from '../../../hooks/useSadhana';
import useSoundEffects from '../../../hooks/useSoundEffects';
import MeditationTimer from '../../../components/MeditationTimer/MeditationTimer';
import './KidsDashboard.css';

const getStarLevel = (stars) => {
  if (stars >= 25) return { title: 'Little Rishi 🧘', color: '#8B5CF6' };
  if (stars >= 15) return { title: 'Dharma Star ✨', color: '#F59E0B' };
  if (stars >= 6) return { title: 'Wise Explorer 🧭', color: '#10B981' };
  return { title: 'Eager Seeker 🌱', color: '#3B82F6' };
};

const KidsDashboard = () => {
  const [dailyShloka, setDailyShloka] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  
  const { goals, toggleGoal, stars } = useSadhana(true);
  const { playClick, playSuccess } = useSoundEffects();
  const [isMeditationTimerOpen, setIsMeditationTimerOpen] = useState(false);

  useEffect(() => {
    shlokaService.getDailyShloka().then(setDailyShloka);
    
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleListen = () => {
    if ('speechSynthesis' in window && dailyShloka) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(dailyShloka.english);
      utterance.rate = 0.8;
      utterance.pitch = 1.15;
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => {
        setIsPlaying(false);
        if (!goals.chant) {
          toggleGoal('chant');
          triggerToast('⭐ +1 Star for Daily Shloka!');
          try { playSuccess(); } catch (e) {}
        }
      };
      utterance.onerror = () => setIsPlaying(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleGoalToggle = (goalKey) => {
    if (goalKey === 'quietTime' && !goals.quietTime) {
      setIsMeditationTimerOpen(true);
      return;
    }

    const willBeCompleted = !goals[goalKey];
    toggleGoal(goalKey);

    if (willBeCompleted) {
      try { playSuccess(); } catch (e) {}
      triggerToast('⭐ +1 Dharma Star Earned!');
    } else {
      try { playClick(); } catch (e) {}
    }
  };

  const handleMeditationComplete = () => {
    if (!goals.quietTime) {
      toggleGoal('quietTime');
      try { playSuccess(); } catch (e) {}
      triggerToast('⭐ +1 Star for Quiet Time!');
    }
    setIsMeditationTimerOpen(false);
  };

  const starLevel = getStarLevel(stars);

  return (
    <KidsPageTransition>
      <div className="kids-dashboard">
        {/* Floating Toast Notification */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div 
              className="kids-toast"
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
            >
              {toastMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header with Welcome & Dharma Stars */}
        <div className="kids-dash-header">
          <div className="welcome-banner">
            <h1 className="welcome-title">Hari Om! 🙏</h1>
            <span className="welcome-subtitle">Welcome to your joyful spiritual playground</span>
          </div>
          
          <motion.div 
            className="dharma-stars-card"
            whileHover={{ scale: 1.05 }}
          >
            <span className="stars-icon">⭐</span>
            <div className="stars-info">
              <span className="stars-count">{stars}</span>
              <span className="stars-label">Dharma Stars</span>
              <span className="stars-tier-badge" style={{ color: starLevel.color }}>
                {starLevel.title}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Daily Habits Section */}
        <section className="kids-sadhana-section">
          <div className="section-header-row">
            <h2>🌟 My Daily Habits</h2>
            <span className="habits-hint">Tap each habit to complete it!</span>
          </div>

          <div className="kids-sadhana-card">
            <motion.div 
              className={`kids-goal-item ${goals.chant ? 'completed' : ''}`} 
              onClick={() => handleGoalToggle('chant')}
              whileTap={{ scale: 0.96 }}
            >
              <div className="kids-goal-icon">🌸</div>
              <div className="kids-goal-info">
                <span className="kids-goal-text">Chant Shloka</span>
                <span className="goal-subtext">Sing a sacred chant</span>
              </div>
              <div className="kids-checkbox">{goals.chant ? '⭐' : ''}</div>
            </motion.div>
            
            <motion.div 
              className={`kids-goal-item ${goals.story ? 'completed' : ''}`} 
              onClick={() => handleGoalToggle('story')}
              whileTap={{ scale: 0.96 }}
            >
              <div className="kids-goal-icon">📖</div>
              <div className="kids-goal-info">
                <span className="kids-goal-text">Read a Story</span>
                <span className="goal-subtext">Learn a moral tale</span>
              </div>
              <div className="kids-checkbox">{goals.story ? '⭐' : ''}</div>
            </motion.div>
            
            <motion.div 
              className={`kids-goal-item ${goals.quietTime ? 'completed' : ''}`} 
              onClick={() => handleGoalToggle('quietTime')}
              whileTap={{ scale: 0.96 }}
            >
              <div className="kids-goal-icon">🧘</div>
              <div className="kids-goal-info">
                <span className="kids-goal-text">Quiet Time (5m)</span>
                <span className="goal-subtext">Calm peaceful breath</span>
              </div>
              <div className="kids-checkbox">{goals.quietTime ? '⭐' : ''}</div>
            </motion.div>
          </div>
        </section>
        
        {/* Daily Shloka Feature */}
        <section className="daily-shloka-section">
          {dailyShloka ? (
            <div className="shloka-card">
              <div className="shloka-header">
                <span className="shloka-icon">{dailyShloka.icon}</span>
                <h2>Daily Shloka of Wisdom</h2>
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

        {/* Quick Links / Explore Section */}
        <section className="quick-links">
          <h2>What would you like to explore?</h2>
          <div className="grid-links">
            <Link to="/kids/stories" className="grid-card story-card">
              <span className="card-emoji">📖</span>
              <h3>Read Stories</h3>
              <p>9 interactive fables & tales</p>
              <span className="card-action-pill">Open Library ▶</span>
            </Link>
            <Link to="/kids/games" className="grid-card game-card">
              <span className="card-emoji">🎯</span>
              <h3>Play Games</h3>
              <p>Trivia quizzes & Memory match</p>
              <span className="card-action-pill">Play Now ▶</span>
            </Link>
            <Link to="/kids/chanting" className="grid-card chant-card">
              <span className="card-emoji">🌸</span>
              <h3>Mantra Garden</h3>
              <p>Shlokas, bells & flowers</p>
              <span className="card-action-pill">Enter Garden ▶</span>
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
