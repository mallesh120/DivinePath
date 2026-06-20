import React from 'react';
import { usePanchangam } from '../../hooks/usePanchangam';
import './PanchangPage.css';

const TimingsTab = () => {
  const { loading, error, panchangamData } = usePanchangam();

  if (loading) return <div className="panchang-loading">Loading timings...</div>;
  if (error) return <div className="panchang-error">Failed to load data: {error}</div>;
  if (!panchangamData) return null;

  const { auspicious, inauspicious } = panchangamData;

  return (
    <div className="timings-tab-container">
      <div className="tab-header">
        <h2>Critical Timings</h2>
        <p>Plan your day effectively using these time blocks.</p>
      </div>

      <div className="timings-list">
        
        {/* Auspicious Timings */}
        <h3 className="timings-group-title success">✨ Auspicious (Favorable)</h3>
        {Object.entries(auspicious).map(([key, value]) => {
          if (!value) return null;
          return (
            <div key={key} className="timing-card glass-panel good">
              <div className="timing-icon">🟢</div>
              <div className="timing-info">
                <h4>{key}</h4>
                <p className="timing-desc">{getTimingDescription(key)}</p>
              </div>
              <div className="timing-time">{value}</div>
            </div>
          );
        })}

        {/* Inauspicious Timings */}
        <h3 className="timings-group-title warning">⚠️ Inauspicious (Avoid)</h3>
        {Object.entries(inauspicious).map(([key, value]) => {
          if (!value) return null;
          return (
            <div key={key} className="timing-card glass-panel bad">
              <div className="timing-icon">🔴</div>
              <div className="timing-info">
                <h4>{key}</h4>
                <p className="timing-desc">{getTimingDescription(key)}</p>
              </div>
              <div className="timing-time">{value}</div>
            </div>
          );
        })}
        
      </div>
    </div>
  );
};

// Helper function to translate complex Sanskrit terms into actionable advice
function getTimingDescription(timingName) {
  const descriptions = {
    'Abhijit Muhurat': 'Highly auspicious. Perfect for new beginnings.',
    'Amrit Kalam': 'Nectar time. Extremely favorable for all tasks.',
    'Brahma Muhurat': 'Ideal for spiritual practices and meditation.',
    'Rahu Kalam': 'Rule of Rahu. Strictly avoid starting new work.',
    'Yamaganda': 'Rule of Yama. Avoid important transactions.',
    'Gulikai Kalam': 'Associated with delays. Only do routine work.',
    'Dur Muhurtam': 'Negative period. Postpone major decisions.',
    'Varjyam': 'Poisonous time. Refrain from eating or traveling.'
  };
  return descriptions[timingName] || 'Specific astrological time block.';
}

export default TimingsTab;
