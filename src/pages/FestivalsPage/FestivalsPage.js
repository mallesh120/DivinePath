import React, { useState, useMemo } from 'react';
import { festivalsData, sortFestivalsByDate } from '../../data/festivalsData';
import FestivalCard from '../../components/FestivalCard/FestivalCard';
import './FestivalsPage.css';

const FestivalsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [sortBy, setSortBy] = useState('date'); // 'date' or 'name'

  // Get unique categories and months
  const categories = useMemo(() => {
    const cats = ['all', ...new Set(festivalsData.map(f => f.category))];
    return cats;
  }, []);

  const months = useMemo(() => {
    const monthSet = new Set();
    festivalsData.forEach(f => {
      // Extract individual months from strings like "October/November"
      f.month.split('/').forEach(m => monthSet.add(m.trim()));
    });
    return ['all', ...Array.from(monthSet).sort((a, b) => {
      const monthOrder = ['January', 'February', 'March', 'April', 'May', 'June', 
                         'July', 'August', 'September', 'October', 'November', 'December'];
      return monthOrder.indexOf(a) - monthOrder.indexOf(b);
    })];
  }, []);

  // Filter and sort festivals based on selected criteria
  const filteredFestivals = useMemo(() => {
    let filtered = festivalsData.filter(festival => {
      const categoryMatch = selectedCategory === 'all' || festival.category === selectedCategory;
      const monthMatch = selectedMonth === 'all' || festival.month.includes(selectedMonth);
      return categoryMatch && monthMatch;
    });

    // Sort festivals
    if (sortBy === 'date') {
      filtered = sortFestivalsByDate(filtered);
    } else if (sortBy === 'name') {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [selectedCategory, selectedMonth, sortBy]);

  return (
    <div className="festivals-page">
      <div className="festivals-page-header">
        <h1 className="festivals-page-title">Hindu Festivals 2025</h1>
        <p className="festivals-page-subtitle">
          Explore the rich tapestry of Hindu festivals celebrating devotion, tradition, 
          and the eternal cycle of seasons. Each festival carries deep spiritual significance 
          and brings communities together in celebration.
        </p>
      </div>

      <div className="festivals-filters">
        <span className="festival-filter-label">Filter & Sort:</span>
        
        <select
          className="festival-filter-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'All Categories' : cat}
            </option>
          ))}
        </select>

        <select
          className="festival-filter-select"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {months.map(month => (
            <option key={month} value={month}>
              {month === 'all' ? 'All Months' : month}
            </option>
          ))}
        </select>

        <select
          className="festival-filter-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="date">Sort by Date</option>
          <option value="name">Sort by Name</option>
        </select>
      </div>

      {filteredFestivals.length > 0 && (
        <div className="festivals-count">
          Showing <span className="festivals-count-number">{filteredFestivals.length}</span> festival
          {filteredFestivals.length !== 1 ? 's' : ''}
        </div>
      )}

      {filteredFestivals.length > 0 ? (
        <div className="festivals-grid">
          {filteredFestivals.map(festival => (
            <FestivalCard key={festival.id} festival={festival} />
          ))}
        </div>
      ) : (
        <div className="festivals-empty">
          <div className="festivals-empty-icon">🎭</div>
          <p className="festivals-empty-text">No festivals found</p>
          <p className="festivals-empty-subtext">
            Try adjusting your filters to see more festivals
          </p>
        </div>
      )}
    </div>
  );
};

export default FestivalsPage;
