import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { usePanchangam } from '../../hooks/usePanchangam';
import { getAllFestivalsWithCalculated } from '../../data/festivals/festivalsData';
import './PanchangPage.css';

const TodayTab = (props) => {
  // Support either props passed from PanchangPage or fallback to usePanchangam directly
  const hookData = usePanchangam();
  const panchangamData = props.panchangamData || hookData.panchangamData;
  const loading = props.loading !== undefined ? props.loading : hookData.loading;
  const error = props.error !== undefined ? props.error : hookData.error;
  const currentCity = props.currentCity || hookData.currentCity;
  const setCity = props.setCity || hookData.setCity;
  const cities = props.cities || hookData.cities;
  const placeName = props.placeName || hookData.placeName;
  const location = props.location || hookData.location;

  // Real-time clock ticker for active status evaluation
  const [nowEpoch, setNowEpoch] = useState(Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNowEpoch(Date.now()), 30000);
    return () => clearInterval(timer);
  }, []);

  // Today's festivals
  const todayFestivals = useMemo(() => {
    try {
      const today = new Date();
      const year = today.getFullYear();
      const monthStr = String(today.getMonth() + 1).padStart(2, '0');
      const dayStr = String(today.getDate()).padStart(2, '0');
      const dateStr = `${year}-${monthStr}-${dayStr}`;

      const all = getAllFestivalsWithCalculated(year, year, location);
      return all.filter(f => f.date === dateStr || (f.date <= dateStr && f.endDate >= dateStr));
    } catch (e) {
      return [];
    }
  }, [location]);

  if (loading) {
    return (
      <div className="panchang-loading-container">
        <div className="panchang-spinner"></div>
        <p className="panchang-loading-text">Loading cosmic planetary alignments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="panchang-error-container glass-panel">
        <span className="error-icon">⚠️</span>
        <h3>Unable to load Panchangam</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!panchangamData) return null;

  const { almanac, solarLunar, auspicious, inauspicious, rawTimings, meta } = panchangamData;

  // Dynamic real-time calculation of Muhurta status
  const raw = rawTimings || {};
  const isRahuKalam = Boolean(raw.rahuStart && raw.rahuEnd && nowEpoch >= raw.rahuStart && nowEpoch <= raw.rahuEnd);
  const isYamagandam = Boolean(raw.yamagandaStart && raw.yamagandaEnd && nowEpoch >= raw.yamagandaStart && nowEpoch <= raw.yamagandaEnd);
  const isAbhijit = Boolean(raw.abhijitStart && raw.abhijitEnd && nowEpoch >= raw.abhijitStart && nowEpoch <= raw.abhijitEnd);
  const isBrahma = Boolean(raw.brahmaStart && raw.brahmaEnd && nowEpoch >= raw.brahmaStart && nowEpoch <= raw.brahmaEnd);
  const isAmrit = Boolean(raw.amritStart && raw.amritEnd && nowEpoch >= raw.amritStart && nowEpoch <= raw.amritEnd);

  let trafficStatus;
  if (isRahuKalam) {
    trafficStatus = {
      color: 'red',
      text: 'Rahu Kalam Active',
      icon: '🔴',
      message: 'Inauspicious window — avoid starting critical projects, contracts, or long journeys.'
    };
  } else if (isYamagandam) {
    trafficStatus = {
      color: 'red',
      text: 'Yamagandam Active',
      icon: '🔴',
      message: 'Inauspicious window — strictly avoid financial investments and major contracts.'
    };
  } else if (isAbhijit) {
    trafficStatus = {
      color: 'green',
      text: 'Abhijit Muhurta Active',
      icon: '🟢',
      message: 'Highly auspicious victory window is active right now! Excellent for beginnings & transactions.'
    };
  } else if (isBrahma) {
    trafficStatus = {
      color: 'green',
      text: 'Brahma Muhurta Active',
      icon: '✨',
      message: 'Divine spiritual hour — exceptionally auspicious for meditation, japa, and sadhana.'
    };
  } else if (isAmrit) {
    trafficStatus = {
      color: 'green',
      text: 'Amrit Kalam Active',
      icon: '✨',
      message: 'Auspicious nectar window — favorable for celebrations, shopping, and auspicious rites.'
    };
  } else {
    let nextMsg = 'Good for routine daily tasks, divine study, and prayer.';
    if (raw.abhijitStart && nowEpoch < raw.abhijitStart) {
      nextMsg = `Favorable period. Next: Abhijit Muhurta begins at ${auspicious['Abhijit Muhurta']?.split(' - ')[0] || 'midday'}.`;
    } else if (raw.rahuStart && nowEpoch < raw.rahuStart) {
      nextMsg = `Favorable period. Upcoming: Rahu Kalam at ${inauspicious['Rahu Kalam']?.split(' - ')[0] || 'afternoon'}.`;
    }
    trafficStatus = {
      color: 'yellow',
      text: 'Shubha Vela (Favorable Time)',
      icon: '✨',
      message: nextMsg
    };
  }

  // Calculate sun arc progress percentage
  let sunProgress = 50;
  if (raw.sunriseEpoch && raw.sunsetEpoch) {
    if (nowEpoch <= raw.sunriseEpoch) {
      sunProgress = 0;
    } else if (nowEpoch >= raw.sunsetEpoch) {
      sunProgress = 100;
    } else {
      sunProgress = Math.min(100, Math.max(0, ((nowEpoch - raw.sunriseEpoch) / (raw.sunsetEpoch - raw.sunriseEpoch)) * 100));
    }
  }

  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="today-tab-container">
      {/* Top Location & Date Bar */}
      <div className="today-header-context glass-panel">
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
        <div className="date-display-badge">
          <span className="calendar-icon">📅</span>
          <span className="date-text">{formattedDate}</span>
        </div>
      </div>

      {/* Featured Today's Festival Banner if any */}
      {todayFestivals.length > 0 && (
        <div className="today-festival-banner glass-panel">
          <div className="festival-banner-icon">🪔</div>
          <div className="festival-banner-content">
            <span className="festival-banner-label">Today's Sacred Observance</span>
            <h2 className="festival-banner-title">{todayFestivals[0].name}</h2>
            <p className="festival-banner-desc">{todayFestivals[0].description}</p>
          </div>
          {todayFestivals[0].pujaId && (
            <Link to={`/puja/${todayFestivals[0].pujaId}`} className="festival-banner-action-btn">
              Puja Vidhi →
            </Link>
          )}
        </div>
      )}

      {/* Hero Card with Complete Hindu Date */}
      <div className="hero-card glass-panel">
        <div className="hero-header-meta">
          <span className="hero-day-pill">{meta.day}</span>
          {typeof solarLunar.Samvat === 'string' && solarLunar.Samvat && (
            <span className="hero-samvat-pill">{solarLunar.Samvat}</span>
          )}
        </div>

        <h1 className="hindu-date-title">{almanac.Tithi.name}</h1>
        <p className="hindu-date-subtitle">
          {solarLunar.Paksha} • {solarLunar.Hindu_Month}
          {almanac.Tithi.endTime && (
            <span className="tithi-transition-info">
              {' '}(Ends at {almanac.Tithi.endTime}{almanac.Tithi.nextTithi ? `, followed by ${almanac.Tithi.nextTithi}` : ''})
            </span>
          )}
        </p>

        {/* Hero Stats */}
        <div className="hero-stats">
          <div className="stat-pill" title={`Nakshatra: ${almanac.Nakshatra.name}${almanac.Nakshatra.endTime ? ` (Ends at ${almanac.Nakshatra.endTime})` : ''}`}>
            <span className="stat-icon">🌟</span>
            <span className="stat-value">{almanac.Nakshatra.name}</span>
          </div>
          <div className="stat-pill" title={`Moon Sign: ${solarLunar.MoonRashi || solarLunar.Rashi}`}>
            <span className="stat-icon">🌙</span>
            <span className="stat-value">{solarLunar.MoonRashi || solarLunar.Rashi}</span>
          </div>
          {solarLunar.SunRashi && (
            <div className="stat-pill" title={`Sun Sign: ${solarLunar.SunRashi}`}>
              <span className="stat-icon">☀️</span>
              <span className="stat-value">{solarLunar.SunRashi}</span>
            </div>
          )}
          {almanac.Yoga && (
            <div className="stat-pill" title={`Yoga: ${almanac.Yoga.name}`}>
              <span className="stat-icon">🧘</span>
              <span className="stat-value">{almanac.Yoga.name}</span>
            </div>
          )}
          {almanac.Karana && (
            <div className="stat-pill" title={`Karana: ${almanac.Karana.name}`}>
              <span className="stat-icon">🪷</span>
              <span className="stat-value">{almanac.Karana.name}</span>
            </div>
          )}
        </div>
      </div>

      {/* Traffic Light Status Bar */}
      <div className={`status-bar status-${trafficStatus.color}`}>
        <div className="status-header">
          <span className="status-icon">{trafficStatus.icon}</span>
          <span className="status-title">{trafficStatus.text}</span>
          {(isRahuKalam || isYamagandam || isAbhijit || isBrahma || isAmrit) && (
            <span className="active-pulse-dot" title="Live active window"></span>
          )}
        </div>
        <p className="status-message">{trafficStatus.message}</p>
      </div>

      {/* Daily Sun Arc & Lunar Cycle */}
      <div className="quick-timeline glass-panel">
        <div className="timeline-header">
          <h3>☀️ Daily Sun & Moon Arc</h3>
          <span className="timeline-subtext">Local Solar Hours</span>
        </div>
        <div className="timeline-bar-container">
          <div className="timeline-node start">
            <span className="node-icon">🌅</span>
            <span className="node-time">{solarLunar.Sunrise || almanac.Sunrise}</span>
            <span className="node-label">Sunrise</span>
          </div>
          
          <div className="timeline-line-wrapper">
            <div className="timeline-line"></div>
            <div 
              className="sun-marker" 
              style={{ left: `${sunProgress}%` }}
              title={`Sun progress: ${Math.round(sunProgress)}% of daylight`}
            >
              ☀️
            </div>
          </div>

          <div className="timeline-node end">
            <span className="node-icon">🌇</span>
            <span className="node-time">{solarLunar.Sunset || almanac.Sunset}</span>
            <span className="node-label">Sunset</span>
          </div>
        </div>

        {(solarLunar.Moonrise || solarLunar.Moonset) && (
          <div className="moon-timings-strip">
            <span>🌙 Moonrise: <strong>{solarLunar.Moonrise || 'N/A'}</strong></span>
            <span>🌘 Moonset: <strong>{solarLunar.Moonset || 'N/A'}</strong></span>
          </div>
        )}
      </div>

      {/* Critical Timings Today */}
      <div className="quick-timings glass-panel">
        <div className="timings-header-row">
          <h3>Critical Timings Today</h3>
          <span className="timings-location-tag">📍 {meta.location}</span>
        </div>
        
        <div className="timing-cards-grid">
          {/* Rahu Kalam */}
          <div className={`quick-timing-card bad ${isRahuKalam ? 'active-now' : ''}`}>
            <div className="quick-timing-top">
              <span className="timing-badge bad-badge">Rahu Kalam</span>
              {isRahuKalam && <span className="active-tag">ACTIVE NOW</span>}
            </div>
            <div className="quick-timing-time">{inauspicious['Rahu Kalam']}</div>
            <p className="quick-timing-note">Avoid starting new initiatives</p>
          </div>

          {/* Abhijit Muhurta */}
          <div className={`quick-timing-card good ${isAbhijit ? 'active-now' : ''}`}>
            <div className="quick-timing-top">
              <span className="timing-badge good-badge">Abhijit Muhurta</span>
              {isAbhijit && <span className="active-tag">ACTIVE NOW</span>}
            </div>
            <div className="quick-timing-time">{auspicious['Abhijit Muhurta'] || auspicious['Abhijit Muhurat'] || 'N/A'}</div>
            <p className="quick-timing-note">Auspicious victory window for success</p>
          </div>

          {/* Brahma Muhurta */}
          <div className={`quick-timing-card divine ${isBrahma ? 'active-now' : ''}`}>
            <div className="quick-timing-top">
              <span className="timing-badge divine-badge">Brahma Muhurta</span>
              {isBrahma && <span className="active-tag">ACTIVE NOW</span>}
            </div>
            <div className="quick-timing-time">{auspicious['Brahma Muhurta'] || 'N/A'}</div>
            <p className="quick-timing-note">Spiritual hour for prayer & meditation</p>
          </div>

          {/* Yamagandam */}
          <div className={`quick-timing-card bad ${isYamagandam ? 'active-now' : ''}`}>
            <div className="quick-timing-top">
              <span className="timing-badge bad-badge">Yamagandam</span>
              {isYamagandam && <span className="active-tag">ACTIVE NOW</span>}
            </div>
            <div className="quick-timing-time">{inauspicious['Yamagandam'] || inauspicious['Yamaganda'] || 'N/A'}</div>
            <p className="quick-timing-note">Avoid financial commitments & deals</p>
          </div>

          {/* Gulikai Kalam */}
          <div className="quick-timing-card neutral">
            <div className="quick-timing-top">
              <span className="timing-badge neutral-badge">Gulikai Kalam</span>
            </div>
            <div className="quick-timing-time">{inauspicious['Gulikai Kalam'] || 'N/A'}</div>
            <p className="quick-timing-note">Good for repeat actions and routine work</p>
          </div>

          {/* Amrit Kalam if available */}
          {auspicious['Amrit Kalam'] && auspicious['Amrit Kalam'] !== 'N/A' && (
            <div className={`quick-timing-card good ${isAmrit ? 'active-now' : ''}`}>
              <div className="quick-timing-top">
                <span className="timing-badge good-badge">Amrit Kalam</span>
                {isAmrit && <span className="active-tag">ACTIVE NOW</span>}
              </div>
              <div className="quick-timing-time">{auspicious['Amrit Kalam']}</div>
              <p className="quick-timing-note">Nectar time for auspicious celebrations</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodayTab;
