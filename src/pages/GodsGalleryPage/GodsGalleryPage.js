import React, { useState } from 'react';
import { godsData } from '../../data/godsData';
import GodCard from '../../components/GodCard/GodCard';
import './GodsGalleryPage.css';

const GodsGalleryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGods = godsData.filter((god) =>
    god.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="gallery-page">
      {/* This header is the key to the layout */}
      <div className="gallery-header">
        <h1 className="gallery-title">Gods Gallery</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for a god..."
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredGods.length === 0 && searchTerm && (
        <p className="no-results-message">
          No gods found matching "{searchTerm}"
        </p>
      )}

      <div className="gallery-grid">
        {filteredGods.map((god) => (
          <GodCard key={god.id} god={god} />
        ))}
      </div>
    </div>
  );
};

export default GodsGalleryPage;