import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ImmersiveExperiencePage.css';

const ImmersiveExperiencePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const experiences = [
    {
      id: 'ar-temples',
      category: 'ar',
      title: 'AR Temple Visits',
      description: 'Walk through 3D temples using Augmented Reality',
      icon: '🏛️',
      link: '/immersive/ar-temples',
      features: ['360° Views', 'Interactive Elements', 'Audio Guide', 'Virtual Offerings'],
      status: 'available'
    },
    {
      id: 'vr-meditation',
      category: 'vr',
      title: 'VR Meditation',
      description: 'Immerse yourself in 360° sacred places',
      icon: '🧘',
      link: '/immersive/vr-meditation',
      features: ['Kedarnath', 'Varanasi Ghats', 'Rishikesh', 'Guided Meditation'],
      status: 'available'
    },
    {
      id: 'live-darshan',
      category: 'live',
      title: 'Live Temple Darshan',
      description: 'Real-time streams from major temples across India',
      icon: '📹',
      link: '/immersive/live-darshan',
      features: ['24/7 Live Stream', 'Multiple Temples', 'HD Quality', 'Schedule Info'],
      status: 'available'
    },
    {
      id: 'interactive-aarti',
      category: 'interactive',
      title: 'Interactive Aarti',
      description: 'Participate in virtual aarti ceremonies',
      icon: '🪔',
      link: '/immersive/interactive-aarti',
      features: ['Ring Virtual Bells', 'Light Diyas', 'Offer Flowers', 'Chant Along'],
      status: 'available'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Experiences', icon: '🌟' },
    { id: 'ar', label: 'Augmented Reality', icon: '🏛️' },
    { id: 'vr', label: 'Virtual Reality', icon: '🧘' },
    { id: 'live', label: 'Live Streams', icon: '📹' },
    { id: 'interactive', label: 'Interactive', icon: '🪔' }
  ];

  const filteredExperiences = selectedCategory === 'all' 
    ? experiences 
    : experiences.filter(exp => exp.category === selectedCategory);

  return (
    <div className="immersive-experience-page">
      <div className="immersive-header">
        <div className="header-content">
          <h1>🌟 Immersive Spiritual Experiences</h1>
          <p className="header-subtitle">
            Experience sacred places and rituals like never before with AR, VR, and live streaming
          </p>
        </div>
      </div>

      <div className="immersive-container">
        {/* Category Filter */}
        <div className="category-filter">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span className="category-icon">{cat.icon}</span>
              <span className="category-label">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Experience Cards */}
        <div className="experiences-grid">
          {filteredExperiences.map(experience => (
            <Link 
              key={experience.id} 
              to={experience.link} 
              className="experience-card"
            >
              <div className="experience-icon-wrapper">
                <span className="experience-icon">{experience.icon}</span>
                {experience.status === 'available' && (
                  <span className="status-badge">Available Now</span>
                )}
              </div>
              
              <div className="experience-content">
                <h3>{experience.title}</h3>
                <p className="experience-description">{experience.description}</p>
                
                <div className="experience-features">
                  {experience.features.map((feature, index) => (
                    <span key={index} className="feature-tag">
                      ✓ {feature}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="experience-cta">
                <span className="cta-text">Explore Experience</span>
                <span className="cta-arrow">→</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Info Section */}
        <div className="info-section">
          <div className="info-card">
            <div className="info-icon">📱</div>
            <h3>Device Requirements</h3>
            <p>
              AR features work on most modern smartphones. VR experiences are optimized 
              for VR headsets but can also be viewed in 360° mode on any device.
            </p>
          </div>
          
          <div className="info-card">
            <div className="info-icon">🌐</div>
            <h3>Internet Connection</h3>
            <p>
              Stable internet connection recommended for best experience. 
              Live streams require minimum 2 Mbps for HD quality.
            </p>
          </div>
          
          <div className="info-card">
            <div className="info-icon">🎧</div>
            <h3>Audio Enhancement</h3>
            <p>
              Use headphones for immersive audio experience. Includes temple bells, 
              mantras, and ambient sounds from sacred locations.
            </p>
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className="coming-soon-section">
          <h2>🚀 Coming Soon</h2>
          <div className="coming-soon-grid">
            <div className="coming-soon-card">
              <span className="soon-icon">🏔️</span>
              <h4>Himalayan Pilgrimage</h4>
              <p>Virtual trek to Char Dham</p>
            </div>
            <div className="coming-soon-card">
              <span className="soon-icon">🎨</span>
              <h4>Temple Art Gallery</h4>
              <p>3D sculptures and paintings</p>
            </div>
            <div className="coming-soon-card">
              <span className="soon-icon">📿</span>
              <h4>Virtual Puja Room</h4>
              <p>Personalized worship space</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImmersiveExperiencePage;
