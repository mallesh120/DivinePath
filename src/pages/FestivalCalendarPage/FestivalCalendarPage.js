import React, { useState, useMemo } from 'react';
import FestivalCard from '../../components/FestivalCard/FestivalCard';
import { 
  festivalsData, 
  getFestivalsByCategory,
  getUpcomingFestivals,
  getTodaysFestivals,
  sortFestivalsByDate
} from '../../data/festivalsData';
import './FestivalCalendarPage.css';

const FestivalCalendarPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('upcoming'); // 'all', 'upcoming', 'today'

  const categories = useMemo(() => {
    const cats = new Set(festivalsData.map(f => f.category));
    return ['all', ...Array.from(cats)];
  }, []);

  const todaysFestivals = getTodaysFestivals();

  const filteredFestivals = useMemo(() => {
    let festivals = festivalsData;

    // Filter by view mode
    if (viewMode === 'upcoming') {
      festivals = getUpcomingFestivals();
    } else if (viewMode === 'today') {
      festivals = todaysFestivals;
    } else {
      festivals = sortFestivalsByDate(festivalsData);
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      festivals = festivals.filter(f => f.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      festivals = festivals.filter(f =>
        f.name.toLowerCase().includes(query) ||
        f.description.toLowerCase().includes(query) ||
        (f.shortName && f.shortName.toLowerCase().includes(query)) ||
        (f.deities && f.deities.some(d => d.toLowerCase().includes(query)))
      );
    }

    return festivals;
  }, [festivalsData, selectedCategory, searchQuery, viewMode, todaysFestivals]);

  const upcomingCount = getUpcomingFestivals().length;

  return (
    <div className="festival-calendar-page">
      <div className="festival-hero">
        <div className="festival-hero-content">
          <h1 className="festival-page-title">🪔 Festival Calendar</h1>
          <p className="festival-page-subtitle">
            Discover and celebrate Hindu festivals throughout the year
          </p>
        </div>
      </div>

      {todaysFestivals.length > 0 && (
        <div className="todays-festival-banner">
          <div className="todays-banner-icon">🎉</div>
          <div className="todays-banner-content">
            <h2>Celebrating Today!</h2>
            <div className="todays-festivals-list">
              {todaysFestivals.map(festival => (
                <span key={festival.id} className="todays-festival-name">
                  {festival.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="festival-controls">
        <div className="view-mode-tabs">
          <button
            className={`view-mode-tab ${viewMode === 'upcoming' ? 'active' : ''}`}
            onClick={() => setViewMode('upcoming')}
          >
            📅 Upcoming ({upcomingCount})
          </button>
          {todaysFestivals.length > 0 && (
            <button
              className={`view-mode-tab ${viewMode === 'today' ? 'active' : ''}`}
              onClick={() => setViewMode('today')}
            >
              🎉 Today ({todaysFestivals.length})
            </button>
          )}
          <button
            className={`view-mode-tab ${viewMode === 'all' ? 'active' : ''}`}
            onClick={() => setViewMode('all')}
          >
            📚 All Festivals ({festivalsData.length})
          </button>
        </div>

        <div className="festival-search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search festivals by name, deity, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="festival-search-input"
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

        <div className="category-filter">
          <label className="filter-label">Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="festival-results-info">
        <p>
          Showing {filteredFestivals.length} festival{filteredFestivals.length !== 1 ? 's' : ''}
          {searchQuery && ` matching "${searchQuery}"`}
        </p>
      </div>

      {filteredFestivals.length === 0 ? (
        <div className="no-festivals-message">
          <div className="no-festivals-icon">🔍</div>
          <h3>No festivals found</h3>
          <p>Try adjusting your search or filter criteria</p>
          <button
            className="reset-filters-btn"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setViewMode('upcoming');
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="festivals-grid">
          {filteredFestivals.map(festival => (
            <FestivalCard key={festival.id} festival={festival} />
          ))}
        </div>
      )}

      <div className="festival-calendar-footer">
        <div className="festival-info-note">
          <h3>📖 About Festival Dates</h3>
          <p>
            Hindu festivals follow the lunar calendar (Panchang), so dates may vary slightly.
            The dates shown are based on widely accepted calculations for the year 2025.
            Always verify with your local temple or Panchang for precise timings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FestivalCalendarPage;
