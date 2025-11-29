import React from 'react';
import { Link } from 'react-router-dom'; // 1. Import Link
import './LiteratureCard.css';
import './LiteratureCardLink.css'; // 2. Import new CSS

const LiteratureCard = ({ story }) => {
  // Check the story's type to determine the correct link path
  let path;
  if (story.type === 'epic') {
    path = `/library/ramayana/${story.id}`;
  } else if (story.type === 'scripture') {
    path = `/library/scripture/${story.id}`;
  } else if (story.type === 'purana') {
    path = `/library/purana/${story.id}`;
  } else {
    path = `/library/${story.id}`;
  }

  // Type badges for visual identification
  const typeBadges = {
    epic: { emoji: '⚔️', label: 'Epic', color: '#ff6b6b' },
    scripture: { emoji: '📖', label: 'Scripture', color: '#4ecdc4' },
    purana: { emoji: '🕉️', label: 'Purana', color: '#95e1d3' },
    summary: { emoji: '📚', label: 'Summary', color: '#f38181' }
  };

  const badge = typeBadges[story.type] || typeBadges.summary;

  return (
    <Link to={path} className="literature-card-link">
      <div className="literature-card">
        <div className="literature-card-image-container">
          <img src={story.imageUrl} alt={story.title} className="literature-card-image" />
          <div className="literature-type-badge" style={{ background: badge.color }}>
            {badge.emoji} {badge.label}
          </div>
        </div>
        <div className="literature-card-content">
          <h3 className="literature-card-title">{story.title}</h3>
          <p className="literature-card-summary">{story.summary}</p>
          {story.hasAudio && <span className="feature-icon">🎧</span>}
          {story.hasIllustrations && <span className="feature-icon">🎨</span>}
        </div>
      </div>
    </Link>
  );
};

export default LiteratureCard;