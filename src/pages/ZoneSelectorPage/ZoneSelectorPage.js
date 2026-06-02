import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ZoneSelectorPage.css';

const ZoneSelectorPage = () => {
  const navigate = useNavigate();

  const handleSelectZone = (zone) => {
    localStorage.setItem('preferredZone', zone);
    if (zone === 'kids') {
      navigate('/kids');
    } else {
      navigate('/adults');
    }
  };

  return (
    <div className="zone-selector-container">
      <h1 className="zone-selector-title">Welcome to DivinePath</h1>
      <p className="zone-selector-subtitle">Who is exploring today?</p>
      
      <div className="zone-cards">
        <button 
          className="zone-card kids-card" 
          onClick={() => handleSelectZone('kids')}
          aria-label="Enter Kids Zone"
        >
          <div className="zone-icon">🎈</div>
          <h2>Kids Zone</h2>
          <p>Stories, Games & Fun!</p>
        </button>

        <button 
          className="zone-card adults-card" 
          onClick={() => handleSelectZone('adults')}
          aria-label="Enter Adults Zone"
        >
          <div className="zone-icon">🕉️</div>
          <h2>Adults Zone</h2>
          <p>Calendar, Reading & Astrology</p>
        </button>
      </div>
    </div>
  );
};

export default ZoneSelectorPage;
