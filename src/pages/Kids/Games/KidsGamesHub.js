import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useSoundEffects from '../../../hooks/useSoundEffects';
import KidsPageTransition from '../../../components/KidsLayout/KidsPageTransition';
import './KidsGamesHub.css';

const KidsGamesHub = () => {
  const navigate = useNavigate();
  const { playClick } = useSoundEffects();

  const handleGameSelect = (route) => {
    try { playClick(); } catch (e) {}
    navigate(route);
  };

  return (
    <KidsPageTransition>
      <div className="games-hub-container">
        <div className="hub-header">
          <div className="hub-header-text">
            <h2>🎮 Divine Games Arcade 🎲</h2>
            <p>Play fun games, test your knowledge, and earn Dharma Stars!</p>
          </div>
          <div className="star-reward-pill">
            <span>⭐ Win stars on every game!</span>
          </div>
        </div>

        <div className="games-grid">
          {/* Trivia Quiz */}
          <motion.div 
            className="game-card trivia-card"
            whileHover={{ y: -8 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleGameSelect('/kids/games/trivia')}
          >
            <div className="game-card-top">
              <div className="game-icon trivia-icon">🧠</div>
              <span className="game-badge">Trivia & Quiz</span>
            </div>
            <h3>Divine Trivia Challenge</h3>
            <p>Explore 4 exciting quizzes on Ramayana heroes, Krishna leelas, festivals, and sacred animal vahanas!</p>
            <div className="game-card-footer">
              <span className="game-reward-tag">⭐ +1 Star Reward</span>
              <button className="game-play-btn" tabIndex="-1">
                Play Quiz ▶
              </button>
            </div>
          </motion.div>

          {/* Memory Match */}
          <motion.div 
            className="game-card memory-card"
            whileHover={{ y: -8 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleGameSelect('/kids/games/memory')}
          >
            <div className="game-card-top">
              <div className="game-icon memory-icon">🎴</div>
              <span className="game-badge">Memory Game</span>
            </div>
            <h3>Sacred Memory Match</h3>
            <p>Flip cards to find pairs of sacred symbols, divine animal friends, and legendary heroes!</p>
            <div className="game-card-footer">
              <span className="game-reward-tag">⭐ +1 Star Reward</span>
              <button className="game-play-btn" tabIndex="-1">
                Play Match ▶
              </button>
            </div>
          </motion.div>

          {/* Mantra Garden / Chanting */}
          <motion.div 
            className="game-card chant-garden-card"
            whileHover={{ y: -8 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleGameSelect('/kids/chanting')}
          >
            <div className="game-card-top">
              <div className="game-icon chant-icon">🌸</div>
              <span className="game-badge">Interactive Sound</span>
            </div>
            <h3>Mantra & Shloka Garden</h3>
            <p>Listen to divine chants, practice Sanskrit shlokas, offer floating flowers, and ring temple bells!</p>
            <div className="game-card-footer">
              <span className="game-reward-tag">⭐ Daily Habit</span>
              <button className="game-play-btn" tabIndex="-1">
                Enter Garden 🌸
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </KidsPageTransition>
  );
};

export default KidsGamesHub;
