import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getFestivalById, formatDateRange, getDaysUntilFestival, getFestivalStatus } from '../../data/festivals/festivalsData';
import './FestivalDetailPage.css';

const FestivalDetailPage = () => {
  const { festivalId } = useParams();
  const festival = getFestivalById(festivalId);

  // If festival not found, redirect to festivals page
  if (!festival) {
    return <Navigate to="/festivals" replace />;
  }

  const daysUntil = getDaysUntilFestival(festival.date);
  const status = getFestivalStatus(festival.date, festival.endDate);

  const getStatusMessage = () => {
    if (status === 'today') {
      return <div className="festival-status-message today">🎉 This festival is being celebrated today!</div>;
    } else if (status === 'this-week' && daysUntil > 0) {
      return <div className="festival-status-message this-week">📅 Coming up in {daysUntil} {daysUntil === 1 ? 'day' : 'days'}!</div>;
    } else if (status === 'this-month' && daysUntil > 0) {
      return <div className="festival-status-message upcoming">⏰ {daysUntil} days until this festival</div>;
    } else if (status === 'future' && daysUntil > 0) {
      return <div className="festival-status-message future">📆 {daysUntil} days away</div>;
    } else if (status === 'past') {
      return <div className="festival-status-message past">✓ This festival has passed for 2025</div>;
    }
    return null;
  };

  return (
    <div className="festival-detail-page">
      <div className="festival-detail-header">
        <Link to="/festivals" className="festival-detail-back-link">
          ← Back to Festivals
        </Link>

        <h1 className="festival-detail-title">{festival.name}</h1>
        
        {festival.shortName && (
          <p className="festival-detail-short-name">{festival.shortName}</p>
        )}

        {getStatusMessage()}

        {festival.colors && festival.colors.length > 0 && (
          <div className="festival-detail-colors">
            {festival.colors.map((color, index) => (
              <div
                key={index}
                className="festival-detail-color-dot"
                style={{ backgroundColor: color }}
                title={`Festival color ${index + 1}`}
              />
            ))}
          </div>
        )}

        <div className="festival-detail-meta">
          <div className="festival-detail-meta-item featured">
            <span className="festival-detail-meta-icon">📅</span>
            <span className="festival-detail-meta-label">2025 Date:</span>
            <span className="festival-detail-date-value">{formatDateRange(festival.date, festival.endDate)}</span>
          </div>
          <div className="festival-detail-meta-item">
            <span className="festival-detail-meta-icon">⏱️</span>
            <span className="festival-detail-meta-label">Duration:</span>
            <span>{festival.duration}</span>
          </div>
          {festival.lunarDate && (
            <div className="festival-detail-meta-item">
              <span className="festival-detail-meta-icon">🌙</span>
              <span className="festival-detail-meta-label">Lunar:</span>
              <span>{festival.lunarDate}</span>
            </div>
          )}
          <div className="festival-detail-meta-item">
            <span className="festival-detail-meta-icon">🏷️</span>
            <span>{festival.category}</span>
          </div>
        </div>
      </div>

      <div className="festival-detail-content">
        <div className="festival-detail-section">
          <h2 className="festival-detail-section-title">
            <span className="festival-detail-section-icon">📖</span>
            About
          </h2>
          <p className="festival-detail-description">{festival.description}</p>
        </div>

        <div className="festival-detail-section">
          <h2 className="festival-detail-section-title">
            <span className="festival-detail-section-icon">✨</span>
            Significance
          </h2>
          <p className="festival-detail-description">{festival.significance}</p>
        </div>

        <div className="festival-detail-section">
          <h2 className="festival-detail-section-title">
            <span className="festival-detail-section-icon">🕉️</span>
            Rituals & Traditions
          </h2>
          <ul className="festival-detail-rituals-list">
            {festival.rituals.map((ritual, index) => (
              <li key={index} className="festival-detail-ritual-item">
                {ritual}
              </li>
            ))}
          </ul>
        </div>

        <div className="festival-detail-section">
          <h2 className="festival-detail-section-title">
            <span className="festival-detail-section-icon">🙏</span>
            Associated Deities
          </h2>
          {festival.deities && festival.deities.length > 0 ? (
            <div className="festival-detail-deities">
              {festival.deities.map((deity, index) => (
                <div key={index} className="festival-detail-deity-card">
                  <span className="festival-detail-deity-icon">🙏</span>
                  {deity}
                </div>
              ))}
            </div>
          ) : (
            <p className="festival-detail-no-deities">
              This festival is not specifically associated with particular deities.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FestivalDetailPage;
