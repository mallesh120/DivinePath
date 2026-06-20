import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './KidsChanting.css';

// Using a simplified set of names for the kids demo
const names = [
  { sanskrit: "ॐ गजाननाय नमः", english: "Om Gajananaya Namah", meaning: "I bow to the elephant-faced Lord." },
  { sanskrit: "ॐ विघ्नराजाय नमः", english: "Om Vighnarajaya Namah", meaning: "I bow to the king of obstacles." },
  { sanskrit: "ॐ विनायकाय नमः", english: "Om Vinayakaya Namah", meaning: "I bow to the supreme leader." }
];

const KidsChanting = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentName = names[currentIndex];

  const handleReadAloud = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentName.english);
      utterance.rate = 0.8; 
      utterance.pitch = 1.2; 
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, []);

  const nextName = () => {
    if (currentIndex < names.length - 1) {
      setCurrentIndex(c => c + 1);
    } else {
      setCurrentIndex(0); // loop back
    }
  };

  return (
    <div className="kids-chanting-container">
      <div className="chanting-header">
        <h2>🌸 Chanting for Kids 🌸</h2>
        <p>Let's chant together!</p>
      </div>

      <motion.div 
        className="chant-card"
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <div className="chant-flower">🌺</div>
        <h1 className="chant-sanskrit">{currentName.sanskrit}</h1>
        <h2 className="chant-english">{currentName.english}</h2>
        <p className="chant-meaning">{currentName.meaning}</p>
        
        <div className="chant-controls">
          <button 
            className={`listen-btn ${isPlaying ? 'playing' : ''}`}
            onClick={handleReadAloud}
          >
            {isPlaying ? '🔊 Listening...' : '▶️ Listen'}
          </button>
          
          <button className="next-chant-btn" onClick={nextName}>
            Next ➜
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default KidsChanting;
