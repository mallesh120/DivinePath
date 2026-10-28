import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import useSoundEffects from '../../../hooks/useSoundEffects';
import { useSadhana } from '../../../hooks/useSadhana';
import ArcadePlayerShell from './ArcadePlayerShell';
import { saveGameHighScore } from './arcadeCatalog';
import './MemoryMatch.css';

const THEMES = [
  { id: 'symbols', label: '🕉️ Sacred Symbols', symbols: ['🪔', '🕉️', '🪷', '🔔', '🔱', '🐚'] },
  { id: 'animals', label: '🐘 Divine Friends', symbols: ['🐘', '🐒', '🦚', '🐮', '🦢', '🦅'] },
  { id: 'legends', label: '🏹 Epic Legends', symbols: ['🏹', '👑', '☀️', '💍', '⛰️', '🌺'] },
];

const MemoryMatchStage = ({ isPaused }) => {
  const [selectedThemeId, setSelectedThemeId] = useState('symbols');
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedSymbols, setMatchedSymbols] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const { playClick, playSuccess, playError, playPop } = useSoundEffects();
  const { awardStars } = useSadhana(true);

  const currentTheme = THEMES.find((t) => t.id === selectedThemeId) || THEMES[0];

  const initializeGame = useCallback(
    (themeToUse = currentTheme) => {
      const symbolList = themeToUse.symbols;
      const paired = [...symbolList, ...symbolList];
      const shuffled = paired.sort(() => Math.random() - 0.5);
      setCards(shuffled);
      setFlippedIndices([]);
      setMatchedSymbols([]);
      setIsFinished(false);
      setMoves(0);
      setScore(0);
      setStreak(0);
    },
    [currentTheme]
  );

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const handleThemeChange = (themeId) => {
    try {
      playClick();
    } catch (e) {}
    setSelectedThemeId(themeId);
    const newTheme = THEMES.find((t) => t.id === themeId);
    initializeGame(newTheme);
  };

  const handleCardClick = (index) => {
    if (isPaused) return;
    if (flippedIndices.length === 2) return;
    if (flippedIndices.includes(index) || matchedSymbols.includes(cards[index])) return;

    try {
      playClick();
    } catch (e) {}
    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      const nextMoves = moves + 1;
      setMoves(nextMoves);
      const [firstIdx, secondIdx] = newFlipped;

      if (cards[firstIdx] === cards[secondIdx]) {
        const nextStreak = streak + 1;
        setStreak(nextStreak);
        const gained = 50 * nextStreak;
        const nextScore = score + gained;
        setScore(nextScore);
        saveGameHighScore('memory', nextScore);

        setTimeout(() => {
          try {
            playPop(1 + nextStreak * 0.15);
          } catch (e) {}
          const newMatched = [...matchedSymbols, cards[firstIdx]];
          setMatchedSymbols(newMatched);
          setFlippedIndices([]);

          if (newMatched.length === currentTheme.symbols.length) {
            const efficiencyBonus = Math.max(20, (18 - nextMoves) * 20);
            const finalTotal = nextScore + efficiencyBonus;
            setScore(finalTotal);
            saveGameHighScore('memory', finalTotal);
            awardStars(1);
            setIsFinished(true);
            try {
              playSuccess();
            } catch (e) {}
          }
        }, 380);
      } else {
        setStreak(0);
        setTimeout(() => {
          try {
            playError();
          } catch (e) {}
          setFlippedIndices([]);
        }, 820);
      }
    }
  };

  return (
    <div className="memory-arcade-stage">
      {isFinished ? (
        <div className="memory-container finished">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="win-card"
          >
            <div className="win-emoji">🎉</div>
            <h2>Super Memory Champion!</h2>
            <p className="win-detail">
              You discovered all pairs in <strong>{moves} moves</strong> with{' '}
              <strong>{score} pts</strong>!
            </p>
            <div className="memory-star-badge">
              <span>⭐ +1 Dharma Star Earned!</span>
            </div>
            <div className="win-actions">
              <button onClick={() => initializeGame()} className="play-again-btn">
                🔄 Play Again
              </button>
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="memory-container">
          <div className="memory-header">
            <div className="theme-selector-bar">
              {THEMES.map((theme) => (
                <button
                  key={theme.id}
                  className={`theme-pill ${selectedThemeId === theme.id ? 'active' : ''}`}
                  onClick={() => handleThemeChange(theme.id)}
                >
                  {theme.label}
                </button>
              ))}
            </div>
            <div className="stats-badges">
              <span className="moves-badge">⭐ Score: {score}</span>
              <span className="moves-badge">Moves: {moves}</span>
              <span className="pairs-badge">
                Pairs: {matchedSymbols.length}/{currentTheme.symbols.length}
              </span>
            </div>
          </div>

          <div className="memory-grid">
            {cards.map((symbol, index) => {
              const isFlipped =
                flippedIndices.includes(index) || matchedSymbols.includes(symbol);
              const isMatched = matchedSymbols.includes(symbol);

              return (
                <motion.div
                  key={index}
                  className={`memory-card-wrap ${isFlipped ? 'flipped' : ''} ${
                    isMatched ? 'matched' : ''
                  }`}
                  onClick={() => handleCardClick(index)}
                  whileHover={{ scale: isFlipped ? 1 : 1.04 }}
                  whileTap={{ scale: 0.95 }}
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
        </div>
      )}
    </div>
  );
};

const MemoryMatch = () => {
  return (
    <ArcadePlayerShell gameId="memory">
      {({ isPaused }) => <MemoryMatchStage isPaused={isPaused} />}
    </ArcadePlayerShell>
  );
};

export default MemoryMatch;
