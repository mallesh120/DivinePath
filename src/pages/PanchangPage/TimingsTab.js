import React, { useState, useEffect } from 'react';
import { usePanchangam } from '../../hooks/usePanchangam';
import './PanchangPage.css';

// Helper function to provide clear, actionable advice for each muhurta
function getTimingDescription(timingName) {
  const cleanName = timingName.trim();
  const descriptions = {
    'Abhijit Muhurta': 'Highly auspicious midday victory window. Ideal for starting important projects, signings, and purchases.',
    'Abhijit Muhurat': 'Highly auspicious midday victory window. Ideal for starting important projects, signings, and purchases.',
    'Amrit Kalam': 'Nectar time of high cosmic vitality. Extremely favorable for ceremonies, travel, and ventures.',
    'Brahma Muhurta': 'Divine pre-dawn creator hour. Ideal for spiritual sadhana, meditation, japa, and learning.',
    'Brahma Muhurat': 'Divine pre-dawn creator hour. Ideal for spiritual sadhana, meditation, japa, and learning.',
    'Rahu Kalam': 'Inauspicious window governed by Rahu. Strictly avoid starting new work, journeys, or big purchases.',
    'Yamagandam': 'Inauspicious period ruled by Yama. Avoid signing contracts and beginning crucial transactions.',
    'Yamaganda': 'Inauspicious period ruled by Yama. Avoid signing contracts and beginning crucial transactions.',
    'Gulikai Kalam': 'Associated with Saturn/delays. Ideal for routine recurring tasks; avoid lending or funeral rites.',
    'Dur Muhurtam': 'Adverse planetary period. Postpone major decisions, journeys, and celebrations.',
    'Varjyam': 'Negative astrological time. Refrain from entering new premises, weddings, and travel.'
  };
  return descriptions[cleanName] || 'Specific astrological time block calculated for your coordinates.';
}

const TimingsTab = (props) => {
  const hookData = usePanchangam();
  const panchangamData = props.panchangamData || hookData.panchangamData;
  const loading = props.loading !== undefined ? props.loading : hookData.loading;
  const error = props.error !== undefined ? props.error : hookData.error;
  const currentCity = props.currentCity || hookData.currentCity;
  const setCity = props.setCity || hookData.setCity;
  const cities = props.cities || hookData.cities;
  const placeName = props.placeName || hookData.placeName;

  const [nowEpoch, setNowEpoch] = useState(Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNowEpoch(Date.now()), 30000);
    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return (
      <div className="panchang-loading-container">
        <div className="panchang-spinner"></div>
        <p className="panchang-loading-text">Loading cosmic planetary timings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="panchang-error-container glass-panel">
        <span className="error-icon">⚠️</span>
        <h3>Unable to load timings</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!panchangamData) return null;

  const { auspicious, inauspicious, rawTimings, meta } = panchangamData;
  const raw = rawTimings || {};

  // Check which timing is active right now
  const isTimingActive = (key) => {
    if (key.includes('Rahu') && raw.rahuStart && raw.rahuEnd) {
      return nowEpoch >= raw.rahuStart && nowEpoch <= raw.rahuEnd;
    }
    if (key.includes('Abhijit') && raw.abhijitStart && raw.abhijitEnd) {
      return nowEpoch >= raw.abhijitStart && nowEpoch <= raw.abhijitEnd;
    }
    if (key.includes('Brahma') && raw.brahmaStart && raw.brahmaEnd) {
      return nowEpoch >= raw.brahmaStart && nowEpoch <= raw.brahmaEnd;
    }
    if (key.includes('Yamagand') && raw.yamagandaStart && raw.yamagandaEnd) {
      return nowEpoch >= raw.yamagandaStart && nowEpoch <= raw.yamagandaEnd;
    }
    if (key.includes('Gulika') && raw.gulikaiStart && raw.gulikaiEnd) {
      return nowEpoch >= raw.gulikaiStart && nowEpoch <= raw.gulikaiEnd;
    }
    if (key.includes('Amrit') && raw.amritStart && raw.amritEnd) {
      return nowEpoch >= raw.amritStart && nowEpoch <= raw.amritEnd;
    }
    if (key.includes('Varjyam') && raw.varjyamStart && raw.varjyamEnd) {
      return nowEpoch >= raw.varjyamStart && nowEpoch <= raw.varjyamEnd;
    }
    return false;
  };

  return (
    <div className="timings-tab-container">
      {/* Header Context */}
      <div className="tab-header glass-panel">
        <div className="tab-header-top">
          <h2>Critical Timings</h2>
          <div className="location-picker-group">
            <span className="location-pin-icon">📍</span>
            <select 
              value={currentCity}
              onChange={(e) => setCity && setCity(e.target.value)}
              className="today-city-select"
              aria-label="Select City"
            >
              {cities && cities.map(c => (
                <option key={c.id} value={c.id}>
                  {c.id === 'auto' && placeName ? `${placeName} (Current)` : c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <p className="tab-header-subtitle">
          Astrological windows for <strong>{meta?.day || 'Today'}</strong> calculated for <strong>{placeName}</strong>. Plan your tasks according to planetary periods.
        </p>
      </div>

      <div className="timings-list">
        {/* Auspicious Timings Section */}
        <div className="timings-section">
          <h3 className="timings-group-title success">
            <span>✨ Auspicious (Shubha Timings)</span>
            <span className="group-badge good">Favorable</span>
          </h3>

          <div className="timings-cards-container">
            {Object.entries(auspicious).map(([key, value]) => {
              if (!value || value === 'N/A') return null;
              const active = isTimingActive(key);
              return (
                <div key={key} className={`timing-card glass-panel good ${active ? 'active-timing-card' : ''}`}>
                  <div className="timing-card-main">
                    <div className="timing-icon">🟢</div>
                    <div className="timing-info">
                      <div className="timing-title-row">
                        <h4>{key}</h4>
                        {active && <span className="active-tag">ACTIVE NOW</span>}
                      </div>
                      <p className="timing-desc">{getTimingDescription(key)}</p>
                    </div>
                  </div>
                  <div className="timing-time-badge">{value}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Inauspicious Timings Section */}
        <div className="timings-section">
          <h3 className="timings-group-title warning">
            <span>⚠️ Inauspicious (Ashubha Timings)</span>
            <span className="group-badge bad">Caution / Avoid</span>
          </h3>

          <div className="timings-cards-container">
            {Object.entries(inauspicious).map(([key, value]) => {
              if (!value || value === 'N/A') return null;
              const active = isTimingActive(key);
              return (
                <div key={key} className={`timing-card glass-panel bad ${active ? 'active-timing-card-bad' : ''}`}>
                  <div className="timing-card-main">
                    <div className="timing-icon">🔴</div>
                    <div className="timing-info">
                      <div className="timing-title-row">
                        <h4>{key}</h4>
                        {active && <span className="active-tag bad-tag">ACTIVE NOW</span>}
                      </div>
                      <p className="timing-desc">{getTimingDescription(key)}</p>
                    </div>
                  </div>
                  <div className="timing-time-badge bad">{value}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimingsTab;
