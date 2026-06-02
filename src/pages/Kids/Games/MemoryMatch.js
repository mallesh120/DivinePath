import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useSoundEffects from '../../../hooks/useSoundEffects';
import KidsPageTransition from '../../../components/KidsLayout/KidsPageTransition';
import './MemoryMatch.css';

const SYMBOLS = ['🪔', '🐘', '🏹', '🕉️', '🐒', '🪷'];

const MemoryMatch = () => {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [moves, setMoves] = useState(0);

  const { playClick, playSuccess, playError } = useSoundEffects();

  const initializeGame = () => {
    // Create pairs and shuffle
    const paired = [...SYMBOLS, ...SYMBOLS];
    const shuffled = paired.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedIndices([]);
    setMatchedPairs([]);
    setIsFinished(false);
    setMoves(0);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (index) => {
    // Prevent clicking if 2 are already flipped, or if it's already matched/flipped
    if (flippedIndices.length === 2) return;
    if (flippedIndices.includes(index) || matchedPairs.includes(cards[index])) return;

    playClick();
    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [firstIdx, secondIdx] = newFlipped;
      if (cards[firstIdx] === cards[secondIdx]) {
        // Match found
        setTimeout(() => {
          playSuccess();
          const newMatched = [...matchedPairs, cards[firstIdx]];
          setMatchedPairs(newMatched);
          setFlippedIndices([]);
          
          if (newMatched.length === SYMBOLS.length) {
            setIsFinished(true);
            playSuccess(); // play another success sound for winning
          }
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          playError();
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  if (isFinished) {
    return (
      <KidsPageTransition>
        <div className="memory-container finished">
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            className="win-card"
          >
            <h1>🎉 You Won! 🎉</h1>
            <p>You found all matches in {moves} moves!</p>
            <button onClick={initializeGame} className="play-again-btn">Play Again</button>
          </motion.div>
        </div>
      </KidsPageTransition>
    );
  }

  return (
    <KidsPageTransition>
      <div className="memory-container">
        <div className="memory-header">
          <h2>Memory Match</h2>
          <div className="moves-badge">Moves: {moves}</div>
        </div>

        <div className="memory-grid">
          {cards.map((symbol, index) => {
            const isFlipped = flippedIndices.includes(index) || matchedPairs.includes(symbol);
            return (
              <motion.div 
                key={index}
                className={`memory-card-wrap ${isFlipped ? 'flipped' : ''}`}
                onClick={() => handleCardClick(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="memory-card-inner">
                  <div className="memory-card-front">
                    ❓
                  </div>
                  <div className="memory-card-back">
                    {symbol}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </KidsPageTransition>
  );
};

export default MemoryMatch;
