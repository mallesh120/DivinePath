import React from 'react';
import { Link } from 'react-router-dom';
import { formatDateRange, getDaysUntilFestival, getFestivalStatus } from '../../data/festivals/festivalsData';
import './FestivalCard.css';

const FestivalCard = ({ festival, compact = false }) => {
  // Safety check
  if (!festival || !festival.date) {
    return null;
  }

  const daysUntil = getDaysUntilFestival(festival.date);
  const status = getFestivalStatus(festival.date, festival.endDate);
  
  const getStatusBadge = () => {
    if (status === 'today') {
      return <span className="festival-status-badge today">🎉 Today!</span>;
    } else if (status === 'this-week' && daysUntil > 0) {
      return <span className="festival-status-badge this-week">📅 In {daysUntil} {daysUntil === 1 ? 'day' : 'days'}</span>;
    } else if (status === 'this-month' && daysUntil > 0) {
      return <span className="festival-status-badge upcoming">⏰ In {daysUntil} days</span>;
    } else if (status === 'past') {
      return <span className="festival-status-badge past">✓ Completed</span>;
    }
    return null;
  };

  return (
    <div className={`festival-card ${compact ? 'compact' : ''} ${status}`}>
      <div className="festival-card-header">
        <div>
          <h3 className="festival-card-title">{festival.name}</h3>
          {festival.shortName && (
            <p className="festival-card-short-name">{festival.shortName}</p>
          )}
        </div>
        <div className="festival-card-badges">
          <span className="festival-card-category">{festival.category}</span>
          {getStatusBadge()}
        </div>
      </div>

      {festival.colors && festival.colors.length > 0 && (
        <div className="festival-card-colors">
          {festival.colors.map((color, index) => (
            <div
              key={index}
              className="festival-color-dot"
              style={{ backgroundColor: color }}
              title={`Festival color ${index + 1}`}
            />
          ))}
        </div>
      )}

      <div className="festival-card-info">
        <div className="festival-info-item festival-date-highlight">
          <span className="festival-info-icon">📅</span>
          <span className="festival-info-label">Date:</span>
          <span className="festival-date-value">{formatDateRange(festival.date, festival.endDate)}</span>
        </div>
        <div className="festival-info-item">
          <span className="festival-info-icon">⏱️</span>
          <span className="festival-info-label">Duration:</span>
          <span>{festival.duration}</span>
        </div>
      </div>

      {festival.lunarDate && (
        <div className="festival-info-item" style={{ marginBottom: '15px' }}>
          <span className="festival-info-icon">🌙</span>
          <span className="festival-info-label">Lunar Date:</span>
          <span>{festival.lunarDate}</span>
        </div>
      )}

      <p className="festival-card-description">{festival.description}</p>

      {festival.deities && festival.deities.length > 0 && (
        <div className="festival-card-deities">
          {festival.deities.map((deity, index) => (
            <span key={index} className="festival-deity-tag">
              🙏 {deity}
            </span>
          ))}
        </div>
      )}

      <div className="festival-card-footer">
        <Link 
          to={`/festivals/${festival.id}`} 
          className="festival-card-view-details"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default FestivalCard;
