import React from 'react';
import { usePanchangam } from '../../hooks/usePanchangam';
import './PanchangamPage.css';

const PanchangamPage = () => {
  const { loading, error, panchangamData } = usePanchangam();

  if (loading) {
    return <div className="panchangam-page-loading">Loading Panchangam data...</div>;
  }

  if (!panchangamData && error) {
    return <div className="panchangam-page-error">{error}</div>;
  }

  if (!panchangamData) {
    return <div className="panchangam-page-error">No data available</div>;
  }

  const { meta, almanac, solarLunar, auspicious, inauspicious } = panchangamData;

  const DetailRow = ({ label, value, subtext }) => (
    <div className="panchangam-row">
      <div className="panchangam-label">{label}</div>
      <div className="panchangam-value">
        {value}
        {subtext && <span className="panchangam-subtext"> (Ends: {subtext})</span>}
      </div>
    </div>
  );

  const Section = ({ title, data, type = "default" }) => (
    <div className={`panchangam-section ${type}`}>
      <h3 className="panchangam-section-title">{title}</h3>
      <div className="panchangam-grid">
        {Object.entries(data).map(([key, item]) => {
          // Handle complex objects (like Tithi with name & endTime) or simple strings
          let displayValue = item;
          let subText = null;

          if (typeof item === 'object' && item !== null) {
            displayValue = item.name || 'N/A';
            subText = item.endTime;
          }

          return (
            <DetailRow
              key={key}
              label={key}
              value={displayValue}
              subtext={subText}
            />
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="panchangam-page">
      <header className="panchangam-header-section">
        <h1 className="panchangam-main-title">Today's Panchangam</h1>
        <div className="panchangam-meta">
          <span className="panchangam-meta-item">📍 {meta.location}</span>
          <span className="panchangam-meta-item">📅 {meta.day}</span>
        </div>
      </header>

      {error && <div className="panchangam-page-error">{error}</div>}

      <div className="panchangam-content">
        <Section title="Almanac" data={almanac} />
        <Section title="Solar & Lunar" data={solarLunar} />

        <div className="panchangam-columns">
          <Section title="Auspicious Timings" data={auspicious} type="auspicious" />
          <Section title="Inauspicious Timings" data={inauspicious} type="inauspicious" />
        </div>
      </div>
    </div>
  );
};

export default PanchangamPage;
