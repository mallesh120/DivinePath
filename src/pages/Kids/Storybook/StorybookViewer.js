import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { kidsStories } from '../../../data/kids/stories';
import KidsPageTransition from '../../../components/KidsLayout/KidsPageTransition';
import './StorybookViewer.css';

const StorybookViewer = () => {
  const { storyId } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [interactionState, setInteractionState] = useState('idle');

  useEffect(() => {
    let foundStory;
    if (storyId) {
      foundStory = kidsStories.find(s => s.id === storyId);
    } else {
      // If no storyId, default to the first one for testing/demo
      foundStory = kidsStories[0];
    }
    
    if (foundStory) {
      setStory(foundStory);
    } else {
      navigate('/kids/home');
    }
  }, [storyId, navigate]);

  // Handle Text-to-Speech
  const handleReadAloud = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85; // slightly slower for kids
      utterance.pitch = 1.1; // slightly higher pitch
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!story) return <div className="storybook-loading">Loading Story...</div>;

  const page = story.pages[currentPage];

  const nextBtn = () => {
    if (currentPage < story.pages.length - 1) {
      setCurrentPage(c => c + 1);
      setInteractionState('idle');
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    }
  };

  const prevBtn = () => {
    if (currentPage > 0) {
      setCurrentPage(c => c - 1);
      setInteractionState('idle');
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    }
  };

  const handleImageClick = () => {
    if (page.interactiveElement) {
      setInteractionState('active');
      setTimeout(() => setInteractionState('idle'), 2000); // reset after 2s
    }
  };

  // Define animations based on interactiveElement type
  const getAnimationVariants = () => {
    switch (page.interactiveElement) {
      case 'bounce':
        return {
          idle: { y: 0 },
          active: { y: [0, -50, 0, -25, 0], transition: { duration: 1 } }
        };
      case 'shake':
        return {
          idle: { x: 0 },
          active: { x: [-10, 10, -10, 10, 0], transition: { duration: 0.5 } }
        };
      case 'glow':
      case 'light-up':
        return {
          idle: { scale: 1, filter: 'drop-shadow(0px 0px 0px rgba(255,215,0,0))' },
          active: { scale: 1.2, filter: 'drop-shadow(0px 0px 30px rgba(255,215,0,1))', transition: { duration: 0.5 } }
        };
      case 'give-ring':
        return {
          idle: { x: 0, rotate: 0 },
          active: { x: 50, rotate: 360, transition: { duration: 1 } }
        };
      case 'tap-to-grow':
        return {
          idle: { scale: 1 },
          active: { scale: 1.5, transition: { duration: 0.5 } }
        };
      default:
        return { idle: {}, active: {} };
    }
  };

  return (
    <KidsPageTransition>
      <div className="storybook-container">
        <div className="storybook-header">
        <Link to="/kids/home" className="close-btn">✖</Link>
        <h2 className="story-title">{story.title}</h2>
        <div className="progress">Page {currentPage + 1} of {story.pages.length}</div>
      </div>

      <div className="storybook-content">
        <motion.div 
          className="story-image-container"
          onClick={handleImageClick}
          whileHover={{ scale: page.interactiveElement ? 1.05 : 1 }}
        >
          <motion.div 
            className="story-emoji"
            variants={getAnimationVariants()}
            initial="idle"
            animate={interactionState}
          >
            {page.imageEmoji}
          </motion.div>
          {page.interactiveElement && interactionState === 'idle' && (
            <div className="tap-hint">👆 Tap me!</div>
          )}
        </motion.div>

        <div className="story-text-container">
          <p className="story-text">{page.text}</p>
        </div>
      </div>

      <div className="storybook-controls">
        <button className="nav-btn" onClick={prevBtn} disabled={currentPage === 0}>
          ◀ Prev
        </button>
        
        <button 
          className={`read-aloud-btn ${isPlaying ? 'playing' : ''}`}
          onClick={() => handleReadAloud(page.text)}
        >
          {isPlaying ? '🔊 Reading...' : '▶️ Read to me'}
        </button>

        <button className="nav-btn" onClick={nextBtn} disabled={currentPage === story.pages.length - 1}>
          Next ▶
        </button>
        </div>
      </div>
    </KidsPageTransition>
  );
};

export default StorybookViewer;
