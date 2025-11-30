import React, { useState } from 'react';
import './NameSuggestionPage.css';

const NameSuggestionPage = () => {
  const [filters, setFilters] = useState({
    gender: 'All',
    nakshatra: 'All',
    deity: 'All',
    startingLetter: ''
  });
  const [showResults, setShowResults] = useState(false);

  const nakshatras = [
    'All', 'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
    'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
    'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula',
    'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
    'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
  ];

  const deities = [
    'All', 'Shiva', 'Vishnu', 'Ganesha', 'Durga', 'Lakshmi', 'Saraswati',
    'Krishna', 'Rama', 'Hanuman', 'Surya', 'Chandra'
  ];

  // Sample name database
  const nameDatabase = [
    {
      name: 'Aarav',
      gender: 'Boy',
      meaning: 'Peaceful, wisdom',
      origin: 'Sanskrit',
      nakshatra: 'Krittika',
      deity: 'Surya',
      numerology: 9,
      description: 'A modern yet traditional name meaning peaceful or wisdom. Associated with calmness and intelligence.',
      popularity: 'High'
    },
    {
      name: 'Aanya',
      gender: 'Girl',
      meaning: 'Inexhaustible, limitless',
      origin: 'Sanskrit',
      nakshatra: 'Bharani',
      deity: 'Durga',
      numerology: 3,
      description: 'Represents the infinite power and grace of Goddess Durga. Signifies boundless energy and potential.',
      popularity: 'High'
    },
    {
      name: 'Advait',
      gender: 'Boy',
      meaning: 'Unique, one without a second',
      origin: 'Sanskrit',
      nakshatra: 'Rohini',
      deity: 'Vishnu',
      numerology: 7,
      description: 'Philosophical name from Advaita Vedanta. Represents non-duality and the oneness of existence.',
      popularity: 'Medium'
    },
    {
      name: 'Ananya',
      gender: 'Girl',
      meaning: 'Unique, matchless',
      origin: 'Sanskrit',
      nakshatra: 'Ashwini',
      deity: 'Lakshmi',
      numerology: 8,
      description: 'Signifies uniqueness and devotion. Often used to describe unwavering devotion to the divine.',
      popularity: 'High'
    },
    {
      name: 'Arjun',
      gender: 'Boy',
      meaning: 'Bright, shining, white',
      origin: 'Sanskrit',
      nakshatra: 'Uttara Phalguni',
      deity: 'Krishna',
      numerology: 5,
      description: 'Named after the great warrior prince from Mahabharata. Represents courage, righteousness, and skill.',
      popularity: 'Very High'
    },
    {
      name: 'Dhruv',
      gender: 'Boy',
      meaning: 'Pole star, constant, firm',
      origin: 'Sanskrit',
      nakshatra: 'Uttara Bhadrapada',
      deity: 'Vishnu',
      numerology: 1,
      description: 'Named after the devoted prince who became the pole star. Represents steadfastness and devotion.',
      popularity: 'High'
    },
    {
      name: 'Ishaan',
      gender: 'Boy',
      meaning: 'Lord Shiva, sun, ruler',
      origin: 'Sanskrit',
      nakshatra: 'Purva Phalguni',
      deity: 'Shiva',
      numerology: 6,
      description: 'Another name for Lord Shiva. Represents divinity, power, and auspiciousness.',
      popularity: 'Very High'
    },
    {
      name: 'Kavya',
      gender: 'Girl',
      meaning: 'Poetry, divine beauty',
      origin: 'Sanskrit',
      nakshatra: 'Hasta',
      deity: 'Saraswati',
      numerology: 4,
      description: 'Associated with Goddess Saraswati. Represents artistic expression and creative wisdom.',
      popularity: 'High'
    },
    {
      name: 'Krishna',
      gender: 'Boy',
      meaning: 'Dark, all-attractive',
      origin: 'Sanskrit',
      nakshatra: 'Rohini',
      deity: 'Krishna',
      numerology: 3,
      description: 'The eighth avatar of Lord Vishnu. Represents divine love, wisdom, and playfulness.',
      popularity: 'Very High'
    },
    {
      name: 'Lakshmi',
      gender: 'Girl',
      meaning: 'Goddess of wealth and prosperity',
      origin: 'Sanskrit',
      nakshatra: 'Shravana',
      deity: 'Lakshmi',
      numerology: 7,
      description: 'The goddess of wealth, fortune, and prosperity. Brings blessings and abundance.',
      popularity: 'Very High'
    },
    {
      name: 'Rudra',
      gender: 'Boy',
      meaning: 'Howler, roarer, Lord Shiva',
      origin: 'Sanskrit',
      nakshatra: 'Ardra',
      deity: 'Shiva',
      numerology: 2,
      description: 'A fierce form of Lord Shiva. Represents power, transformation, and divine protection.',
      popularity: 'Medium'
    },
    {
      name: 'Saanvi',
      gender: 'Girl',
      meaning: 'Goddess Lakshmi, knowledge',
      origin: 'Sanskrit',
      nakshatra: 'Shatabhisha',
      deity: 'Lakshmi',
      numerology: 5,
      description: 'Represents divine knowledge and prosperity. A name blessed by Goddess Lakshmi.',
      popularity: 'Very High'
    },
    {
      name: 'Shivansh',
      gender: 'Boy',
      meaning: 'Part of Shiva',
      origin: 'Sanskrit',
      nakshatra: 'Pushya',
      deity: 'Shiva',
      numerology: 9,
      description: 'Signifies being a part of Lord Shiva. Represents divine essence and spiritual strength.',
      popularity: 'High'
    },
    {
      name: 'Veda',
      gender: 'Girl',
      meaning: 'Sacred knowledge',
      origin: 'Sanskrit',
      nakshatra: 'Mrigashira',
      deity: 'Saraswati',
      numerology: 6,
      description: 'Refers to the sacred Vedic scriptures. Represents divine knowledge and wisdom.',
      popularity: 'Medium'
    },
    {
      name: 'Vivaan',
      gender: 'Boy',
      meaning: 'Full of life, lord Krishna',
      origin: 'Sanskrit',
      nakshatra: 'Chitra',
      deity: 'Krishna',
      numerology: 4,
      description: 'Represents vitality and divine energy. Associated with Lord Krishna\'s vibrant nature.',
      popularity: 'Very High'
    }
  ];

  const filterNames = () => {
    return nameDatabase.filter(name => {
      const genderMatch = filters.gender === 'All' || name.gender === filters.gender;
      const nakshatraMatch = filters.nakshatra === 'All' || name.nakshatra === filters.nakshatra;
      const deityMatch = filters.deity === 'All' || name.deity === filters.deity;
      const letterMatch = filters.startingLetter === '' || 
                          name.name.toLowerCase().startsWith(filters.startingLetter.toLowerCase());
      
      return genderMatch && nakshatraMatch && deityMatch && letterMatch;
    });
  };

  const handleSearch = async () => {
    setShowResults(true);
    
    // Build prompt based on filters
    const filterCriteria = [];
    if (filters.gender !== 'All') filterCriteria.push(`Gender: ${filters.gender}`);
    if (filters.nakshatra !== 'All') filterCriteria.push(`Nakshatra: ${filters.nakshatra}`);
    if (filters.deity !== 'All') filterCriteria.push(`Associated with deity: ${filters.deity}`);
    if (filters.startingLetter) filterCriteria.push(`Starting with letter: ${filters.startingLetter.toUpperCase()}`);
    
    const prompt = `Suggest 8 meaningful Hindu names with the following criteria:\n${filterCriteria.join('\n')}\n\nFor each name, provide:\n- Name\n- Meaning\n- Brief significance/description\n- Associated deity (if any)`;
    
    try {
      const response = await fetch('/.netlify/functions/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
          featureType: 'name-suggestion'
        })
      });

      const data = await response.json();

      if (data.success) {
        // Store AI response in a state variable that can be displayed
        // For now, we'll still show filtered results but log AI suggestions
        console.log('AI Name Suggestions:', data.response);
      }
    } catch (error) {
      console.error('Error getting AI name suggestions:', error);
    }
  };

  const filteredNames = showResults ? filterNames() : [];

  return (
    <div className="name-suggestion-page">
      <div className="name-header">
        <h1>Name Suggestion</h1>
        <p className="name-subtitle">
          Find the perfect name for your baby with meanings, nakshatra-based recommendations, and deity associations
        </p>
      </div>

      <div className="name-container">
        <div className="filters-section">
          <h2>Find the Perfect Name</h2>
          
          <div className="filter-group">
            <label>Gender</label>
            <div className="gender-buttons">
              {['All', 'Boy', 'Girl'].map(gender => (
                <button
                  key={gender}
                  className={`filter-btn ${filters.gender === gender ? 'active' : ''}`}
                  onClick={() => setFilters({...filters, gender})}
                >
                  {gender === 'Boy' ? '👦' : gender === 'Girl' ? '👧' : '👶'} {gender}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label>Nakshatra (Birth Star)</label>
            <select
              value={filters.nakshatra}
              onChange={(e) => setFilters({...filters, nakshatra: e.target.value})}
              className="filter-select"
            >
              {nakshatras.map(nak => (
                <option key={nak} value={nak}>{nak}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Associated Deity</label>
            <select
              value={filters.deity}
              onChange={(e) => setFilters({...filters, deity: e.target.value})}
              className="filter-select"
            >
              {deities.map(deity => (
                <option key={deity} value={deity}>{deity}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Starting Letter</label>
            <input
              type="text"
              maxLength="1"
              value={filters.startingLetter}
              onChange={(e) => setFilters({...filters, startingLetter: e.target.value})}
              placeholder="Enter letter (optional)"
              className="filter-input"
            />
          </div>

          <button onClick={handleSearch} className="search-names-btn">
            Find Names ✨
          </button>

          <div className="filter-info">
            <h4>💡 Tip</h4>
            <p>
              According to Vedic astrology, choosing a name based on the baby's nakshatra 
              (birth star) brings good fortune and aligns with their cosmic energies.
            </p>
          </div>
        </div>

        <div className="results-section">
          {!showResults ? (
            <div className="no-results-placeholder">
              <div className="placeholder-icon">👶</div>
              <h3>Ready to Find the Perfect Name?</h3>
              <p>Use the filters on the left to discover beautiful Hindu names with deep meanings.</p>
              <div className="popular-names-preview">
                <h4>Popular Names</h4>
                <div className="preview-grid">
                  {nameDatabase.slice(0, 6).map((name, index) => (
                    <div key={index} className="preview-card">
                      <strong>{name.name}</strong>
                      <span>{name.meaning}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : filteredNames.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">😔</div>
              <h3>No Names Found</h3>
              <p>Try adjusting your filters to see more results.</p>
            </div>
          ) : (
            <div className="names-grid">
              {filteredNames.map((name, index) => (
                <div key={index} className="name-card">
                  <div className="name-card-header">
                    <h3>{name.name}</h3>
                    <span className="gender-badge">{name.gender === 'Boy' ? '👦' : '👧'}</span>
                  </div>

                  <div className="name-meaning">
                    <strong>Meaning:</strong> {name.meaning}
                  </div>

                  <div className="name-details">
                    <div className="detail-item">
                      <span className="detail-label">Origin:</span>
                      <span className="detail-value">{name.origin}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Nakshatra:</span>
                      <span className="detail-value">⭐ {name.nakshatra}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Deity:</span>
                      <span className="detail-value">🕉️ {name.deity}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Numerology:</span>
                      <span className="detail-value">🔢 {name.numerology}</span>
                    </div>
                  </div>

                  <div className="name-description">
                    {name.description}
                  </div>

                  <div className="name-popularity">
                    <span className="popularity-label">Popularity:</span>
                    <div className="popularity-bar">
                      <div 
                        className={`popularity-fill ${name.popularity.toLowerCase().replace(' ', '-')}`}
                        style={{
                          width: name.popularity === 'Very High' ? '100%' :
                                 name.popularity === 'High' ? '75%' :
                                 name.popularity === 'Medium' ? '50%' : '25%'
                        }}
                      ></div>
                    </div>
                    <span className="popularity-value">{name.popularity}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {showResults && filteredNames.length > 0 && (
            <div className="results-count">
              Found {filteredNames.length} name{filteredNames.length !== 1 ? 's' : ''} matching your criteria
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NameSuggestionPage;
