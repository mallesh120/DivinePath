import React, { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { literatureData } from '../../data/literature';
import './StoryPlayerPage.css';

const StoryPlayerPage = () => {
  // Hooks MUST be called at the top level, before any conditional returns
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const nodeRef = useRef(null);

  const { storyId, kandaIndex } = useParams();
  
  const story = literatureData.find((s) => s.id === parseInt(storyId) || s.id === storyId);
  
  if (!story) {
    return (
      <div className="story-not-found">
        <h2>Story not found!</h2>
        <Link to="/library">Back to the Library</Link>
      </div>
    );
  }

  // Handle kandas (Ramayana), parvas (Mahabharata), mandalas (Rigveda), kaandas (Atharvaveda), samhitas (Yajurveda)
  const sections = story.kandas || story.parvas || story.mandalas || story.kaandas || story.samhitas;
  
  if (!sections || !sections[kandaIndex]) {
    return (
      <div className="story-not-found">
        <h2>Section not found!</h2>
        <Link to="/library">Back to the Library</Link>
      </div>
    );
  }

  const section = sections[kandaIndex];

  const handleNextScene = () => {
    if (currentSceneIndex < section.scenes.length - 1) {
      setCurrentSceneIndex(currentSceneIndex + 1);
    }
  };

  const handlePreviousScene = () => {
    if (currentSceneIndex > 0) {
      setCurrentSceneIndex(currentSceneIndex - 1);
    }
  };
  
  const isLastScene = currentSceneIndex === section.scenes.length - 1;
  const currentScene = section.scenes[currentSceneIndex];

  return (
    <div className="story-player">
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={currentSceneIndex}
          nodeRef={nodeRef} 
          timeout={300}
          classNames="fade"
        >
          <div ref={nodeRef} className="story-scene">
            <img src={currentScene.imageUrl} alt={`Scene ${currentSceneIndex + 1}`} className="scene-image" />
            <p className="scene-text">{currentScene.text}</p>
          </div>
        </CSSTransition>
      </SwitchTransition>

      <div className="story-navigation">
        {/* --- FIX IS HERE --- */}
        {/* This condition now correctly renders the 'Previous' button */}
        {currentSceneIndex > 0 && (
          <button onClick={handlePreviousScene} className="story-nav-button">
            &larr; Previous
          </button>
        )}
        
        {/* This condition now correctly renders the 'Next' button */}
        {!isLastScene && (
          <button onClick={handleNextScene} className="story-nav-button">
            Next &rarr;
          </button>
        )}
        {/* --- END OF FIX --- */}

        {isLastScene && (
          <Link to={`/library/ramayana/${storyId}`} className="story-nav-button finish">
            Finish
          </Link>
        )}
      </div>
    </div>
  );
};

export default StoryPlayerPage;