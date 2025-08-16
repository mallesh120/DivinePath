import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { literatureData } from '../../data/literature';
import './RamayanaTOCPage.css';

const RamayanaTOCPage = () => {
  const { storyId } = useParams();
  const story = literatureData.find((s) => s.id === parseInt(storyId));

  return (
    <div className="toc-page">
      <div className="toc-header">
        <img src={story.imageUrl} alt={story.title} className="toc-main-image" />
        <div className="toc-intro-text">
          <h1>{story.title}</h1>
          <p>{story.introduction}</p>
        </div>
      </div>

      <div className="kanda-list">
        <h2>The Seven Kandas</h2>
        {story.kandas.map((kanda, index) => (
          <div key={index} className="kanda-item">
            <div className="kanda-info">
              <h3>{kanda.title}</h3>
              <p>{kanda.summary}</p>
            </div>
            {/* This link will take us to the story player for this specific kanda */}
            {kanda.scenes.length > 0 ? (
              <Link to={`/story/${story.id}/${index}`} className="kanda-story-button">
                Begin Story
              </Link>
            ) : (
              <button className="kanda-story-button disabled" disabled>Coming Soon</button>
            )}
          </div>
        ))}
      </div>
      <div className="toc-conclusion">
        <p>
          The Ramayana is more than just a story; it is a guide to righteous living. Through the trials of its divine characters, it explores the timeless values of duty (dharma), devotion (bhakti), loyalty, and compassion.
        </p>
      </div>
    </div>
  );
};

export default RamayanaTOCPage;