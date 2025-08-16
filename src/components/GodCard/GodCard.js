import React from 'react';
import { Link } from 'react-router-dom'; // 1. Import Link
import './GodCard.css';
import './GodCardLink.css'; // 2. Import the new CSS file

const GodCard = ({ god }) => {
  return (
    // 3. Wrap the card in a Link component pointing to the dynamic URL
    <Link to={`/gods/${god.id}`} className="god-card-link">
      <div className="god-card">
        <div className="god-card-image-container">
          <img src={god.imageUrl} alt={god.name} className="god-card-image" />
        </div>
        <div className="god-card-content">
          <h3 className="god-card-title">{god.name}</h3>
          <p className="god-card-description">{god.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default GodCard;