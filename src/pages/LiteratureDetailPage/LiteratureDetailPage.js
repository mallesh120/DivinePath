import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { literatureData } from '../../data/literature';
import './LiteratureDetailPage.css';

const LiteratureDetailPage = () => {
  const { storyId } = useParams();
  const story = literatureData.find((s) => s.id === parseInt(storyId));

  if (!story) {
    return (
      <div className="story-not-found">
        <h2>Story not found!</h2>
        <Link to="/library">Back to the Library</Link>
      </div>
    );
  }

  return (
    <div className="lit-detail-page">
      <div className="lit-detail-container">
        <h1 className="lit-detail-title">{story.title}</h1>
        <div className="lit-detail-image-container">
          <img src={story.imageUrl} alt={story.title} className="lit-detail-image" />
        </div>
        <div className="story-button-container">
            <Link to={`/story/${story.id}`} className="start-story-button">
              Start Story Mode
            </Link>
          </div>
        <p className="lit-detail-full-story">{story.fullStory}</p>
        <Link to="/library" className="back-link">
          &larr; Back to Library
        </Link>
      </div>
    </div>
  );
};

export default LiteratureDetailPage;