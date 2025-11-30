import React, { useState } from 'react';
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
  const [selectedDate, setSelectedDate] = useState('');
  const [userDetails, setUserDetails] = useState({
    birthDate: '',
    birthTime: '',
    birthPlace: '',
    eventLocation: ''
  });
  const [showCalculations, setShowCalculations] = useState(false);
  const [calculationMode, setCalculationMode] = useState('check'); // 'check' or 'find'

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setShowInfo(false);
  };

  const handleUserDetailsChange = (field, value) => {
    setUserDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleCalculateMuhurta = () => {
    if (selectedEvent && selectedDate) {
      setShowCalculations(true);
      // Force re-calculation - use mock data if panchangamData is not available
      const dataToUse = panchangamData || {
        almanac: {
          Nakshatra: { name: 'Rohini' },
          Tithi: { name: 'Panchami' },
          Yoga: { name: 'Siddha' }
        },
        day: new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' })
      };
      const result = getMuhurtaRecommendation(dataToUse, selectedEvent, selectedDate, userDetails);
      setRecommendation(result);
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

          {/* Calculation Mode Toggle */}
          <div className="mode-toggle-section">
            <h3>Choose Calculation Mode</h3>
            <div className="mode-toggle-buttons">
              <button
                className={`mode-button ${calculationMode === 'check' ? 'active' : ''}`}
                onClick={() => setCalculationMode('check')}
              >
                <span className="mode-icon">📊</span>
                <span className="mode-title">Check Specific Date</span>
                <span className="mode-desc">Get muhurta score for a date you have in mind</span>
              </button>
              <button
                className={`mode-button ${calculationMode === 'find' ? 'active' : ''}`}
                onClick={() => setCalculationMode('find')}
              >
                <span className="mode-icon">🔍</span>
                <span className="mode-title">Find Best Dates</span>
                <span className="mode-desc">Discover the most auspicious upcoming dates</span>
              </button>
            </div>
          </div>

          {/* User Details Form */}
          <div className="muhurta-calculator-form">
            <h3>📋 {calculationMode === 'check' ? 'Check Date Score' : 'Enter Details for Personalized Muhurta'}</h3>
            <p className="form-subtitle">
              {calculationMode === 'check' 
                ? 'Select a date to see its muhurta score and auspiciousness level'
                : 'Provide your birth details and event date for accurate auspicious time calculation'}
            </p>
            
            <div className="form-grid">
              {calculationMode === 'find' && (
                <>
                  <div className="form-group">
                    <label>📅 Your Birth Date</label>
                    <input
                      type="date"
                      value={userDetails.birthDate}
                      onChange={(e) => handleUserDetailsChange('birthDate', e.target.value)}
                      placeholder="Select date"
                    />
                    <small>Used for birth chart compatibility</small>
                  </div>

                  <div className="form-group">
                    <label>🕐 Birth Time</label>
                    <input
                      type="time"
                      value={userDetails.birthTime}
                      onChange={(e) => handleUserDetailsChange('birthTime', e.target.value)}
                      placeholder="HH:MM"
                    />
                    <small>24-hour format (e.g., 14:30)</small>
                  </div>

                  <div className="form-group">
                    <label>📍 Birth Place</label>
                    <input
                      type="text"
                      value={userDetails.birthPlace}
                      onChange={(e) => handleUserDetailsChange('birthPlace', e.target.value)}
                      placeholder="City, State"
                    />
                    <small>For accurate planetary positions</small>
                  </div>
                </>
              )}

              <div className="form-group">
                <label>🗓️ {calculationMode === 'check' ? 'Date to Check' : 'Proposed Event Date'}</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  placeholder="Select event date"
                />
                <small>{calculationMode === 'check' ? 'Select any date to check its score' : 'Date you want to check'}</small>
              </div>

              {calculationMode === 'find' && (
                <div className="form-group">
                  <label>📌 Event Location</label>
                  <input
                    type="text"
                    value={userDetails.eventLocation}
                    onChange={(e) => handleUserDetailsChange('eventLocation', e.target.value)}
                    placeholder="City, State"
                  />
                  <small>Where the event will take place</small>
                </div>
              )}
            </div>

            <button 
              className="calculate-button"
              onClick={handleCalculateMuhurta}
              disabled={!selectedDate}
            >
              <span className="button-icon">{calculationMode === 'check' ? '📊' : '🔮'}</span>
              {calculationMode === 'check' ? 'Check Date Score' : 'Calculate Auspicious Times'}
            </button>
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

          {recommendation && !loading && showCalculations && (
            <div className="recommendation-card">
              <div className="recommendation-header">
                <h3>Muhurta Analysis for {selectedEvent.name}</h3>
                <div className="date-info">
                  {selectedDate && new Date(selectedDate).toLocaleDateString('en-IN', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>

              {/* Enhanced Score Display */}
              <div className="score-display-section">
                <h3>Date Analysis Results</h3>
                <div className="score-content-grid">
                  <div className="score-meter-container">
                    <div className="score-circle">
                      <svg className="score-circle-svg" viewBox="0 0 200 200">
                        <circle
                          className="score-circle-bg"
                          cx="100"
                          cy="100"
                          r="85"
                        />
                        <circle
                          className={`score-circle-fill ${recommendation.status}`}
                          cx="100"
                          cy="100"
                          r="85"
                          strokeDasharray={`${(recommendation.score / 100) * 534} 534`}
                        />
                      </svg>
                      <div className="score-text-overlay">
                        <div className="score-number">{recommendation.score}</div>
                        <div className="score-outof">/100</div>
                      </div>
                    </div>
                    <div className={`score-status-text ${recommendation.status}`}>
                      {getStatusIcon(recommendation.status)} {' '}
                      {recommendation.status === 'auspicious' ? 'Highly Auspicious' :
                       recommendation.status === 'moderate' ? 'Moderately Favorable' :
                       'Not Recommended'}
                    </div>
                  </div>

                  <div className="score-breakdown">
                    <h4>Score Breakdown</h4>
                    <div className="breakdown-bars">
                      {recommendation.scoreBreakdown && recommendation.scoreBreakdown.map((item, index) => (
                        <div key={index} className="breakdown-item">
                          <div className="breakdown-header">
                            <span className="breakdown-label">{item.factor}</span>
                            <span className={`breakdown-points ${item.points >= 0 ? 'positive' : 'negative'}`}>
                              {item.points >= 0 ? '+' : ''}{item.points}
                            </span>
                          </div>
                          <div className="breakdown-bar-container">
                            <div 
                              className="breakdown-bar-fill" 
                              style={{ 
                                width: `${Math.abs(item.points)}%`,
                                backgroundColor: item.points >= 0 ? '#4CAF50' : '#F44336'
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="panchangam-details">
                <h4>Panchangam Details</h4>
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

              {/* Auspicious Time Windows */}
              {recommendation.auspiciousTimeWindows && recommendation.auspiciousTimeWindows.length > 0 && (
                <div className="time-windows-section">
                  <h4>🕐 Auspicious Time Windows</h4>
                  <p className="time-windows-subtitle">Recommended time slots for {selectedEvent.name}</p>
                  <div className="time-windows-grid">
                    {recommendation.auspiciousTimeWindows.map((window, index) => (
                      <div key={index} className={`time-window ${window.quality}`}>
                        <div className="window-header">
                          <span className="window-icon">{window.icon}</span>
                          <span className="window-name">{window.name}</span>
                          <span className={`window-badge ${window.quality}`}>
                            {window.quality === 'excellent' ? 'Excellent' : 
                             window.quality === 'good' ? 'Good' : 'Fair'}
                          </span>
                        </div>
                        <div className="window-time">
                          <span className="time-icon">⏰</span>
                          <span className="time-text">{window.startTime} - {window.endTime}</span>
                        </div>
                        <p className="window-description">{window.description}</p>
                        {window.suitableFor && (
                          <div className="suitable-for">
                            <strong>Best for:</strong> {window.suitableFor.join(', ')}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Inauspicious Periods to Avoid */}
              {recommendation.periodsToAvoid && recommendation.periodsToAvoid.length > 0 && (
                <div className="avoid-periods-section">
                  <h4>⛔ Periods to Avoid</h4>
                  <div className="avoid-periods-grid">
                    {recommendation.periodsToAvoid.map((period, index) => (
                      <div key={index} className="avoid-period">
                        <span className="avoid-icon">❌</span>
                        <div className="avoid-details">
                          <strong>{period.name}</strong>
                          <span className="avoid-time">{period.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
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
