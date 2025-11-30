import React, { useState } from 'react';
import './LiveDarshanPage.css';

const LiveDarshanPage = () => {
  const [selectedTemple, setSelectedTemple] = useState(null);
  const [isLive, setIsLive] = useState(false);

  const temples = [
    {
      id: 'tirupati',
      name: 'Tirupati Balaji',
      location: 'Andhra Pradesh',
      deity: 'Lord Venkateswara',
      description: '24/7 live darshan from the sacred hills',
      image: '🏛️',
      timings: ['Suprabhata Seva 3:00 AM', 'Morning Darshan 6:00 AM', 'Evening Aarti 7:00 PM'],
      status: 'live',
      viewers: '12,453'
    },
    {
      id: 'golden-temple',
      name: 'Golden Temple',
      location: 'Amritsar',
      deity: 'Harmandir Sahib',
      description: 'Live from the holiest Sikh Gurdwara',
      image: '🕌',
      timings: ['Morning Prayer 4:00 AM', 'Afternoon Session 12:00 PM', 'Evening Prayer 8:00 PM'],
      status: 'live',
      viewers: '8,234'
    },
    {
      id: 'vaishno-devi',
      name: 'Vaishno Devi',
      location: 'Jammu & Kashmir',
      deity: 'Mata Vaishno Devi',
      description: 'Live darshan from the cave shrine',
      image: '⛰️',
      timings: ['Morning Aarti 5:30 AM', 'Bhent 12:00 PM', 'Evening Aarti 7:30 PM'],
      status: 'live',
      viewers: '15,892'
    },
    {
      id: 'meenakshi',
      name: 'Meenakshi Temple',
      location: 'Madurai',
      deity: 'Goddess Meenakshi',
      description: 'Historic temple with beautiful gopurams',
      image: '🛕',
      timings: ['Morning Puja 6:00 AM', 'Noon Abhishekam 12:00 PM', 'Night Ceremony 9:00 PM'],
      status: 'scheduled',
      nextLive: 'Tomorrow 6:00 AM'
    },
    {
      id: 'siddhivinayak',
      name: 'Siddhivinayak Temple',
      location: 'Mumbai',
      deity: 'Lord Ganesha',
      description: 'Most visited Ganesha temple',
      image: '🐘',
      timings: ['Morning Aarti 5:30 AM', 'Noon Aarti 12:00 PM', 'Evening Aarti 8:00 PM'],
      status: 'live',
      viewers: '6,721'
    },
    {
      id: 'jagannath',
      name: 'Jagannath Temple',
      location: 'Puri',
      deity: 'Lord Jagannath',
      description: 'One of the Char Dham pilgrimage sites',
      image: '🎭',
      timings: ['Mangala Aarti 5:00 AM', 'Madhyanha Dhupa 12:00 PM', 'Sandhya Aarti 7:00 PM'],
      status: 'offline',
      nextLive: 'In 2 hours'
    }
  ];

  const upcomingEvents = [
    { temple: 'Tirupati Balaji', event: 'Suprabhata Seva', time: '3:00 AM Tomorrow', icon: '🌅' },
    { temple: 'Golden Temple', event: 'Asa Di Var', time: 'Today 4:30 AM', icon: '🎵' },
    { temple: 'Vaishno Devi', event: 'Morning Aarti', time: 'Today 5:30 AM', icon: '🔥' },
    { temple: 'Siddhivinayak', event: 'Abhishek', time: 'Today 12:00 PM', icon: '💧' }
  ];

  const handleWatchLive = (temple) => {
    setSelectedTemple(temple);
    setIsLive(true);
  };

  const handleClose = () => {
    setIsLive(false);
    setSelectedTemple(null);
  };

  return (
    <div className="live-darshan-page">
      {!isLive ? (
        <>
          <div className="live-header">
            <h1>📹 Live Temple Darshan</h1>
            <p className="live-subtitle">
              Experience real-time darshan from major temples across India. Connect spiritually from anywhere.
            </p>
          </div>

          <div className="live-container">
            {/* Upcoming Events */}
            <div className="upcoming-section">
              <h3>⏰ Upcoming Live Events</h3>
              <div className="upcoming-events">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="event-card">
                    <span className="event-icon">{event.icon}</span>
                    <div className="event-info">
                      <h4>{event.event}</h4>
                      <p className="event-temple">{event.temple}</p>
                      <p className="event-time">{event.time}</p>
                    </div>
                    <button className="set-reminder-btn">🔔 Remind Me</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Temples Grid */}
            <div className="temples-section">
              <div className="section-header">
                <h3>🕉️ Available Temples</h3>
                <div className="filter-buttons">
                  <button className="filter-btn active">All</button>
                  <button className="filter-btn">🔴 Live Now</button>
                  <button className="filter-btn">📅 Scheduled</button>
                </div>
              </div>

              <div className="temples-live-grid">
                {temples.map(temple => (
                  <div key={temple.id} className={`temple-live-card ${temple.status}`}>
                    <div className="temple-header-section">
                      <div className="temple-icon-large">{temple.image}</div>
                      {temple.status === 'live' && (
                        <div className="live-indicator">
                          <span className="live-dot"></span>
                          <span>LIVE</span>
                          <span className="viewer-count">👁️ {temple.viewers}</span>
                        </div>
                      )}
                      {temple.status === 'scheduled' && (
                        <div className="scheduled-badge">
                          📅 {temple.nextLive}
                        </div>
                      )}
                      {temple.status === 'offline' && (
                        <div className="offline-badge">
                          ⏸️ {temple.nextLive}
                        </div>
                      )}
                    </div>

                    <div className="temple-live-info">
                      <h3>{temple.name}</h3>
                      <p className="temple-deity">{temple.deity}</p>
                      <p className="temple-live-location">📍 {temple.location}</p>
                      <p className="temple-live-description">{temple.description}</p>

                      <div className="temple-timings">
                        <h4>⏰ Today's Schedule</h4>
                        <ul>
                          {temple.timings.map((timing, index) => (
                            <li key={index}>{timing}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <button 
                      className={`watch-live-btn ${temple.status}`}
                      onClick={() => handleWatchLive(temple)}
                      disabled={temple.status === 'offline'}
                    >
                      {temple.status === 'live' ? '▶️ Watch Live Darshan' :
                       temple.status === 'scheduled' ? '🔔 Set Reminder' :
                       '⏸️ Currently Offline'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Info Section */}
            <div className="darshan-info">
              <h3>💡 About Live Darshan</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-item-icon">📱</span>
                  <h4>HD Quality</h4>
                  <p>Crystal clear video streaming in 1080p</p>
                </div>
                <div className="info-item">
                  <span className="info-item-icon">🔊</span>
                  <h4>Live Audio</h4>
                  <p>Experience authentic temple atmosphere</p>
                </div>
                <div className="info-item">
                  <span className="info-item-icon">🕉️</span>
                  <h4>Special Events</h4>
                  <p>Join major festivals and ceremonies</p>
                </div>
                <div className="info-item">
                  <span className="info-item-icon">🔔</span>
                  <h4>Reminders</h4>
                  <p>Never miss your favorite aarti time</p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="live-player">
          <div className="player-header">
            <button className="close-player-btn" onClick={handleClose}>
              ← Back to Temples
            </button>
            <div className="player-title">
              <h3>{selectedTemple?.name}</h3>
              <p>{selectedTemple?.deity} • {selectedTemple?.location}</p>
            </div>
            <div className="player-actions">
              <button className="player-action-btn">🔊 Audio</button>
              <button className="player-action-btn">⚙️ Quality</button>
              <button className="player-action-btn">⛶ Fullscreen</button>
            </div>
          </div>

          <div className="video-container">
            <div className="video-placeholder">
              <div className="placeholder-content">
                <span className="placeholder-icon">{selectedTemple?.image}</span>
                <div className="live-badge-large">
                  <span className="pulse-dot"></span>
                  LIVE
                </div>
                <p className="placeholder-text">Live Stream View</p>
                <p className="placeholder-subtext">
                  In production, this will show the live video feed from {selectedTemple?.name}
                </p>
                <p className="viewer-info">👁️ {selectedTemple?.viewers} viewers watching now</p>
              </div>
            </div>
          </div>

          <div className="player-info-bar">
            <div className="temple-details">
              <h4>Currently Showing</h4>
              <p>Live Darshan from Sanctum Sanctorum</p>
            </div>
            <div className="interaction-buttons">
              <button className="interact-btn">🙏 Virtual Pranam</button>
              <button className="interact-btn">🌺 Send Offerings</button>
              <button className="interact-btn">💬 Chat</button>
              <button className="interact-btn">📸 Capture</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveDarshanPage;
