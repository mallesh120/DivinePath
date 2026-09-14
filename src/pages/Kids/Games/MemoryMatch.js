import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useSoundEffects from '../../../hooks/useSoundEffects';
import { useSadhana } from '../../../hooks/useSadhana';
import KidsPageTransition from '../../../components/KidsLayout/KidsPageTransition';
import './MemoryMatch.css';

const THEMES = [
  { id: 'symbols', label: '🕉️ Sacred Symbols', symbols: ['🪔', '🕉️', '🪷', '🔔', '🔱', '🐚'] },
  { id: 'animals', label: '🐘 Divine Friends', symbols: ['🐘', '🐒', '🦚', '🐮', '🦢', '🦅'] },
  { id: 'legends', label: '🏹 Epic Legends', symbols: ['🏹', '👑', '☀️', '💍', '⛰️', '🌺'] }
];

const MemoryMatch = () => {
  const [selectedThemeId, setSelectedThemeId] = useState('symbols');
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedSymbols, setMatchedSymbols] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [moves, setMoves] = useState(0);

  const { playClick, playSuccess, playError } = useSoundEffects();
  const { awardStars } = useSadhana(true);

  const currentTheme = THEMES.find(t => t.id === selectedThemeId) || THEMES[0];

  const initializeGame = useCallback((themeToUse = currentTheme) => {
    const symbolList = themeToUse.symbols;
    const paired = [...symbolList, ...symbolList];
    const shuffled = paired.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedIndices([]);
    setMatchedSymbols([]);
    setIsFinished(false);
    setMoves(0);
  }, [currentTheme]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const handleThemeChange = (themeId) => {
    try { playClick(); } catch (e) {}
    setSelectedThemeId(themeId);
    const newTheme = THEMES.find(t => t.id === themeId);
    initializeGame(newTheme);
  };

  const handleCardClick = (index) => {
    if (flippedIndices.length === 2) return;
    if (flippedIndices.includes(index) || matchedSymbols.includes(cards[index])) return;

    try { playClick(); } catch (e) {}
    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [firstIdx, secondIdx] = newFlipped;
      
      if (cards[firstIdx] === cards[secondIdx]) {
        // Match found!
        setTimeout(() => {
          try { playSuccess(); } catch (e) {}
          const newMatched = [...matchedSymbols, cards[firstIdx]];
          setMatchedSymbols(newMatched);
          setFlippedIndices([]);
          
          if (newMatched.length === currentTheme.symbols.length) {
            // All matched!
            awardStars(1);
            setIsFinished(true);
            try { playSuccess(); } catch (e) {}
          }
        }, 400);
      } else {
        // Mismatch
        setTimeout(() => {
          try { playError(); } catch (e) {}
          setFlippedIndices([]);
        }, 900);
      }
    }
  };

  if (isFinished) {
    return (
      <KidsPageTransition>
        <div className="memory-container finished">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            className="win-card"
          >
            <div className="win-emoji">🎉</div>
            <h2>Super Memory Champion!</h2>
            <p className="win-detail">
              You discovered all pairs in <strong>{moves} moves</strong>!
            </p>
            <div className="memory-star-badge">
              <span>⭐ +1 Dharma Star Earned!</span>
            </div>
            <div className="win-actions">
              <button onClick={() => initializeGame()} className="play-again-btn">
                🔄 Play Again
              </button>
              <Link to="/kids/games" className="back-hub-btn">
                🎮 Games Hub
              </Link>
            </div>
          </motion.div>
        </div>
      </KidsPageTransition>
    );
  }

  return (
    <KidsPageTransition>
      <div className="memory-container">
        {/* Header */}
        <div className="memory-header">
          <Link 
            to="/kids/games" 
            className="back-games-btn"
            onClick={() => { try { playClick(); } catch (e) {} }}
          >
            ◀ Games
          </Link>
          <div className="memory-title-wrap">
            <h2>🎴 Memory Match</h2>
          </div>
          <div className="stats-badges">
            <span className="moves-badge">Moves: {moves}</span>
            <span className="pairs-badge">Pairs: {matchedSymbols.length}/{currentTheme.symbols.length}</span>
          </div>
        </div>

        {/* Theme Picker Tabs */}
        <div className="theme-selector-bar">
          {THEMES.map(theme => (
            <button
              key={theme.id}
              className={`theme-pill ${selectedThemeId === theme.id ? 'active' : ''}`}
              onClick={() => handleThemeChange(theme.id)}
            >
              {theme.label}
            </button>
          ))}
        </div>

        {/* Memory Cards Grid */}
        <div className="memory-grid">
          {cards.map((symbol, index) => {
            const isFlipped = flippedIndices.includes(index) || matchedSymbols.includes(symbol);
            const isMatched = matchedSymbols.includes(symbol);

            return (
              <motion.div 
                key={index}
                className={`memory-card-wrap ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}
                onClick={() => handleCardClick(index)}
                whileHover={{ scale: isFlipped ? 1 : 1.05 }}
                whileTap={{ scale: 0.94 }}
              >
                <div className="memory-card-inner">
                  <div className="memory-card-front">
                    <span className="card-question-mark">✨</span>
                  </div>
                  <div className="memory-card-back">
                    <span className="card-symbol-emoji">{symbol}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="memory-footer-bar">
          <button onClick={() => initializeGame()} className="restart-game-btn">
            🔄 Restart Game
          </button>
        </div>
      </div>
    </KidsPageTransition>
  );
};

export default MemoryMatch;
