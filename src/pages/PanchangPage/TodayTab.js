import React from 'react';
import { usePanchangam } from '../../hooks/usePanchangam';
import './PanchangPage.css'; // Shared CSS for Panchang

const TodayTab = () => {
  const { loading, error, panchangamData } = usePanchangam();

  if (loading) return <div className="panchang-loading">Loading today's cosmic data...</div>;
  if (error) return <div className="panchang-error">Failed to load data: {error}</div>;
  if (!panchangamData) return null;

  const { almanac, solarLunar, auspicious, inauspicious } = panchangamData;

  // Determine Traffic Light Status based on current time (Simplified logic for concept)
  // In a real app, this would check Date.now() against the exact start/end times of Rahu Kalam, etc.
  const isRahuKalam = false; // Mock
  const isAbhijit = true; // Mock

  let trafficStatus = { color: 'yellow', text: 'Neutral Time', icon: '🟡', message: 'Good for routine tasks.' };
  if (isRahuKalam) {
    trafficStatus = { color: 'red', text: 'Rahu Kalam Active', icon: '🔴', message: 'Avoid starting new important tasks.' };
  } else if (isAbhijit) {
    trafficStatus = { color: 'green', text: 'Highly Auspicious', icon: '🟢', message: 'Abhijit Muhurat is active right now!' };
  }

  return (
    <div className="today-tab-container">
      
      {/* Top App Bar Context */}
      <div className="today-header-context">
        <span className="location-pin">📍 {panchangamData.meta.location}</span>
        <span className="date-display">{panchangamData.meta.day}</span>
      </div>

      {/* Hero Card (Glassmorphism) */}
      <div className="hero-card glass-panel">
        <h1 className="hindu-date-title">{almanac.Tithi.name}</h1>
        <p className="hindu-date-subtitle">{solarLunar.Paksha} • {solarLunar.Hindu_Month}</p>
        
        <div className="hero-stats">
          <div className="stat-pill">
            <span className="stat-icon">🌟</span>
            <span className="stat-value">{almanac.Nakshatra.name}</span>
          </div>
          <div className="stat-pill">
            <span className="stat-icon">🌙</span>
            <span className="stat-value">{solarLunar.Rashi} Rashi</span>
          </div>
        </div>
      </div>

      {/* Traffic Light Status Bar */}
      <div className={`status-bar status-${trafficStatus.color}`}>
        <div className="status-header">
          <span className="status-icon">{trafficStatus.icon}</span>
          <span className="status-title">{trafficStatus.text}</span>
        </div>
        <p className="status-message">{trafficStatus.message}</p>
      </div>

      {/* Quick Sun Timeline */}
      <div className="quick-timeline glass-panel">
        <h3>☀️ Daily Sun Arc</h3>
        <div className="timeline-bar-container">
          <div className="timeline-node start">
            <span className="node-icon">🌅</span>
            <span className="node-time">{almanac.Sunrise}</span>
            <span className="node-label">Sunrise</span>
          </div>
          <div className="timeline-line"></div>
          <div className="timeline-node end">
            <span className="node-icon">🌇</span>
            <span className="node-time">{almanac.Sunset}</span>
            <span className="node-label">Sunset</span>
          </div>
        </div>
      </div>

      {/* Sneak peek into timings */}
      <div className="quick-timings">
        <h3>Critical Timings Today</h3>
        <div className="timing-row bad">
          <span className="timing-name">Rahu Kalam</span>
          <span className="timing-value">{inauspicious['Rahu Kalam']}</span>
        </div>
        {auspicious['Abhijit Muhurat'] && (
          <div className="timing-row good">
            <span className="timing-name">Abhijit Muhurat</span>
            <span className="timing-value">{auspicious['Abhijit Muhurat']}</span>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default TodayTab;
