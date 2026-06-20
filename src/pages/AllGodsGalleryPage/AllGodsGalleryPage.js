import React, { useState, useMemo } from 'react';
import { godsData, godCategories, getGodsByCategory, searchGods } from '../../data/gods/godsData';
import { useNavigate } from 'react-router-dom';
import './AllGodsGalleryPage.css';

const AllGodsGalleryPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter and search gods
  const filteredGods = useMemo(() => {
    let gods = selectedCategory === 'all' 
      ? godsData 
      : getGodsByCategory(selectedCategory);

    if (searchQuery.trim()) {
      gods = gods.filter(god => searchGods(searchQuery).includes(god));
    }

    return gods;
  }, [selectedCategory, searchQuery]);

  const handleGodClick = (godId) => {
    // Check if it's a Trinity god (string id) or regular god (number id)
    navigate(`/adults/gods/${godId}`);
  };

  const handleBackToMain = () => {
    navigate('/adults/gods');
  };

  return (
    <div className="all-gods-page">
      <div className="all-gods-header">
        <button className="back-to-main-btn" onClick={handleBackToMain}>
          ← Back to Gods Gallery
        </button>
        
        <h1 className="all-gods-title">Complete Hindu Pantheon</h1>
        <p className="all-gods-subtitle">
          Explore the diverse deities of Hinduism - from the Holy Trinity to planetary gods
        </p>

        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search gods by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>

        {/* Category Filter Pills */}
        <div className="category-filters">
          {godCategories.map((category) => (
            <button
              key={category.id}
              className={`category-pill ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="results-count">
          {filteredGods.length} {filteredGods.length === 1 ? 'deity' : 'deities'} found
        </div>
      </div>

      {/* Gods Grid */}
      <div className="all-gods-grid">
        {filteredGods.length > 0 ? (
          filteredGods.map((god) => (
            <div
              key={god.id}
              className="all-god-card"
              onClick={() => handleGodClick(god.id)}
            >
              <div className="all-god-image-container">
                <img src={god.imageUrl} alt={god.name} className="all-god-image" />
                {god.category && (
                  <div className="god-category-badge">{god.category}</div>
                )}
              </div>
              <div className="all-god-content">
                <h3 className="all-god-name">{god.name}</h3>
                <p className="all-god-description">{god.description}</p>
                {god.parent && (
                  <div className="god-parent-tag">
                    <span className="parent-icon">🔗</span>
                    <span>Associated with {god.parent}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3>No deities found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllGodsGalleryPage;
