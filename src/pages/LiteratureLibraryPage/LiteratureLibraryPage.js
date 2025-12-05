import React, { useState } from 'react';
import { literatureData } from '../../data/literature';
import LiteratureCard from '../../components/LitratureCard/LiteratureCard';
import './LiteratureLibraryPage.css';

const LiteratureLibraryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLiterature = literatureData.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="gallery-page">
      {/* Header with Title and Search */}
      <div className="gallery-header">
        <h1 className="gallery-title">Literature Library</h1>
        <p className="gallery-header-subtitle">Explore Sacred Hindu Texts & Epics</p>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for a story..."
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* No Results Message */}
      {filteredLiterature.length === 0 && searchTerm && (
        <p className="no-results-message">
          No stories found matching "{searchTerm}"
        </p>
      )}

      {/* Literature Grid */}
      <div className="gallery-grid">
        {filteredLiterature.map((story) => (
          <LiteratureCard key={story.id} story={story} />
        ))}
      </div>
    </div>
  );
};

export default LiteratureLibraryPage;