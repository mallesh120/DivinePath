import React from 'react';
import { Link } from 'react-router-dom'; // 1. Import Link
import './LiteratureCard.css';
import './LiteratureCardLink.css'; // 2. Import new CSS

const LiteratureCard = ({ story, isBookmarked, onToggleBookmark }) => {
  // All literature types now use the Universal Reader architecture
  const path = `/library/${story.id}`;

  // Type badges for visual identification
  const typeBadges = {
    epic: { emoji: '⚔️', label: 'Epic', color: '#ff6b6b' },
    scripture: { emoji: '📖', label: 'Scripture', color: '#4ecdc4' },
    purana: { emoji: '🕉️', label: 'Purana', color: '#95e1d3' },
    mythology: { emoji: '✨', label: 'Mythology', color: '#ffb142' },
    summary: { emoji: '📚', label: 'Summary', color: '#f38181' }
  };

  const badge = typeBadges[story.type] || typeBadges.summary;

  const handleBookmarkClick = (e) => {
    e.preventDefault(); // Prevent navigating to the link
    if (onToggleBookmark) {
      onToggleBookmark();
    }
  };

  return (
    <Link to={path} className="literature-card-link">
      <div className="literature-card glass-panel-card">
        <div className="literature-card-image-container">
          <img src={story.imageUrl} alt={story.title} className="literature-card-image" />
          <div className="literature-type-badge glass-badge" style={{ background: badge.color }}>
            {badge.emoji} {badge.label}
          </div>
          
          <button 
            className={`bookmark-btn ${isBookmarked ? 'active' : ''}`}
            onClick={handleBookmarkClick}
            aria-label={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
          >
            {isBookmarked ? '🔖' : '🔖'}
          </button>
        </div>
        <div className="literature-card-content">
          <h3 className="literature-card-title">{story.title}</h3>
          <p className="literature-card-summary">{story.summary}</p>
          <div className="feature-icons-container">
            {story.hasAudio && <span className="feature-icon" title="Audio available">🎧</span>}
            {story.hasIllustrations && <span className="feature-icon" title="Illustrations available">🎨</span>}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LiteratureCard;