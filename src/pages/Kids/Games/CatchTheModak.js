import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import KidsPageTransition from '../../../components/KidsLayout/KidsPageTransition';
import useSoundEffects from '../../../hooks/useSoundEffects';
import ganeshaImage from '../../../assets/images/Gods/ganesha.webp'; // Idle image
import ganeshaRunningImage from '../../../assets/images/Gods/ganesha_running.jpg'; // Running image
import ganeshaEatingImage from '../../../assets/images/Gods/ganesha_eating.jpg'; // Eating image
import ganeshaHurtImage from '../../../assets/images/Gods/ganesha_hurt.jpg'; // Hurt image
import './CatchTheModak.css';

const GAME_SPEED = 0.03; // percentage per millisecond
const SPAWN_RATE = 1500; // ms between spawns

const ITEM_TYPES = [
  { id: 'modak', emoji: '🥟', points: 10, type: 'good' },
  { id: 'laddoo', emoji: '🟡', points: 10, type: 'good' },
  { id: 'stone', emoji: '🪨', points: -1, type: 'bad' },
  { id: 'twig', emoji: '🌿', points: -1, type: 'bad' }
];

const CatchTheModak = () => {
  const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'gameover'
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [basketPos, setBasketPos] = useState(50); // percentage 0-100
  const [items, setItems] = useState([]);
  const [isEating, setIsEating] = useState(false);
  const [isHurt, setIsHurt] = useState(false);
  const [direction, setDirection] = useState('idle'); // 'left', 'right', 'idle'
  
  const gameAreaRef = useRef(null);
  const requestRef = useRef();
  const lastSpawnTime = useRef(0);
  const lastTimeRef = useRef(0);
  const eatTimerRef = useRef(0);
  const hurtTimerRef = useRef(0);
  const lastMouseX = useRef(0);
  const directionTimeout = useRef(null);
  
  const { playClick, playSuccess, playError } = useSoundEffects();

  const handleMouseMove = useCallback((e) => {
    if (gameState !== 'playing' || !gameAreaRef.current) return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    
    if (x > lastMouseX.current + 2) setDirection('right');
    else if (x < lastMouseX.current - 2) setDirection('left');
    lastMouseX.current = x;

    clearTimeout(directionTimeout.current);
    directionTimeout.current = setTimeout(() => setDirection('idle'), 150);

    let percentage = (x / rect.width) * 100;
    // Keep basket within bounds
    percentage = Math.max(5, Math.min(95, percentage));
    setBasketPos(percentage);
  }, [gameState]);

  const handleTouchMove = useCallback((e) => {
    if (gameState !== 'playing' || !gameAreaRef.current) return;
    // prevent scrolling while playing
    e.preventDefault();
    const rect = gameAreaRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    
    if (x > lastMouseX.current + 2) setDirection('right');
    else if (x < lastMouseX.current - 2) setDirection('left');
    lastMouseX.current = x;

    clearTimeout(directionTimeout.current);
    directionTimeout.current = setTimeout(() => setDirection('idle'), 150);

    let percentage = (x / rect.width) * 100;
    percentage = Math.max(5, Math.min(95, percentage));
    setBasketPos(percentage);
  }, [gameState]);

  const startGame = () => {
    try { playClick(); } catch(e) {}
    setScore(0);
    setLives(3);
    setItems([]);
    setGameState('playing');
    lastSpawnTime.current = performance.now();
    lastTimeRef.current = performance.now();
  };

  const spawnItem = (time) => {
    if (time - lastSpawnTime.current > SPAWN_RATE) {
      const randomItemType = ITEM_TYPES[Math.floor(Math.random() * ITEM_TYPES.length)];
      const randomX = Math.floor(Math.random() * 90) + 5; // 5% to 95%
      
      const newItem = {
        id: Math.random().toString(36).substr(2, 9),
        x: randomX,
        y: -10, // Start slightly above top
        ...randomItemType,
        status: 'falling' // falling, caught, missed
      };
      
      setItems(prev => [...prev, newItem]);
      lastSpawnTime.current = time;
    }
  };

  const updateGame = useCallback((time) => {
    if (gameState !== 'playing') return;

    const deltaTime = time - (lastTimeRef.current || time);
    lastTimeRef.current = time;

    spawnItem(time);

    setItems(prevItems => {
      let currentLives = lives;
      let currentScore = score;
      let scoreChanged = false;
      let livesChanged = false;

      const updatedItems = prevItems.map(item => {
        if (item.status !== 'falling') return item;

        const newY = item.y + (GAME_SPEED * deltaTime); 

        if (newY > 80 && newY < 95) {
          const diff = Math.abs(item.x - basketPos);
          if (diff < 15) { // caught!
            if (item.type === 'good') {
              currentScore += item.points;
              scoreChanged = true;
              eatTimerRef.current = 400; // Trigger animation
              setIsEating(true);
              try { playSuccess(); } catch(e) {}
            } else {
              currentLives -= 1;
              livesChanged = true;
              hurtTimerRef.current = 400;
              setIsHurt(true);
              try { playError(); } catch(e) {}
            }
            return { ...item, status: 'caught', y: newY, resolvedAt: time };
          }
        }

        if (newY >= 100) {
          if (item.type === 'good') {
            currentLives -= 1;
            livesChanged = true;
            hurtTimerRef.current = 400;
            setIsHurt(true);
            try { playError(); } catch(e) {}
          }
          return { ...item, status: 'missed', y: 100, resolvedAt: time };
        }

        return { ...item, y: newY };
      });

      const activeItems = updatedItems.filter(item => {
        if (item.status === 'falling') return true;
        return (time - item.resolvedAt) < 300;
      });

      if (scoreChanged) setScore(currentScore);
      if (livesChanged) {
        setLives(currentLives);
        if (currentLives <= 0) {
          setGameState('gameover');
        }
      }

      return activeItems;
    });


    if (eatTimerRef.current > 0) {
      eatTimerRef.current -= deltaTime;
      if (eatTimerRef.current <= 0) setIsEating(false);
    }
    if (hurtTimerRef.current > 0) {
      hurtTimerRef.current -= deltaTime;
      if (hurtTimerRef.current <= 0) setIsHurt(false);
    }

    requestRef.current = requestAnimationFrame(updateGame);
  }, [gameState, basketPos, lives, score, playSuccess, playError]);

  useEffect(() => {
    if (gameState === 'playing') {
      requestRef.current = requestAnimationFrame(updateGame);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [gameState, updateGame]);

  return (
    <KidsPageTransition>
      <div className="modak-game-container">
        <div className="modak-header">
          <h2>Catch the Modak!</h2>
          <div className="modak-stats">
            <span className="score-display">⭐ Score: {score}</span>
            <span className="lives-display">{Array(lives).fill('❤️').join('')}</span>
          </div>
        </div>

        <div 
          className="game-area" 
          ref={gameAreaRef}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        >
          {gameState === 'start' && (
            <div className="game-overlay">
              <h3>Help Ganesha!</h3>
              <p>Catch the Modaks & Laddoos! Avoid the stones.</p>
              <button className="start-btn" onClick={startGame}>Play Now</button>
            </div>
          )}

          {gameState === 'gameover' && (
            <div className="game-overlay">
              <h3>Game Over!</h3>
              <p>You scored {score} points!</p>
              <button className="start-btn" onClick={startGame}>Play Again</button>
            </div>
          )}

          <div 
            className="basket" 
            style={{ left: `${basketPos}%` }}
          >
            <img 
              src={
                isEating ? ganeshaEatingImage :
                isHurt ? ganeshaHurtImage :
                (direction !== 'idle') ? ganeshaRunningImage :
                ganeshaImage
              } 
              alt="Ganesha" 
              className={`ganesha-basket-img ${isEating ? 'eating' : ''} ${isHurt ? 'hurt' : ''} ${direction === 'left' ? 'flip-horizontal' : ''} ${direction !== 'idle' && !isEating && !isHurt ? 'running' : ''}`} 
            />
          </div>

          <AnimatePresence>
            {items.map(item => (
              <motion.div
                key={item.id}
                className={`falling-item ${item.status}`}
                initial={{ opacity: 1, scale: 1, x: "-50%", top: "-10%", left: `${item.x}%` }}
                animate={
                  item.status === 'caught'
                    ? { top: "85%", left: `${basketPos}%`, scale: 0, opacity: 0, rotate: 360 }
                    : item.status === 'missed'
                    ? { top: "100%", opacity: 0, scale: 0.5, rotate: -180 }
                    : { top: `${item.y}%`, left: `${item.x}%`, scale: 1, opacity: 1, rotate: 0 }
                }
                transition={
                  item.status === 'falling' 
                    ? { duration: 0 } 
                    : { duration: 0.3, ease: "backIn" }
                }
              >
                {item.emoji}
              </motion.div>
            ))}
          </AnimatePresence>
          
        </div>
        
        <p className="controls-hint">Move your mouse or drag your finger to move the basket!</p>
      </div>
    </KidsPageTransition>
  );
};

export default CatchTheModak;
