import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { kidsShlokas } from '../../../data/kids/shlokas';
import useSoundEffects from '../../../hooks/useSoundEffects';
import { useSadhana } from '../../../hooks/useSadhana';
import KidsPageTransition from '../../../components/KidsLayout/KidsPageTransition';
import './KidsChanting.css';

const KidsChanting = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [petals, setPetals] = useState([]);
  const [bellRinging, setBellRinging] = useState(false);
  const [chantCount, setChantCount] = useState(0);

  const { playClick, playSuccess } = useSoundEffects();
  const { awardStars, goals, toggleGoal } = useSadhana(true);

  const currentShloka = kidsShlokas[currentIndex];

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleReadAloud = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentShloka.english);
      utterance.rate = 0.8;
      utterance.pitch = 1.15;

      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => {
        setIsPlaying(false);
        handleChantComplete();
      };
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  const handleChantComplete = () => {
    setChantCount(c => c + 1);
    try { playSuccess(); } catch (e) {}
    awardStars(1);
    if (!goals.chant) {
      toggleGoal('chant');
    }
  };

  const handleOfferFlower = () => {
    try { playSuccess(); } catch (e) {}
    // Spawn 5 floating petals
    const newPetals = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      emoji: ['🌸', '🌺', '🌼', '🪷'][Math.floor(Math.random() * 4)],
      x: Math.random() * 200 - 100,
      y: -(Math.random() * 150 + 80)
    }));

    setPetals(prev => [...prev, ...newPetals]);
    setTimeout(() => {
      setPetals(prev => prev.filter(p => !newPetals.some(np => np.id === p.id)));
    }, 1500);

    handleChantComplete();
  };

  const handleRingBell = () => {
    setBellRinging(true);
    setTimeout(() => setBellRinging(false), 1000);

    // Audio synthesis of a bell chime
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(1174.66, ctx.currentTime); // D6
        osc.frequency.exponentialRampToValueAtTime(587.33, ctx.currentTime + 1.2);

        gain.gain.setValueAtTime(0.4, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 1.2);
      }
    } catch (e) {}
  };

  const nextShloka = () => {
    try { playClick(); } catch (e) {}
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setIsPlaying(false);
    setCurrentIndex(c => (c + 1) % kidsShlokas.length);
  };

  const prevShloka = () => {
    try { playClick(); } catch (e) {}
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setIsPlaying(false);
    setCurrentIndex(c => (c - 1 + kidsShlokas.length) % kidsShlokas.length);
  };

  const selectDeity = (idx) => {
    try { playClick(); } catch (e) {}
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setIsPlaying(false);
    setCurrentIndex(idx);
  };

  return (
    <KidsPageTransition>
      <div className="kids-chanting-container">
        {/* Header */}
        <div className="chanting-header">
          <div className="chanting-title-group">
            <h2>🌸 Mantra & Shloka Garden 🪷</h2>
            <p>Sing along, learn Sanskrit wisdom, and earn Dharma Stars!</p>
          </div>
          <div className="chant-star-pill">
            <span>⭐ Chanted: {chantCount} times</span>
          </div>
        </div>

        {/* Deity Selector Tabs */}
        <div className="deity-selector-chips" role="tablist" aria-label="Select Deity Shloka">
          {kidsShlokas.map((s, idx) => (
            <button
              key={s.id}
              className={`deity-chip ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => selectDeity(idx)}
              role="tab"
              aria-selected={idx === currentIndex}
            >
              <span className="deity-chip-icon">{s.icon}</span>
              <span className="deity-chip-name">{s.deity}</span>
            </button>
          ))}
        </div>

        {/* Main Shloka Card */}
        <motion.div 
          className="chant-card"
          key={currentShloka.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          style={{ borderColor: currentShloka.color || '#F59E0B' }}
        >
          {/* Animated Petals Area */}
          <div className="petals-container">
            <AnimatePresence>
              {petals.map(petal => (
                <motion.span
                  key={petal.id}
                  className="floating-petal"
                  initial={{ opacity: 1, scale: 0.6, x: 0, y: 0 }}
                  animate={{ opacity: 0, scale: 1.4, x: petal.x, y: petal.y }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                >
                  {petal.emoji}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>

          <div className="chant-avatar-area">
            <motion.div 
              className="chant-deity-badge"
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              <span className="badge-icon">{currentShloka.icon}</span>
            </motion.div>
            <span className="deity-subtitle">{currentShloka.deity}</span>
          </div>

          {/* Shloka Verses */}
          <div className="shloka-verses">
            <h1 className="chant-sanskrit">{currentShloka.sanskrit}</h1>
            <p className="chant-english">{currentShloka.english}</p>
          </div>

          {/* Meaning Card */}
          <div className="chant-meaning-box">
            <span className="meaning-heading">✨ Meaning</span>
            <p className="chant-meaning-text">{currentShloka.meaning}</p>
          </div>
          
          {/* Interactive Offering Buttons */}
          <div className="interaction-tray">
            <motion.button 
              className="offer-btn flower-offer"
              onClick={handleOfferFlower}
              whileTap={{ scale: 0.92 }}
            >
              🌸 Offer Flowers
            </motion.button>

            <motion.button 
              className="offer-btn bell-offer"
              onClick={handleRingBell}
              whileTap={{ scale: 0.92 }}
            >
              <motion.span 
                className="bell-icon"
                animate={bellRinging ? { rotate: [-20, 20, -20, 20, 0] } : {}}
                transition={{ duration: 0.6 }}
              >
                🔔
              </motion.span>
              Ring Bell
            </motion.button>
          </div>

          {/* Audio and Nav Controls */}
          <div className="chant-controls">
            <button className="nav-chant-btn" onClick={prevShloka} title="Previous Shloka">
              ◀ Prev
            </button>

            <button 
              className={`listen-btn ${isPlaying ? 'playing' : ''}`}
              onClick={handleReadAloud}
            >
              {isPlaying ? '🔊 Chanting...' : '▶️ Chant With Me'}
            </button>
            
            <button className="nav-chant-btn" onClick={nextShloka} title="Next Shloka">
              Next ▶
            </button>
          </div>
        </motion.div>
      </div>
    </KidsPageTransition>
  );
};

export default KidsChanting;
