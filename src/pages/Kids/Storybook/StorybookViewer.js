import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { kidsStories } from '../../../data/kids/stories';
import useSoundEffects from '../../../hooks/useSoundEffects';
import { useSadhana } from '../../../hooks/useSadhana';
import KidsPageTransition from '../../../components/KidsLayout/KidsPageTransition';
import './StorybookViewer.css';

const StorybookViewer = () => {
  const { storyId } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [interactionState, setInteractionState] = useState('idle');
  const [isFinished, setIsFinished] = useState(false);

  const { playClick, playSuccess } = useSoundEffects();
  const { awardStars, goals, toggleGoal } = useSadhana(true);

  useEffect(() => {
    let foundStory;
    if (storyId) {
      foundStory = kidsStories.find(s => s.id === storyId);
    } else {
      foundStory = kidsStories[0];
    }
    
    if (foundStory) {
      setStory(foundStory);
      setCurrentPage(0);
      setIsFinished(false);
    } else {
      navigate('/kids/stories');
    }
  }, [storyId, navigate]);

  // Handle Text-to-Speech
  const handleReadAloud = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85; // slightly slower for kids
      utterance.pitch = 1.1; // cheerful higher pitch
      
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
  const currentEmoji = page.imageEmoji || page.image || story.coverEmoji || '📖';
  const currentIllustration = page.illustration || story.illustration;

  const nextBtn = () => {
    try { playClick(); } catch (e) {}
    if (currentPage < story.pages.length - 1) {
      setCurrentPage(c => c + 1);
      setInteractionState('idle');
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    } else {
      // Finished story
      handleFinishStory();
    }
  };

  const prevBtn = () => {
    try { playClick(); } catch (e) {}
    if (currentPage > 0) {
      setCurrentPage(c => c - 1);
      setInteractionState('idle');
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    }
  };

  const handleFinishStory = () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    try { playSuccess(); } catch (e) {}
    awardStars(1);
    if (!goals.story) {
      toggleGoal('story');
    }
    setIsFinished(true);
  };

  const handleReadAgain = () => {
    try { playClick(); } catch (e) {}
    setCurrentPage(0);
    setIsFinished(false);
    setInteractionState('idle');
  };

  const handleImageClick = () => {
    try { playClick(); } catch (e) {}
    setInteractionState('active');
    setTimeout(() => setInteractionState('idle'), 2000);
  };

  // Define animations based on interactiveElement type
  const getAnimationVariants = () => {
    switch (page.interactiveElement) {
      case 'bounce':
        return {
          idle: { y: 0 },
          active: { y: [0, -36, 0, -18, 0], transition: { duration: 0.8 } }
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
          active: { scale: 1.25, filter: 'drop-shadow(0px 0px 30px rgba(255,215,0,1))', transition: { duration: 0.5 } }
        };
      case 'give-ring':
        return {
          idle: { x: 0, rotate: 0 },
          active: { x: [0, 40, 0], rotate: [0, 360, 0], transition: { duration: 0.9 } }
        };
      case 'tap-to-grow':
        return {
          idle: { scale: 1 },
          active: { scale: 1.35, transition: { duration: 0.5 } }
        };
      case 'sparkle':
        return {
          idle: { scale: 1, rotate: 0 },
          active: { scale: [1, 1.3, 1], rotate: [0, 15, -15, 0], transition: { duration: 0.7 } }
        };
      default:
        return {
          idle: { scale: 1 },
          active: { scale: 1.2, transition: { duration: 0.4 } }
        };
    }
  };

  if (isFinished) {
    return (
      <KidsPageTransition>
        <div className="storybook-container finished">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            className="story-finish-card"
          >
            <div className="finish-trophy">🌟</div>
            <h2>Wonderful Reading!</h2>
            <p className="finish-subtitle">You completed <strong>{story.title}</strong></p>
            <div className="star-earned-badge">
              <span>⭐ +1 Dharma Star Awarded!</span>
            </div>
            <div className="finish-actions">
              <Link 
                to="/kids/stories" 
                className="catalog-btn"
                onClick={() => { try { playClick(); } catch (e) {} }}
              >
                📚 All Stories
              </Link>
              <button 
                onClick={handleReadAgain} 
                className="read-again-btn"
              >
                🔄 Read Again
              </button>
            </div>
          </motion.div>
        </div>
      </KidsPageTransition>
    );
  }

  return (
    <KidsPageTransition>
      <div className="storybook-container">
        <div className="storybook-header">
          <Link 
            to="/kids/stories" 
            className="back-catalog-link"
            onClick={() => {
              if ('speechSynthesis' in window) window.speechSynthesis.cancel();
              try { playClick(); } catch (e) {}
            }}
          >
            ◀ Stories
          </Link>
          <h2 className="story-title">{story.title}</h2>
          <div className="page-progress-pill">
            Page {currentPage + 1} / {story.pages.length}
          </div>
        </div>

        <div className="storybook-content">
          <motion.div 
            className="story-image-container"
            onClick={handleImageClick}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {currentIllustration ? (
              <div className="illustration-wrapper">
                <img 
                  src={currentIllustration} 
                  alt={story.title} 
                  className="story-illustration-img"
                />
                <motion.div 
                  className="story-emoji floating-badge"
                  variants={getAnimationVariants()}
                  initial="idle"
                  animate={interactionState}
                >
                  {currentEmoji}
                </motion.div>
              </div>
            ) : (
              <motion.div 
                className="story-emoji"
                variants={getAnimationVariants()}
                initial="idle"
                animate={interactionState}
              >
                {currentEmoji}
              </motion.div>
            )}

            {interactionState === 'idle' && (
              <div className="tap-hint">👆 Tap me!</div>
            )}
          </motion.div>

          <div className="story-text-container">
            <AnimatePresence mode="wait">
              <motion.p 
                key={currentPage}
                className="story-text"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                {page.text}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        <div className="storybook-controls">
          <button 
            className="nav-btn prev-btn" 
            onClick={prevBtn} 
            disabled={currentPage === 0}
          >
            ◀ Prev
          </button>
          
          <button 
            className={`read-aloud-btn ${isPlaying ? 'playing' : ''}`}
            onClick={() => handleReadAloud(page.text)}
          >
            {isPlaying ? '🔊 Reading...' : '▶️ Read to me'}
          </button>

          <button 
            className={`nav-btn next-btn ${currentPage === story.pages.length - 1 ? 'finish-btn' : ''}`} 
            onClick={nextBtn}
          >
            {currentPage === story.pages.length - 1 ? 'Finish ⭐' : 'Next ▶'}
          </button>
        </div>
      </div>
    </KidsPageTransition>
  );
};

export default StorybookViewer;
