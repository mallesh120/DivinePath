import React from 'react';
import { Link } from 'react-router-dom';
import { getAllMaterialsForPuja } from '../../data/pujas/pujasData';
import './PujaCard.css';

const PujaCard = ({ puja }) => {
  const materialsCount = getAllMaterialsForPuja(puja.id).length;

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return '#4caf50';
      case 'Intermediate':
        return '#ff9800';
      case 'Advanced':
        return '#f44336';
      default:
        return '#757575';
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Daily Puja': '🪔',
      'Festival Puja': '🎉',
      'Special Occasion': '✨',
      'Vrat/Fasting': '🙏',
      'Griha Pravesh': '🏠',
      'Occasional': '📅'
    };
    return icons[category] || '🕉️';
  };

  return (
    <Link to={`/puja/${puja.id}`} className="puja-card-link">
      <div className="puja-card">
        <div className="puja-card-header">
          <div className="puja-category-badge">
            <span className="category-icon">{getCategoryIcon(puja.category)}</span>
            <span className="category-text">{puja.category}</span>
          </div>
          <div 
            className="puja-difficulty-badge" 
            style={{ backgroundColor: getDifficultyColor(puja.difficulty) }}
          >
            {puja.difficulty}
          </div>
        </div>

        <div className="puja-card-content">
          <h3 className="puja-name">{puja.name}</h3>
          <p className="puja-deity">Deity: {puja.deity}</p>
          <p className="puja-description">{puja.description}</p>

          <div className="puja-meta">
            <div className="puja-meta-item">
              <span className="meta-icon">⏱️</span>
              <span className="meta-text">{puja.duration}</span>
            </div>
            <div className="puja-meta-item">
              <span className="meta-icon">📦</span>
              <span className="meta-text">{materialsCount} items</span>
            </div>
            <div className="puja-meta-item">
              <span className="meta-icon">📖</span>
              <span className="meta-text">{puja.steps.length} steps</span>
            </div>
          </div>

          <div className="puja-occasion">
            <span className="occasion-label">Best for:</span>
            <span className="occasion-text">{puja.occasion}</span>
          </div>

          <div className="puja-card-footer">
            <span className="start-guide-btn">Start Guide →</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PujaCard;
