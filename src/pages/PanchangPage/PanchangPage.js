import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TodayTab from './TodayTab';
import TimingsTab from './TimingsTab';
import CalendarTab from './CalendarTab';
import FestivalsTab from './FestivalsTab';
import './PanchangPage.css';

const PanchangPage = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'today');
  const [timeTheme, setTimeTheme] = useState('theme-day');

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 8) setTimeTheme('theme-dawn');
    else if (hour >= 8 && hour < 17) setTimeTheme('theme-day');
    else if (hour >= 17 && hour < 20) setTimeTheme('theme-dusk');
    else setTimeTheme('theme-night');
  }, []);

  return (
    <div className={`panchang-page-container ${timeTheme}`}>
      {/* Dynamic Background based on time of day could go here */}
      
      <div className="panchang-content-area">
        {activeTab === 'today' && <TodayTab />}
        {activeTab === 'timings' && <TimingsTab />}
        {activeTab === 'calendar' && <CalendarTab />}
        {activeTab === 'festivals' && <FestivalsTab />}
      </div>

      {/* Modern Bottom Navigation Bar */}
      <nav className="panchang-bottom-nav">
        <button 
          className={`nav-item ${activeTab === 'today' ? 'active' : ''}`}
          onClick={() => setActiveTab('today')}
        >
          <span className="nav-icon">🏠</span>
          <span className="nav-label">Today</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'timings' ? 'active' : ''}`}
          onClick={() => setActiveTab('timings')}
        >
          <span className="nav-icon">⏳</span>
          <span className="nav-label">Timings</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'calendar' ? 'active' : ''}`}
          onClick={() => setActiveTab('calendar')}
        >
          <span className="nav-icon">📅</span>
          <span className="nav-label">Calendar</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'festivals' ? 'active' : ''}`}
          onClick={() => setActiveTab('festivals')}
        >
          <span className="nav-icon">🪔</span>
          <span className="nav-label">Festivals</span>
        </button>
      </nav>
    </div>
  );
};

export default PanchangPage;
