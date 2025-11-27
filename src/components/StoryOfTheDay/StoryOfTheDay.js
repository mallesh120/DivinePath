import React, { useState } from 'react';
import { puranaStories } from '../../data/storiesData';
import './StoryOfTheDay.css';

const StoryOfTheDay = () => {
  const [expanded, setExpanded] = useState(false);

  // Get the current day of the year to select a story
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  const story = puranaStories[dayOfYear % puranaStories.length];

  return (
    <div className="story-widget">
      <div className="story-header">
        <h2 className="story-title">📖 Story of the Day</h2>
        <span className="story-category">{story.category}</span>
      </div>

      <h3 className="story-name">{story.title}</h3>
      <p className="story-excerpt">{story.excerpt}</p>

      {expanded && (
        <>
          <div className="story-content">
            {story.story.split('\n\n').map((paragraph, index) => (
              <p key={index} className="story-paragraph">{paragraph}</p>
            ))}
          </div>

          <div className="story-moral">
            <h4 className="moral-label">Moral of the Story</h4>
            <p className="moral-text">{story.moral}</p>
          </div>

          <div className="story-tags">
            {story.tags.map((tag, index) => (
              <span key={index} className="story-tag">{tag}</span>
            ))}
          </div>
        </>
      )}

      <button 
        className="read-more-btn"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? 'Show Less' : 'Read Full Story'}
      </button>
    </div>
  );
};

export default StoryOfTheDay;
