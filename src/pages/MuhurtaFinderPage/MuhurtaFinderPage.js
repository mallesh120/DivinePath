import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePanchangam } from '../../hooks/usePanchangam';
import { 
  muhurtaEventTypes, 
  getMuhurtaRecommendation 
} from '../../data/muhurtaData';
import './MuhurtaFinderPage.css';

function MuhurtaFinderPage() {
  const { data: panchangamData, loading, error } = usePanchangam();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [showInfo, setShowInfo] = useState(true);

  useEffect(() => {
    if (selectedEvent && panchangamData) {
      const result = getMuhurtaRecommendation(panchangamData, selectedEvent);
      setRecommendation(result);
    }
  }, [selectedEvent, panchangamData]);

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setShowInfo(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'auspicious': return '#4CAF50';
      case 'moderate': return '#FF9800';
      case 'avoid': return '#F44336';
      default: return '#757575';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'auspicious': return '✅';
      case 'moderate': return '⚠️';
      case 'avoid': return '❌';
      default: return '❓';
    }
  };

  return (
    <div className="muhurta-finder-page">
      <div className="muhurta-header">
        <h1>🕉️ Muhurta Finder</h1>
        <p className="muhurta-subtitle">Find Auspicious Times for Important Events</p>
      </div>

      {showInfo && (
        <div className="muhurta-info-card">
          <h3>What is Muhurta?</h3>
          <p>
            Muhurta is the science of selecting the most auspicious time for important activities.
            Based on Vedic astrology, it considers the positions of planets, tithis, nakshatras, 
            and other celestial factors to maximize success and positive outcomes.
          </p>
          <div className="muhurta-factors">
            <div className="factor">
              <span className="factor-icon">🌙</span>
              <span className="factor-name">Tithi</span>
              <span className="factor-desc">Lunar day</span>
            </div>
            <div className="factor">
              <span className="factor-icon">⭐</span>
              <span className="factor-name">Nakshatra</span>
              <span className="factor-desc">Lunar mansion</span>
            </div>
            <div className="factor">
              <span className="factor-icon">📅</span>
              <span className="factor-name">Day</span>
              <span className="factor-desc">Weekday</span>
            </div>
            <div className="factor">
              <span className="factor-icon">🔮</span>
              <span className="factor-name">Yoga</span>
              <span className="factor-desc">Planetary combination</span>
            </div>
          </div>
          <button 
            className="info-close-btn"
            onClick={() => setShowInfo(false)}
          >
            Continue to Select Event
          </button>
        </div>
      )}

      <div className="event-selection">
        <h2>Select Event Type</h2>
        <div className="event-grid">
          {muhurtaEventTypes.map((event) => (
            <div
              key={event.id}
              className={`event-card ${selectedEvent?.id === event.id ? 'selected' : ''}`}
              onClick={() => handleEventSelect(event)}
            >
              <div className="event-icon">{event.id === 'wedding' ? '💍' : 
                event.id === 'housewarming' ? '🏠' :
                event.id === 'vehicle' ? '🚗' :
                event.id === 'business' ? '💼' :
                event.id === 'education' ? '📚' : '✈️'}</div>
              <h3>{event.name}</h3>
              <p>{event.description}</p>
            </div>
          ))}
        </div>
      </div>

      {selectedEvent && (
        <div className="event-details-section">
          <div className="event-info">
            <h2>{selectedEvent.name}</h2>
            <div className="event-meta">
              <span>⏱️ Typical Duration: {selectedEvent.duration}</span>
            </div>
            <div className="considerations">
              <h4>Key Considerations:</h4>
              <ul>
                {selectedEvent.considerations.map((consideration, index) => (
                  <li key={index}>{consideration}</li>
                ))}
              </ul>
            </div>
          </div>

          {loading && (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Calculating muhurta...</p>
            </div>
          )}

          {error && (
            <div className="error-state">
              <p>Unable to fetch Panchangam data. Please check your internet connection.</p>
            </div>
          )}

          {recommendation && !loading && (
            <div className="recommendation-card">
              <div className="recommendation-header">
                <h3>Today's Muhurta Analysis</h3>
                <div className="date-info">
                  {panchangamData?.date && new Date(panchangamData.date).toLocaleDateString('en-IN', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>

              <div 
                className="status-badge"
                style={{ backgroundColor: getStatusColor(recommendation.status) }}
              >
                <span className="status-icon">{getStatusIcon(recommendation.status)}</span>
                <span className="status-text">
                  {recommendation.status === 'auspicious' ? 'Highly Auspicious' :
                   recommendation.status === 'moderate' ? 'Moderately Favorable' :
                   'Not Recommended'}
                </span>
                <span className="status-score">{recommendation.score}/100</span>
              </div>

              <div className="panchangam-details">
                <h4>Today's Panchangam</h4>
                <div className="panchangam-grid">
                  <div className="pancha-item">
                    <span className="pancha-label">Tithi:</span>
                    <span className="pancha-value">{panchangamData?.tithi || 'N/A'}</span>
                  </div>
                  <div className="pancha-item">
                    <span className="pancha-label">Nakshatra:</span>
                    <span className="pancha-value">{panchangamData?.nakshatra || 'N/A'}</span>
                  </div>
                  <div className="pancha-item">
                    <span className="pancha-label">Day:</span>
                    <span className="pancha-value">{panchangamData?.day || 'N/A'}</span>
                  </div>
                  <div className="pancha-item">
                    <span className="pancha-label">Yoga:</span>
                    <span className="pancha-value">{panchangamData?.yoga || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {recommendation.favorableFactors.length > 0 && (
                <div className="factors-section favorable">
                  <h4>✅ Favorable Factors</h4>
                  <ul>
                    {recommendation.favorableFactors.map((factor, index) => (
                      <li key={index}>{factor}</li>
                    ))}
                  </ul>
                </div>
              )}

              {recommendation.unfavorableFactors.length > 0 && (
                <div className="factors-section unfavorable">
                  <h4>⚠️ Unfavorable Factors</h4>
                  <ul>
                    {recommendation.unfavorableFactors.map((factor, index) => (
                      <li key={index}>{factor}</li>
                    ))}
                  </ul>
                </div>
              )}

              {recommendation.recommendations.length > 0 && (
                <div className="recommendations-section">
                  <h4>📋 Recommendations</h4>
                  <ul>
                    {recommendation.recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="alternative-dates">
                <h4>Need Alternative Dates?</h4>
                <p>
                  For personalized muhurta calculations with your birth chart, 
                  consult a qualified Vedic astrologer or pandit.
                </p>
                <div className="tips">
                  <h5>General Tips:</h5>
                  <ul>
                    <li>Avoid Rahu Kaal and Yamaganda timings</li>
                    <li>Morning muhurtas (6-10 AM) are generally favorable</li>
                    <li>Shukla Paksha (waxing moon) is preferred for new beginnings</li>
                    <li>Avoid scheduling during solar/lunar eclipses</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="muhurta-footer">
        <div className="disclaimer">
          <h4>⚠️ Important Note</h4>
          <p>
            This muhurta analysis is based on general astrological principles and today's Panchangam. 
            For important life events, it is recommended to consult with a qualified Vedic astrologer 
            who can consider your personal birth chart and other specific factors.
          </p>
        </div>
        <Link to="/dashboard" className="back-button">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default MuhurtaFinderPage;
