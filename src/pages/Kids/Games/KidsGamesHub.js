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
    playClick();
    navigate(route);
  };

  return (
    <KidsPageTransition>
      <div className="games-hub-container">
        <div className="hub-header">
          <h2>🎮 Games Hub 🎲</h2>
          <p>Choose a game to play!</p>
        </div>

        <div className="games-grid">
          <motion.div 
            className="game-card trivia-card"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleGameSelect('/kids/games/trivia')}
          >
            <div className="game-icon">🧠</div>
            <h3>Trivia Quiz</h3>
            <p>Test your knowledge of the stories!</p>
          </motion.div>

          <motion.div 
            className="game-card memory-card"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleGameSelect('/kids/games/memory')}
          >
            <div className="game-icon">🎴</div>
            <h3>Memory Match</h3>
            <p>Find the matching pairs!</p>
          </motion.div>
        </div>
      </div>
    </KidsPageTransition>
  );
};

export default KidsGamesHub;
