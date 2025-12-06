import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { searchContent } from '../../utils/searchService';
import './Search.css';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length >= 2) {
        const searchResults = searchContent(query);
        setResults(searchResults);
        setIsOpen(true);
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300); // Debounce

    return () => clearTimeout(timer);
  }, [query]);

  const handleResultClick = () => {
    setIsOpen(false);
    setQuery('');
  };

  return (
    <div className="search-container" ref={searchRef}>
      <div className="search-input-wrapper">
        <svg 
          className="search-icon" 
          width="16" 
          height="16" 
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
          type="text"
          className="search-input"
          placeholder="Search Gods, Scriptures, Festivals..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
        />
      </div>

      {isOpen && (
        <div className="search-results-dropdown">
          {results.length > 0 ? (
            results.map((result) => (
              <Link 
                to={result.link} 
                key={result.id} 
                className="search-result-item"
                onClick={handleResultClick}
              >
                {result.image ? (
                  <img src={result.image} alt={result.title} className="result-image" />
                ) : (
                  <div className="result-placeholder">
                    {result.title.charAt(0)}
                  </div>
                )}
                <div className="result-content">
                  <span className="result-title">{result.title}</span>
                  <span className="result-subtitle">{result.subtitle}</span>
                  <span className="result-type">{result.type}</span>
                </div>
              </Link>
            ))
          ) : (
            <div className="no-results">
              No results found for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
