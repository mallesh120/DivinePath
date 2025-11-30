import React, { useState } from 'react';
import './InteractiveAartiPage.css';

const InteractiveAartiPage = () => {
  const [selectedAarti, setSelectedAarti] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [userInteractions, setUserInteractions] = useState({
    bells: 0,
    diyas: 0,
    flowers: 0,
    chants: 0
  });

  const aartis = [
    {
      id: 'ganga-aarti',
      name: 'Ganga Aarti',
      location: 'Varanasi',
      time: 'Evening 7:00 PM',
      description: 'The famous Ganga aarti at Dashashwamedh Ghat',
      image: '🌊',
      duration: '45 min',
      participants: '2,453',
      deity: 'River Ganga',
      type: 'River Worship'
    },
    {
      id: 'om-jai-jagdish',
      name: 'Om Jai Jagdish Hare',
      location: 'Home/Temple',
      time: 'Anytime',
      description: 'Universal aarti sung in most Hindu homes',
      image: '🙏',
      duration: '10 min',
      participants: '5,821',
      deity: 'Lord Vishnu',
      type: 'Daily Aarti'
    },
    {
      id: 'shiva-aarti',
      name: 'Shiva Aarti',
      location: 'All Shiva Temples',
      time: 'Morning & Evening',
      description: 'Aarti dedicated to Lord Shiva',
      image: '🕉️',
      duration: '15 min',
      participants: '4,192',
      deity: 'Lord Shiva',
      type: 'Daily Aarti'
    },
    {
      id: 'lakshmi-aarti',
      name: 'Lakshmi Aarti',
      location: 'Home',
      time: 'Friday Evening',
      description: 'Friday evening aarti for Goddess Lakshmi',
      image: '💰',
      duration: '12 min',
      participants: '3,567',
      deity: 'Goddess Lakshmi',
      type: 'Weekly Aarti'
    },
    {
      id: 'ganesh-aarti',
      name: 'Ganesh Aarti',
      location: 'Any Temple',
      time: 'Start of Day',
      description: 'Begin your day with Ganesh aarti',
      image: '🐘',
      duration: '8 min',
      participants: '6,234',
      deity: 'Lord Ganesha',
      type: 'Morning Aarti'
    },
    {
      id: 'durga-aarti',
      name: 'Durga Aarti',
      location: 'Durga Temples',
      time: 'Morning & Evening',
      description: 'Powerful aarti for Goddess Durga',
      image: '🔱',
      duration: '20 min',
      participants: '2,891',
      deity: 'Goddess Durga',
      type: 'Shakti Worship'
    }
  ];

  const startAarti = (aarti) => {
    setSelectedAarti(aarti);
    setIsActive(true);
    setUserInteractions({ bells: 0, diyas: 0, flowers: 0, chants: 0 });
  };

  const handleInteraction = (type) => {
    setUserInteractions(prev => ({
      ...prev,
      [type]: prev[type] + 1
    }));
  };

  const endAarti = () => {
    setIsActive(false);
    setSelectedAarti(null);
  };

  return (
    <div className="interactive-aarti-page">
      {!isActive ? (
        <>
          <div className="aarti-header">
            <h1>🪔 Interactive Aarti Ceremonies</h1>
            <p className="aarti-subtitle">
              Participate in virtual aarti ceremonies. Ring bells, light diyas, offer flowers, and chant along.
            </p>
          </div>

          <div className="aarti-container">
            {/* How It Works */}
            <div className="how-it-works-section">
              <h3>🎯 How to Participate</h3>
              <div className="steps-grid">
                <div className="how-step">
                  <span className="how-step-icon">1️⃣</span>
                  <h4>Choose Aarti</h4>
                  <p>Select from various aarti ceremonies</p>
                </div>
                <div className="how-step">
                  <span className="how-step-icon">2️⃣</span>
                  <h4>Join Live</h4>
                  <p>Start the interactive experience</p>
                </div>
                <div className="how-step">
                  <span className="how-step-icon">3️⃣</span>
                  <h4>Interact</h4>
                  <p>Ring bells, light diyas, offer flowers</p>
                </div>
                <div className="how-step">
                  <span className="how-step-icon">4️⃣</span>
                  <h4>Chant Along</h4>
                  <p>Follow lyrics and sing with devotion</p>
                </div>
              </div>
            </div>

            {/* Aartis Grid */}
            <div className="aartis-grid">
              {aartis.map(aarti => (
                <div key={aarti.id} className="aarti-card">
                  <div className="aarti-image-section">
                    <span className="aarti-icon">{aarti.image}</span>
                    <div className="aarti-type-badge">{aarti.type}</div>
                  </div>

                  <div className="aarti-content">
                    <h3>{aarti.name}</h3>
                    <p className="aarti-deity">🙏 {aarti.deity}</p>
                    <p className="aarti-location">📍 {aarti.location}</p>
                    <p className="aarti-description">{aarti.description}</p>

                    <div className="aarti-meta">
                      <div className="meta-item">
                        <span>⏱️ {aarti.duration}</span>
                      </div>
                      <div className="meta-item">
                        <span>🕐 {aarti.time}</span>
                      </div>
                      <div className="meta-item">
                        <span>👥 {aarti.participants} joined</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    className="join-aarti-btn"
                    onClick={() => startAarti(aarti)}
                  >
                    <span>🪔 Join Interactive Aarti</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Benefits Section */}
            <div className="benefits-aarti-section">
              <h3>✨ Benefits of Interactive Aarti</h3>
              <div className="benefits-aarti-grid">
                <div className="benefit-aarti-card">
                  <span className="benefit-aarti-icon">🕉️</span>
                  <h4>Spiritual Connection</h4>
                  <p>Feel connected to the divine from anywhere</p>
                </div>
                <div className="benefit-aarti-card">
                  <span className="benefit-aarti-icon">🌍</span>
                  <h4>Global Community</h4>
                  <p>Join thousands of devotees worldwide</p>
                </div>
                <div className="benefit-aarti-card">
                  <span className="benefit-aarti-icon">📱</span>
                  <h4>Anytime Access</h4>
                  <p>Participate whenever it suits you</p>
                </div>
                <div className="benefit-aarti-card">
                  <span className="benefit-aarti-icon">🎵</span>
                  <h4>Learn Properly</h4>
                  <p>Follow lyrics and learn pronunciation</p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="aarti-experience">
          <div className="aarti-exp-header">
            <button className="exit-aarti-btn" onClick={endAarti}>
              ← End Aarti
            </button>
            <div className="aarti-exp-title">
              <h3>{selectedAarti?.name}</h3>
              <p>{selectedAarti?.deity} • {selectedAarti?.location}</p>
            </div>
            <div className="participants-count">
              👥 {selectedAarti?.participants} participating
            </div>
          </div>

          <div className="aarti-main-area">
            <div className="aarti-visual">
              <div className="aarti-scene">
                <span className="scene-deity-icon">{selectedAarti?.image}</span>
                <div className="aarti-flame">
                  <div className="flame-animation"></div>
                  <div className="flame-animation delay-1"></div>
                  <div className="flame-animation delay-2"></div>
                </div>
                <p className="aarti-scene-text">Aarti in Progress</p>
                <p className="scene-subtitle">Use the controls below to participate</p>
              </div>

              <div className="user-stats">
                <div className="stat-item">
                  <span className="stat-icon">🔔</span>
                  <span className="stat-count">{userInteractions.bells}</span>
                  <span className="stat-label">Bells</span>
                </div>
                <div className="stat-item">
                  <span className="stat-icon">🪔</span>
                  <span className="stat-count">{userInteractions.diyas}</span>
                  <span className="stat-label">Diyas</span>
                </div>
                <div className="stat-item">
                  <span className="stat-icon">🌺</span>
                  <span className="stat-count">{userInteractions.flowers}</span>
                  <span className="stat-label">Flowers</span>
                </div>
                <div className="stat-item">
                  <span className="stat-icon">🕉️</span>
                  <span className="stat-count">{userInteractions.chants}</span>
                  <span className="stat-label">Chants</span>
                </div>
              </div>
            </div>

            <div className="aarti-controls-section">
              <div className="lyrics-display">
                <h4>🎵 Follow the Lyrics</h4>
                <div className="lyrics-text">
                  <p className="current-line">Om Jai Jagdish Hare...</p>
                  <p className="next-line">Swami Jai Jagdish Hare...</p>
                </div>
              </div>

              <div className="interaction-controls">
                <h4>✋ Participate</h4>
                <div className="control-buttons-grid">
                  <button 
                    className="control-interaction-btn"
                    onClick={() => handleInteraction('bells')}
                  >
                    <span className="control-icon">🔔</span>
                    <span className="control-label">Ring Bell</span>
                  </button>
                  <button 
                    className="control-interaction-btn"
                    onClick={() => handleInteraction('diyas')}
                  >
                    <span className="control-icon">🪔</span>
                    <span className="control-label">Light Diya</span>
                  </button>
                  <button 
                    className="control-interaction-btn"
                    onClick={() => handleInteraction('flowers')}
                  >
                    <span className="control-icon">🌺</span>
                    <span className="control-label">Offer Flowers</span>
                  </button>
                  <button 
                    className="control-interaction-btn"
                    onClick={() => handleInteraction('chants')}
                  >
                    <span className="control-icon">🕉️</span>
                    <span className="control-label">Chant</span>
                  </button>
                </div>
              </div>

              <div className="audio-controls">
                <button className="audio-btn">🔊 Volume</button>
                <button className="audio-btn">📖 Show Full Lyrics</button>
                <button className="audio-btn">⏸️ Pause</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveAartiPage;
