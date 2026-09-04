import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchContent } from '../../utils/searchService';
import './Search.css';

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'literature', label: 'Scriptures' },
  { id: 'gods', label: 'Deities' },
  { id: 'pujas', label: 'Pujas' },
  { id: 'ashtottaram', label: '108 Names' },
  { id: 'festivals', label: 'Festivals' }
];

const Search = ({ isModal = false, onClose }) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(isModal);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setQuery('');
    setResults([]);
    if (onClose) onClose();
  }, [onClose]);

  // Open modal / focus on Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen(true);
        setTimeout(() => inputRef.current?.focus(), 50);
      } else if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleClose]);

  // Click outside to close (for non-modal dropdown)
  useEffect(() => {
    if (isModal) return;
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isModal]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim().length >= 2) {
        const searchResults = searchContent(query, activeCategory);
        setResults(searchResults);
        setSelectedIndex(0);
        setIsOpen(true);
      } else {
        setResults([]);
        setSelectedIndex(0);
        if (!isModal) setIsOpen(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query, activeCategory, isModal]);

  const handleSelectResult = (result) => {
    handleClose();
    if (result && result.link) {
      navigate(result.link);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (results.length ? (prev + 1) % results.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (results.length ? (prev - 1 + results.length) % results.length : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        handleSelectResult(results[selectedIndex]);
      }
    }
  };

  return (
    <div className={`search-container ${isModal ? 'is-modal' : ''}`} ref={searchRef}>
      {/* Search Input Bar */}
      <div className="search-input-wrapper">
        <svg 
          className="search-icon" 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>

        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder="Search scriptures, deities, pujas, 108 names..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (query.length >= 2) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          aria-label="Search Divine Path"
        />

        {query ? (
          <button 
            type="button" 
            className="search-clear-btn" 
            onClick={() => { setQuery(''); setResults([]); inputRef.current?.focus(); }}
            aria-label="Clear search query"
          >
            ✕
          </button>
        ) : (
          <div className="search-kbd-badge" title="Press Cmd+K to search">
            <span>⌘K</span>
          </div>
        )}
      </div>

      {/* Results Dropdown or Modal View */}
      {isOpen && (
        <div className="search-results-dropdown animate-fade-in" role="listbox">
          {/* Quick Category Filter Pills */}
          <div className="search-category-pills">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`category-pill ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Results List */}
          <div className="search-results-list">
            {results.length > 0 ? (
              results.map((result, idx) => (
                <div 
                  key={result.id} 
                  className={`search-result-item ${selectedIndex === idx ? 'selected' : ''}`}
                  onClick={() => handleSelectResult(result)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  role="option"
                  aria-selected={selectedIndex === idx}
                >
                  {result.image ? (
                    <img src={result.image} alt={result.title} className="result-image" />
                  ) : (
                    <div 
                      className="result-placeholder" 
                      style={{ backgroundColor: result.badgeColor || '#e65100' }}
                    >
                      {result.type ? result.type.charAt(0) : '🕉'}
                    </div>
                  )}
                  <div className="result-content">
                    <div className="result-header-row">
                      <span className="result-title">{result.title}</span>
                      <span 
                        className="result-type-badge" 
                        style={{ borderColor: result.badgeColor, color: result.badgeColor }}
                      >
                        {result.type}
                      </span>
                    </div>
                    <span className="result-subtitle">{result.subtitle}</span>
                    {result.description && (
                      <p className="result-desc">{result.description}</p>
                    )}
                  </div>
                </div>
              ))
            ) : query.trim().length >= 2 ? (
              <div className="no-results">
                <span className="no-results-icon">🔍</span>
                <p>No matches found for "<strong>{query}</strong>"</p>
                <small>Try searching for "Gita", "Shiva", "Hanuman", "Diwali", or "Ganesha"</small>
              </div>
            ) : (
              <div className="search-hint-box">
                <p className="search-hint-title">Quick Searches</p>
                <div className="search-quick-tags">
                  {['Bhagavad Gita', 'Ramayana', 'Lord Shiva', 'Hanuman', 'Ekadashi', 'Ganesha 108'].map(tag => (
                    <button 
                      key={tag} 
                      type="button" 
                      className="quick-tag-btn" 
                      onClick={() => setQuery(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
