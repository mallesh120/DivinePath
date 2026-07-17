import React, { useState, useEffect } from 'react';
import { literatureData } from '../../data/literature';
import LiteratureCard from '../../components/LitratureCard/LiteratureCard';
import './LiteratureLibraryPage.css';

const categoryFilters = [
  { id: 'all', label: 'All' },
  { id: 'favorites', label: 'Favorites', emoji: '🔖' },
  { id: 'epic', label: 'Epics' },
  { id: 'scripture', label: 'Scriptures' },
  { id: 'purana', label: 'Puranas' },
  { id: 'mythology', label: 'Mythology' }
];

const LiteratureLibraryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [bookmarkedIds, setBookmarkedIds] = useState([]);

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('divinePath_literature_bookmarks');
    if (saved) {
      try {
        setBookmarkedIds(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse bookmarks", e);
      }
    }
  }, []);

  const toggleBookmark = (id) => {
    setBookmarkedIds(prev => {
      const newBookmarks = prev.includes(id)
        ? prev.filter(bId => bId !== id)
        : [...prev, id];
      
      localStorage.setItem('divinePath_literature_bookmarks', JSON.stringify(newBookmarks));
      return newBookmarks;
    });
  };

  const filteredLiterature = literatureData.filter((story) => {
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesCategory = true;
    if (selectedCategory === 'favorites') {
      matchesCategory = bookmarkedIds.includes(story.id);
    } else if (selectedCategory !== 'all') {
      matchesCategory = story.type === selectedCategory;
    }

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="gallery-page">
      <div className="gallery-content-wrapper">
        {/* Header with Title and Search */}
        <div className="gallery-header glass-panel">
          <h1 className="gallery-title">Literature Library</h1>
          <p className="gallery-header-subtitle">Explore Sacred Hindu Texts & Epics</p>
          
          <div className="search-container">
            <input
              type="text"
              placeholder="Search for a text..."
              className="search-bar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="category-filters">
            {categoryFilters.map(cat => (
              <button
                key={cat.id}
                className={`category-pill ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.emoji && <span className="cat-emoji">{cat.emoji}</span>}
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* No Results Message */}
        {filteredLiterature.length === 0 && (
          <div className="no-results-message glass-panel">
            {selectedCategory === 'favorites' && bookmarkedIds.length === 0 
              ? "You haven't added any favorites yet. Click the bookmark icon on any text to save it here!"
              : `No texts found matching your criteria.`}
          </div>
        )}

        {/* Literature Grid */}
        <div className="gallery-grid">
          {filteredLiterature.map((story) => (
            <LiteratureCard 
              key={story.id} 
              story={story} 
              isBookmarked={bookmarkedIds.includes(story.id)}
              onToggleBookmark={() => toggleBookmark(story.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiteratureLibraryPage;