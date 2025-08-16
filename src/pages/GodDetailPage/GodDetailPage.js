import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { godsData } from '../../data/godsData';
import './GodDetailPage.css';

const GodDetailPage = () => {
  // The useParams hook gets parameters from the URL (the :godId we will set up)
  const { godId } = useParams();

  // Find the god from our data array. We use parseInt because the godId from the URL is a string.
  const god = godsData.find((g) => g.id === parseInt(godId));

  // If a user types in a URL for a god that doesn't exist, show a message.
  if (!god) {
    return (
      <div className="god-not-found">
        <h2>God not found!</h2>
        <Link to="/gods">Back to the Gods Gallery</Link>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <div className="detail-container">
        <div className="detail-image-container">
          <img src={god.imageUrl} alt={god.name} className="detail-image" />
        </div>
        <div className="detail-content">
          <h1 className="detail-title">{god.name}</h1>
          <p className="detail-long-description">{god.longDescription}</p>
          <div className="detail-mantra-container">
            <h3 className="mantra-title">Mantra</h3>
            <p className="mantra-text">"{god.mantra}"</p>
          </div>
          <Link to="/gods" className="back-link">
            &larr; Back to Gallery
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GodDetailPage;