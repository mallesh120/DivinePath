import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { literatureData } from '../../data/literature';
import './RamayanaTOCPage.css';

const RamayanaTOCPage = () => {
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

  // Determine section type and title based on the epic
  const sections = story.kandas || story.parvas || story.mandalas || story.kaandas || story.samhitas;
  
  let sectionTitle = "Sections";
  if (story.kandas) sectionTitle = story.id === 'ramayana' ? "The Seven Kandas" : "The Seven Kandas";
  else if (story.parvas) sectionTitle = "Books of the Mahabharata";
  else if (story.mandalas) sectionTitle = "The Ten Mandalas";
  else if (story.kaandas) sectionTitle = "The Twenty Kaandas";
  else if (story.samhitas) sectionTitle = "The Two Samhitas";

  if (!sections) {
    return (
      <div className="story-not-found">
        <h2>This story doesn't have a table of contents yet.</h2>
        <Link to="/library">Back to the Library</Link>
      </div>
    );
  }

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
        <h2>{sectionTitle}</h2>
        {sections.map((section, index) => (
          <div key={index} className="kanda-item">
            <div className="kanda-info">
              <h3>{section.title}</h3>
              <p>{section.summary || section.description}</p>
            </div>
            {/* This link will take us to the story player for this specific section */}
            {section.scenes && section.scenes.length > 0 ? (
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
          {story.id === 1 
            ? "The Ramayana is more than just a story; it is a guide to righteous living. Through the trials of its divine characters, it explores the timeless values of duty (dharma), devotion (bhakti), loyalty, and compassion."
            : "The Mahabharata is the longest epic poem ever written, exploring the eternal questions of dharma (righteousness), karma (action), and the complexities of human existence through the grand narrative of two branches of a royal family."}
        </p>
      </div>
    </div>
  );
};

export default RamayanaTOCPage;