import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { literatureData } from '../../data/literature';
import './LiteratureDetailPage.css';

const LiteratureDetailPage = () => {
  const { storyId } = useParams();
  const story = literatureData.find((s) => s.id === parseInt(storyId) || s.id === storyId);

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
        
        {/* Introduction */}
        <p className="lit-detail-introduction">{story.introduction}</p>

        {/* Display sections based on epic type */}
        {(story.kandas || story.parvas || story.mandalas || story.kaandas || story.samhitas) && (
          <div className="sections-display">
            <h2>
              {story.kandas ? "Kandas" : 
               story.parvas ? "Books of the Mahabharata" : 
               story.mandalas ? "Mandalas" :
               story.kaandas ? "Kaandas" :
               story.samhitas ? "Samhitas" : "Sections"}
            </h2>
            <div className="sections-list">
              {(story.kandas || story.parvas || story.mandalas || story.kaandas || story.samhitas).map((section, index) => (
                <div key={index} className="section-card">
                  <h3>{section.title}</h3>
                  <p>{section.summary || section.description}</p>
                  {section.scenes && section.scenes.length > 0 && (
                    <div className="scenes-preview">
                      <h4>Key Scenes:</h4>
                      <ul>
                        {section.scenes.slice(0, 5).map((scene, idx) => (
                          <li key={idx}>{scene.title || scene.text.substring(0, 50) + '...'}</li>
                        ))}
                      </ul>
                      {section.scenes.length > 5 && (
                        <p className="more-scenes">+{section.scenes.length - 5} more scenes</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Full story if available */}
        {story.fullStory && (
          <p className="lit-detail-full-story">{story.fullStory}</p>
        )}

        <div className="story-button-container">
          <Link to={`/story/${story.id}`} className="start-story-button">
            Start Story Mode
          </Link>
        </div>

        <Link to="/library" className="back-link">
          &larr; Back to Library
        </Link>
      </div>
    </div>
  );
};

export default LiteratureDetailPage;