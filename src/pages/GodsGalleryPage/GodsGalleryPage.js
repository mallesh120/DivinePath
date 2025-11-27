import React from 'react';
import { trimurtiData, godsData } from '../../data/godsData';
import { useNavigate } from 'react-router-dom';
import './GodsGalleryPage.css';

const GodsGalleryPage = () => {
  const navigate = useNavigate();

  const handleTrinityClick = (godId) => {
    navigate(`/gods/${godId}`);
  };

  const handleGodClick = (godId) => {
    navigate(`/gods/${godId}`);
  };

  const handleViewAll = () => {
    navigate('/gods/all');
  };

  // Get major deities (excluding Trinity)
  const majorDeities = godsData.filter(god => 
    god.category === 'Major Deity' || 
    (god.id >= 8 && god.id <= 12) // Hanuman, Durga, Kali, Krishna, Rama
  );

  // Get Vishnu's avatars from trimurtiData
  const vishnu = trimurtiData.find(god => god.id === 'vishnu');
  const dashavatarPreview = vishnu?.avatars?.slice(0, 6) || [];

  return (
    <div className="gallery-page">
      {/* Trinity Section */}
      <div className="gallery-section">
        <div className="gallery-header">
          <h1 className="gallery-title">The Holy Trinity</h1>
          <p className="gallery-subtitle">
            The Trimurti - The three supreme deities representing creation, preservation, and destruction
          </p>
        </div>

        <div className="trimurti-grid">
          {trimurtiData.map((god) => (
            <div 
              key={god.id} 
              className="trimurti-card"
              onClick={() => handleTrinityClick(god.id)}
            >
              <div className="trimurti-card-image-container">
                <img src={god.imageUrl} alt={god.name} className="trimurti-card-image" />
                <div className="trimurti-card-overlay">
                  <span className="view-details-text">View Details →</span>
                </div>
              </div>
              <div className="trimurti-card-content">
                <h2 className="trimurti-card-name">{god.name}</h2>
                <p className="trimurti-card-title">{god.title}</p>
                <p className="trimurti-card-role">{god.role}</p>
                <p className="trimurti-card-description">{god.description}</p>
                
                <div className="trimurti-card-stats">
                  {god.consort && (
                    <div className="stat-item">
                      <span className="stat-icon">👰</span>
                      <span className="stat-label">Consort:</span>
                      <span className="stat-value">{god.consort.name}</span>
                    </div>
                  )}
                  {god.family && god.family.length > 0 && (
                    <div className="stat-item">
                      <span className="stat-icon">👨‍👩‍👧‍👦</span>
                      <span className="stat-label">Family:</span>
                      <span className="stat-value">{god.family.length} member{god.family.length > 1 ? 's' : ''}</span>
                    </div>
                  )}
                  {god.avatars && god.avatars.length > 0 && (
                    <div className="stat-item">
                      <span className="stat-icon">🔄</span>
                      <span className="stat-label">Avatars:</span>
                      <span className="stat-value">{god.avatars.length}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Major Deities Section */}
      <div className="gallery-section">
        <div className="section-header">
          <h2 className="section-title">Major Deities</h2>
          <p className="section-subtitle">The most revered and worshipped gods in Hinduism</p>
        </div>

        <div className="gods-grid">
          {majorDeities.map((god) => (
            <div 
              key={god.id} 
              className="god-card"
              onClick={() => handleGodClick(god.id)}
            >
              <div className="god-card-image-container">
                <img src={god.imageUrl} alt={god.name} className="god-card-image" />
              </div>
              <div className="god-card-content">
                <h3 className="god-card-name">{god.name}</h3>
                <p className="god-card-description">{god.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dashavatar Preview Section */}
      {dashavatarPreview.length > 0 && (
        <div className="gallery-section dashavatar-section">
          <div className="section-header">
            <h2 className="section-title">The Dashavatar</h2>
            <p className="section-subtitle">The ten principal avatars of Lord Vishnu</p>
          </div>

          <div className="avatars-preview-grid">
            {dashavatarPreview.map((avatar, index) => (
              <div 
                key={index} 
                className="avatar-preview-card"
                onClick={() => handleTrinityClick('vishnu')}
              >
                <div className="avatar-number">{avatar.order || index + 1}</div>
                <h4 className="avatar-preview-name">{avatar.name}</h4>
                <p className="avatar-preview-description">{avatar.description}</p>
              </div>
            ))}
          </div>

          <button className="view-all-avatars-btn" onClick={() => handleTrinityClick('vishnu')}>
            View All 10 Avatars →
          </button>
        </div>
      )}

      {/* View All Gods Button */}
      <div className="view-all-section">
        <button className="view-all-gods-btn" onClick={handleViewAll}>
          <span>Explore Complete Pantheon</span>
          <span className="view-all-count">{godsData.length}+ Deities</span>
        </button>
      </div>
    </div>
  );
};

export default GodsGalleryPage;