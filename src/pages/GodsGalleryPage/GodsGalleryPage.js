import React from 'react';
import { trimurtiData } from '../../data/godsData';
import { useNavigate } from 'react-router-dom';
import './GodsGalleryPage.css';

const GodsGalleryPage = () => {
  const navigate = useNavigate();

  const handleTrinityClick = (godId) => {
    navigate(`/gods/${godId}`);
  };

  return (
    <div className="gallery-page">
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
  );
};

export default GodsGalleryPage;