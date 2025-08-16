import React from 'react';
import { Link } from 'react-router-dom'; // 1. Import Link
import './LiteratureCard.css';
import './LiteratureCardLink.css'; // 2. Import new CSS

const LiteratureCard = ({ story }) => {
  // Check the story's type to determine the correct link path
  const path = story.type === 'epic'
    ? `/library/ramayana/${story.id}`
    : `/library/${story.id}`;

  return (
    <Link to={path} className="literature-card-link">
      <div className="literature-card">
        <div className="lit-card-image-container">
          <img src={story.imageUrl} alt={story.title} className="lit-card-image" />
        </div>
        <div className="lit-card-content">
          <h3 className="lit-card-title">{story.title}</h3>
          {/* Ensure the story object has a summary property */}
          <p className="lit-card-summary">{story.summary}</p>
        </div>
      </div>
    </Link>
  );
};

export default LiteratureCard;