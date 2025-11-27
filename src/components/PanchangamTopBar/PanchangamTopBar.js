import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePanchangam } from '../../hooks/usePanchangam';
import './PanchangamTopBar.css';

const PanchangamTopBar = () => {
  const { loading, panchangamData } = usePanchangam();
  const [isExpanded, setIsExpanded] = useState(false);

  if (loading || !panchangamData) {
    return (
      <div className="panchangam-top-bar">
        <div className="panchangam-compact">
          <span className="panchangam-loading-text">Loading Panchangam...</span>
        </div>
      </div>
    );
  }

  const { meta, almanac, solarLunar } = panchangamData;

  return (
    <div className="panchangam-top-bar">
      <div className="panchangam-compact">
        <div className="panchangam-quick-info">
          <span className="panchangam-item">
            <span className="panchangam-icon">📍</span>
            {meta.location}
          </span>
          <span className="panchangam-separator">•</span>
          <span className="panchangam-item">
            <span className="panchangam-icon">📅</span>
            {meta.day}
          </span>
          <span className="panchangam-separator">•</span>
          <span className="panchangam-item">
            <span className="panchangam-icon">🌙</span>
            {almanac.Tithi.name}
          </span>
          <span className="panchangam-separator">•</span>
          <span className="panchangam-item">
            <span className="panchangam-icon">⭐</span>
            {almanac.Nakshatra.name}
          </span>
          <span className="panchangam-separator">•</span>
          <span className="panchangam-item">
            <span className="panchangam-icon">🌅</span>
            {solarLunar.Sunrise}
          </span>
          <span className="panchangam-separator">•</span>
          <span className="panchangam-item">
            <span className="panchangam-icon">🌇</span>
            {solarLunar.Sunset}
          </span>
        </div>
        
        <div className="panchangam-actions">
          <button 
            className="panchangam-toggle-btn"
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? "Show less" : "Show more details"}
          >
            {isExpanded ? '▲' : '▼'}
          </button>
          <Link to="/panchangam" className="panchangam-link-btn">
            View Full Panchangam
          </Link>
        </div>
      </div>

      {isExpanded && (
        <div className="panchangam-expanded">
          <div className="panchangam-expanded-grid">
            <div className="panchangam-expanded-section">
              <h4>Almanac Details</h4>
              <div className="panchangam-detail-row">
                <span>Yoga:</span>
                <span>{almanac.Yoga.name}</span>
              </div>
              <div className="panchangam-detail-row">
                <span>Karana:</span>
                <span>{almanac.Karana.name}</span>
              </div>
            </div>
            
            <div className="panchangam-expanded-section">
              <h4>Solar & Lunar</h4>
              <div className="panchangam-detail-row">
                <span>🌔 Moonrise:</span>
                <span>{solarLunar.Moonrise}</span>
              </div>
              <div className="panchangam-detail-row">
                <span>🌘 Moonset:</span>
                <span>{solarLunar.Moonset}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PanchangamTopBar;
