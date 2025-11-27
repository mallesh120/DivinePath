import React, { useState } from 'react';
import { shlokas } from '../../data/shlokasData'; 
import './ShlokaOfTheDay.css';

const ShlokaOfTheDay = () => {
  const [showDetails, setShowDetails] = useState(false);

  // Get the current day of the year (1-366)
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  // Use the day of the year to pick a shloka from the array
  const shloka = shlokas[dayOfYear % shlokas.length];

  return (
    <div className="shloka-widget">
      <div className="shloka-header">
        <h2 className="shloka-title">🕉️ Shloka of the Day</h2>
        <span className="shloka-source">{shloka.source}</span>
      </div>
      
      <div className="shloka-content">
        <div className="sanskrit-text">{shloka.sanskrit}</div>
        
        <div className="transliteration-section">
          <h4 className="section-label">Transliteration</h4>
          <p className="transliteration-text">{shloka.transliteration}</p>
        </div>

        <div className="translation-section">
          <h4 className="section-label">Translation</h4>
          <p className="translation-text">{shloka.translation}</p>
        </div>

        {showDetails && (
          <>
            <div className="meaning-section">
              <h4 className="section-label">Meaning</h4>
              <p className="meaning-text">{shloka.meaning}</p>
            </div>

            <div className="explanation-section">
              <h4 className="section-label">Detailed Explanation</h4>
              <p className="explanation-text">{shloka.explanation}</p>
            </div>
          </>
        )}

        <button 
          className="show-more-btn"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? 'Show Less' : 'Show More Details'}
        </button>
      </div>
    </div>
  );
};

export default ShlokaOfTheDay;