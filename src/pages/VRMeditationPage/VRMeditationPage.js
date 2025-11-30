import React, { useState } from 'react';
import './VRMeditationPage.css';

const VRMeditationPage = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [vrActive, setVrActive] = useState(false);
  const [meditationStarted, setMeditationStarted] = useState(false);

  const locations = [
    {
      id: 'kedarnath',
      name: 'Kedarnath',
      region: 'Uttarakhand',
      description: 'Meditate amidst the Himalayan peaks at this sacred Shiva temple',
      image: '🏔️',
      ambience: ['Mountain Breeze', 'Temple Bells', 'Flowing River', 'Birds Chirping'],
      duration: ['10 min', '20 min', '30 min'],
      difficulty: 'Beginner Friendly'
    },
    {
      id: 'varanasi',
      name: 'Varanasi Ghats',
      region: 'Uttar Pradesh',
      description: 'Experience the spiritual energy of the holy Ganges',
      image: '🌊',
      ambience: ['River Sounds', 'Conch Shells', 'Evening Aarti', 'Sanskrit Chants'],
      duration: ['15 min', '30 min', '45 min'],
      difficulty: 'All Levels'
    },
    {
      id: 'rishikesh',
      name: 'Rishikesh',
      region: 'Uttarakhand',
      description: 'Yoga capital with serene Ganga flowing through mountains',
      image: '🧘',
      ambience: ['River Rapids', 'Forest Sounds', 'Tibetan Bowls', 'Om Chanting'],
      duration: ['15 min', '25 min', '40 min'],
      difficulty: 'Intermediate'
    },
    {
      id: 'tiruvannamalai',
      name: 'Tiruvannamalai',
      region: 'Tamil Nadu',
      description: 'Sacred hill of Arunachala, ideal for deep meditation',
      image: '⛰️',
      ambience: ['Wind Chimes', 'Temple Drums', 'Birds', 'Silence'],
      duration: ['20 min', '35 min', '50 min'],
      difficulty: 'Advanced'
    },
    {
      id: 'bodh-gaya',
      name: 'Bodh Gaya',
      region: 'Bihar',
      description: 'Where Buddha attained enlightenment under the Bodhi tree',
      image: '🌳',
      ambience: ['Buddhist Chants', 'Prayer Flags', 'Meditation Bells', 'Peaceful Silence'],
      duration: ['10 min', '25 min', '45 min'],
      difficulty: 'Beginner Friendly'
    },
    {
      id: 'hampi',
      name: 'Hampi',
      region: 'Karnataka',
      description: 'Ancient ruins surrounded by mystical boulder landscapes',
      image: '🗿',
      ambience: ['Wind Through Ruins', 'Distant Chants', 'Nature Sounds', 'Echo Effects'],
      duration: ['15 min', '30 min', '60 min'],
      difficulty: 'All Levels'
    }
  ];

  const handleStartVR = (location) => {
    setSelectedLocation(location);
    setVrActive(true);
  };

  const handleStopVR = () => {
    setVrActive(false);
    setMeditationStarted(false);
    setSelectedLocation(null);
  };

  const startMeditation = () => {
    setMeditationStarted(true);
  };

  return (
    <div className="vr-meditation-page">
      {!vrActive ? (
        <>
          <div className="vr-header">
            <h1>🧘 VR Meditation Experiences</h1>
            <p className="vr-subtitle">
              Immerse yourself in 360° sacred places. Find peace and tranquility in India's holiest locations.
            </p>
          </div>

          <div className="vr-container">
            <div className="benefits-section">
              <h3>✨ Benefits of VR Meditation</h3>
              <div className="benefits-grid">
                <div className="benefit-card">
                  <span className="benefit-icon">🧠</span>
                  <h4>Reduce Stress</h4>
                  <p>Scientifically proven to lower cortisol levels</p>
                </div>
                <div className="benefit-card">
                  <span className="benefit-icon">💆</span>
                  <h4>Deep Relaxation</h4>
                  <p>Achieve deeper states of meditation faster</p>
                </div>
                <div className="benefit-card">
                  <span className="benefit-icon">🎯</span>
                  <h4>Better Focus</h4>
                  <p>Improve concentration and mindfulness</p>
                </div>
                <div className="benefit-card">
                  <span className="benefit-icon">😌</span>
                  <h4>Inner Peace</h4>
                  <p>Connect with your spiritual self</p>
                </div>
              </div>
            </div>

            <div className="locations-grid">
              {locations.map(location => (
                <div key={location.id} className="location-card">
                  <div className="location-image">
                    <span className="location-icon">{location.image}</span>
                    <span className="difficulty-badge">{location.difficulty}</span>
                  </div>
                  
                  <div className="location-info">
                    <h3>{location.name}</h3>
                    <p className="location-region">📍 {location.region}</p>
                    <p className="location-description">{location.description}</p>
                    
                    <div className="ambience-tags">
                      <h4>🎵 Ambience</h4>
                      <div className="tags-list">
                        {location.ambience.map((sound, index) => (
                          <span key={index} className="ambience-tag">
                            {sound}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="duration-options">
                      <h4>⏱️ Duration</h4>
                      <div className="duration-buttons">
                        {location.duration.map((time, index) => (
                          <button key={index} className="duration-btn">
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    className="start-vr-btn"
                    onClick={() => handleStartVR(location)}
                  >
                    <span>🥽 Enter VR Meditation</span>
                  </button>
                </div>
              ))}
            </div>

            <div className="meditation-guide">
              <h3>🙏 Meditation Guide</h3>
              <div className="guide-content">
                <div className="guide-step">
                  <span className="guide-number">1</span>
                  <div>
                    <h4>Find a Quiet Space</h4>
                    <p>Sit comfortably in a quiet room where you won't be disturbed</p>
                  </div>
                </div>
                <div className="guide-step">
                  <span className="guide-number">2</span>
                  <div>
                    <h4>Wear Headphones</h4>
                    <p>Use quality headphones for immersive 3D audio experience</p>
                  </div>
                </div>
                <div className="guide-step">
                  <span className="guide-number">3</span>
                  <div>
                    <h4>Choose Your Duration</h4>
                    <p>Start with shorter sessions if you're a beginner</p>
                  </div>
                </div>
                <div className="guide-step">
                  <span className="guide-number">4</span>
                  <div>
                    <h4>Focus on Breath</h4>
                    <p>Follow the guided breathing or focus on natural breath</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="vr-viewer">
          <div className="vr-controls">
            <button className="vr-control-btn back-btn" onClick={handleStopVR}>
              ← Exit
            </button>
            <div className="location-title">
              <h3>{selectedLocation?.name}</h3>
              <p>{selectedLocation?.region}</p>
            </div>
            <div className="vr-control-buttons">
              <button className="vr-control-btn">🔊 Audio</button>
              <button className="vr-control-btn">⚙️ Settings</button>
            </div>
          </div>
          
          <div className="vr-viewport">
            {!meditationStarted ? (
              <div className="meditation-setup">
                <div className="setup-card">
                  <span className="setup-icon">{selectedLocation?.image}</span>
                  <h2>Prepare for Meditation</h2>
                  <p>You're about to enter a 360° immersive meditation experience at {selectedLocation?.name}</p>
                  
                  <div className="setup-options">
                    <div className="option-group">
                      <label>Duration</label>
                      <select className="setup-select">
                        {selectedLocation?.duration.map((time, index) => (
                          <option key={index}>{time}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="option-group">
                      <label>Guidance</label>
                      <select className="setup-select">
                        <option>Voice Guided</option>
                        <option>Music Only</option>
                        <option>Natural Sounds</option>
                        <option>Silent</option>
                      </select>
                    </div>
                  </div>
                  
                  <button className="begin-meditation-btn" onClick={startMeditation}>
                    Begin Meditation
                  </button>
                </div>
              </div>
            ) : (
              <div className="meditation-active">
                <div className="vr-environment">
                  <div className="environment-placeholder">
                    <span className="env-icon">{selectedLocation?.image}</span>
                    <p className="env-text">360° VR View</p>
                    <p className="env-subtext">
                      In production, this will show an immersive 360° video or photosphere of {selectedLocation?.name}
                    </p>
                  </div>
                </div>
                
                <div className="meditation-overlay">
                  <div className="breath-circle">
                    <div className="breath-animation"></div>
                    <p className="breath-text">Breathe In... Hold... Breathe Out...</p>
                  </div>
                  
                  <div className="meditation-timer">
                    <span className="timer-display">12:45</span>
                    <div className="timer-progress">
                      <div className="progress-bar" style={{width: '65%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VRMeditationPage;
