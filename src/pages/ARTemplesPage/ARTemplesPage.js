import React, { useState } from 'react';
import './ARTemplesPage.css';

const ARTemplesPage = () => {
  const [selectedTemple, setSelectedTemple] = useState(null);
  const [arActive, setArActive] = useState(false);

  const temples = [
    {
      id: 'tirupati',
      name: 'Tirupati Balaji',
      location: 'Andhra Pradesh',
      description: 'Experience the magnificent Venkateswara Temple in 3D AR',
      image: '🏛️',
      features: ['360° View', 'Sanctum Sanctorum', 'Temple Architecture', 'Virtual Pradakshina'],
      arAvailable: true
    },
    {
      id: 'golden-temple',
      name: 'Golden Temple',
      location: 'Amritsar, Punjab',
      description: 'Walk through the sacred Harmandir Sahib in augmented reality',
      image: '🕌',
      features: ['Sarovar View', 'Golden Dome', 'Prayer Hall', 'Community Kitchen'],
      arAvailable: true
    },
    {
      id: 'meenakshi',
      name: 'Meenakshi Temple',
      location: 'Madurai, Tamil Nadu',
      description: 'Explore the colorful gopurams and intricate sculptures',
      image: '🛕',
      features: ['Gopuram Details', 'Thousand Pillar Hall', 'Sculptures', 'Temple Complex'],
      arAvailable: true
    },
    {
      id: 'konark',
      name: 'Konark Sun Temple',
      location: 'Odisha',
      description: 'Witness the architectural marvel of the Sun God temple',
      image: '☀️',
      features: ['Chariot Wheels', 'Stone Carvings', 'Main Structure', 'Sunrise View'],
      arAvailable: true
    },
    {
      id: 'somnath',
      name: 'Somnath Temple',
      location: 'Gujarat',
      description: 'Visit one of the 12 Jyotirlinga shrines',
      image: '🌊',
      features: ['Ocean View', 'Shiva Linga', 'Temple History', 'Evening Aarti'],
      arAvailable: true
    },
    {
      id: 'jagannath',
      name: 'Jagannath Temple',
      location: 'Puri, Odisha',
      description: 'Experience the sacred abode of Lord Jagannath',
      image: '🎭',
      features: ['Trinity Deities', 'Chariot Festival', 'Temple Complex', 'Mahaprasad'],
      arAvailable: true
    }
  ];

  const handleStartAR = (temple) => {
    setSelectedTemple(temple);
    setArActive(true);
  };

  const handleStopAR = () => {
    setArActive(false);
    setSelectedTemple(null);
  };

  return (
    <div className="ar-temples-page">
      {!arActive ? (
        <>
          <div className="ar-header">
            <h1>🏛️ AR Temple Visits</h1>
            <p className="ar-subtitle">
              Walk through sacred temples in augmented reality. Point your camera to see temples come to life.
            </p>
          </div>

          <div className="ar-container">
            <div className="instructions-card">
              <h3>📱 How to Use AR</h3>
              <div className="instruction-steps">
                <div className="step">
                  <span className="step-number">1</span>
                  <div className="step-content">
                    <h4>Select a Temple</h4>
                    <p>Choose from our collection of famous Indian temples</p>
                  </div>
                </div>
                <div className="step">
                  <span className="step-number">2</span>
                  <div className="step-content">
                    <h4>Enable Camera</h4>
                    <p>Allow camera access when prompted</p>
                  </div>
                </div>
                <div className="step">
                  <span className="step-number">3</span>
                  <div className="step-content">
                    <h4>Point & Explore</h4>
                    <p>Point your device and walk around the virtual temple</p>
                  </div>
                </div>
                <div className="step">
                  <span className="step-number">4</span>
                  <div className="step-content">
                    <h4>Interact</h4>
                    <p>Tap on elements to learn more and make virtual offerings</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="temples-grid">
              {temples.map(temple => (
                <div key={temple.id} className="temple-card">
                  <div className="temple-image">
                    <span className="temple-icon">{temple.image}</span>
                    {temple.arAvailable && (
                      <span className="ar-badge">AR Ready</span>
                    )}
                  </div>
                  
                  <div className="temple-info">
                    <h3>{temple.name}</h3>
                    <p className="temple-location">📍 {temple.location}</p>
                    <p className="temple-description">{temple.description}</p>
                    
                    <div className="temple-features">
                      {temple.features.map((feature, index) => (
                        <span key={index} className="feature-badge">
                          ✓ {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <button 
                    className="start-ar-btn"
                    onClick={() => handleStartAR(temple)}
                  >
                    <span>🎯 Start AR Experience</span>
                  </button>
                </div>
              ))}
            </div>

            <div className="ar-tips">
              <h3>💡 Tips for Best Experience</h3>
              <div className="tips-grid">
                <div className="tip-card">
                  <span className="tip-icon">💡</span>
                  <p>Ensure good lighting in your environment</p>
                </div>
                <div className="tip-card">
                  <span className="tip-icon">📏</span>
                  <p>Keep at least 2-3 meters distance for full view</p>
                </div>
                <div className="tip-card">
                  <span className="tip-icon">🔊</span>
                  <p>Enable audio for temple bells and mantras</p>
                </div>
                <div className="tip-card">
                  <span className="tip-icon">🔄</span>
                  <p>Rotate slowly for smooth experience</p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="ar-viewer">
          <div className="ar-controls">
            <button className="control-btn back-btn" onClick={handleStopAR}>
              ← Back
            </button>
            <div className="temple-title">
              <h3>{selectedTemple?.name}</h3>
              <p>{selectedTemple?.location}</p>
            </div>
            <div className="control-buttons">
              <button className="control-btn">📸 Capture</button>
              <button className="control-btn">🔊 Audio</button>
              <button className="control-btn">ℹ️ Info</button>
            </div>
          </div>
          
          <div className="ar-viewport">
            <div className="ar-placeholder">
              <div className="ar-loading">
                <div className="loading-spinner"></div>
                <p>Initializing AR Camera...</p>
                <small>Please allow camera access</small>
              </div>
              
              <div className="ar-demo-content">
                <div className="demo-temple">
                  <span className="demo-temple-icon">{selectedTemple?.image}</span>
                  <p className="demo-text">AR View Placeholder</p>
                  <p className="demo-subtext">
                    In production, this will show the live camera feed with the 3D temple model overlaid
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="ar-interactions">
            <button className="interaction-btn">
              <span>🙏</span>
              <small>Namaste</small>
            </button>
            <button className="interaction-btn">
              <span>🌺</span>
              <small>Offer Flowers</small>
            </button>
            <button className="interaction-btn">
              <span>🪔</span>
              <small>Light Diya</small>
            </button>
            <button className="interaction-btn">
              <span>🔔</span>
              <small>Ring Bell</small>
            </button>
            <button className="interaction-btn">
              <span>📿</span>
              <small>Pray</small>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ARTemplesPage;
