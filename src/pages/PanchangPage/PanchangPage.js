import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { usePanchangam } from '../../hooks/usePanchangam';
import TodayTab from './TodayTab';
import TimingsTab from './TimingsTab';
import CalendarTab from './CalendarTab';
import FestivalsTab from './FestivalsTab';
import './PanchangPage.css';

const PanchangPage = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // Tab selection priority: search query param -> location.state -> 'today'
  const initialTab = searchParams.get('tab') || location.state?.activeTab || 'today';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [timeTheme, setTimeTheme] = useState('theme-day');

  // Lift usePanchangam to PanchangPage so all tabs share state and transition instantaneously
  const {
    loading,
    error,
    panchangamData,
    location: panchangLocation,
    placeName,
    currentCity,
    setCity,
    cities
  } = usePanchangam();

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['today', 'timings', 'calendar', 'festivals'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId }, { replace: true });
  };

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 8) setTimeTheme('theme-dawn');
    else if (hour >= 8 && hour < 17) setTimeTheme('theme-day');
    else if (hour >= 17 && hour < 20) setTimeTheme('theme-dusk');
    else setTimeTheme('theme-night');
  }, []);

  const sharedProps = {
    panchangamData,
    loading,
    error,
    location: panchangLocation,
    placeName,
    currentCity,
    setCity,
    cities
  };

  return (
    <div className={`panchang-page-container ${timeTheme}`}>
      {/* Top Header Navigation for Desktop / Tablet */}
      <header className="panchang-top-header glass-panel">
        <div className="panchang-header-brand">
          <span className="panchang-header-om">🕉️</span>
          <div className="panchang-header-text">
            <h1 className="panchang-header-title">Daily Panchangam</h1>
            <span className="panchang-header-subtitle">Vedic Almanac & Hindu Calendar</span>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <div className="panchang-desktop-nav">
          <button 
            className={`panchang-nav-pill ${activeTab === 'today' ? 'active' : ''}`}
            onClick={() => handleTabChange('today')}
          >
            <span className="pill-icon">🏠</span> Today
          </button>
          <button 
            className={`panchang-nav-pill ${activeTab === 'timings' ? 'active' : ''}`}
            onClick={() => handleTabChange('timings')}
          >
            <span className="pill-icon">⏳</span> Timings
          </button>
          <button 
            className={`panchang-nav-pill ${activeTab === 'calendar' ? 'active' : ''}`}
            onClick={() => handleTabChange('calendar')}
          >
            <span className="pill-icon">📅</span> Calendar
          </button>
          <button 
            className={`panchang-nav-pill ${activeTab === 'festivals' ? 'active' : ''}`}
            onClick={() => handleTabChange('festivals')}
          >
            <span className="pill-icon">🪔</span> Festivals
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="panchang-content-area">
        {activeTab === 'today' && <TodayTab {...sharedProps} />}
        {activeTab === 'timings' && <TimingsTab {...sharedProps} />}
        {activeTab === 'calendar' && <CalendarTab {...sharedProps} />}
        {activeTab === 'festivals' && <FestivalsTab {...sharedProps} />}
      </main>
    </div>
  );
};

export default PanchangPage;
