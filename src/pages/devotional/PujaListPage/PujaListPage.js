import React, { useState, useMemo } from 'react';
import PujaCard from '../../../components/PujaCard/PujaCard';
import { pujasData, pujaCategories, difficultyLevels, searchPujas } from '../../../data/pujas/pujasData';
import './PujaListPage.css';

const PujaListPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const categories = ['all', ...Object.values(pujaCategories)];
  const difficulties = ['all', ...Object.values(difficultyLevels)];

  const filteredPujas = useMemo(() => {
    let pujas = pujasData;

    // Filter by search query
    if (searchQuery.trim()) {
      pujas = searchPujas(searchQuery);
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      pujas = pujas.filter(puja => puja.category === selectedCategory);
    }

    // Filter by difficulty
    if (selectedDifficulty !== 'all') {
      pujas = pujas.filter(puja => puja.difficulty === selectedDifficulty);
    }

    return pujas;
  }, [searchQuery, selectedCategory, selectedDifficulty]);

  return (
    <div className="puja-list-page">
      <div className="puja-hero">
        <div className="puja-hero-content">
          <h1 className="puja-page-title">🪔 Interactive Puja Guide</h1>
          <p className="puja-page-subtitle">
            Step-by-step guides for performing Hindu pujas and rituals with devotion
          </p>
        </div>
      </div>

      <div className="puja-controls">
        <div className="puja-search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search pujas by name, deity, or occasion..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="puja-search-input"
          />
          {searchQuery && (
            <button
              className="clear-search-btn"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        <div className="puja-filters">
          <div className="filter-group">
            <label className="filter-label">Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Difficulty:</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="filter-select"
            >
              {difficulties.map(diff => (
                <option key={diff} value={diff}>
                  {diff === 'all' ? 'All Levels' : diff}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="puja-results-info">
        <p>
          Showing {filteredPujas.length} puja{filteredPujas.length !== 1 ? 's' : ''}
          {searchQuery && ` matching "${searchQuery}"`}
        </p>
      </div>

      {filteredPujas.length === 0 ? (
        <div className="no-pujas-message">
          <div className="no-pujas-icon">🔍</div>
          <h3>No pujas found</h3>
          <p>Try adjusting your search or filter criteria</p>
          <button
            className="reset-filters-btn"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedDifficulty('all');
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="pujas-grid">
          {filteredPujas.map(puja => (
            <PujaCard key={puja.id} puja={puja} />
          ))}
        </div>
      )}

      <div className="puja-page-footer">
        <div className="puja-info-note">
          <h3>📖 About Puja Guides</h3>
          <p>
            Our step-by-step puja guides are designed to help you perform Hindu rituals with proper
            understanding and devotion. Each guide includes detailed instructions, material checklists,
            mantras, and timing recommendations. Remember, the most important aspect of any puja is
            your sincere devotion and faith.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PujaListPage;
