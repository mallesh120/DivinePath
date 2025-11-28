import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAshtottaramList } from '../../data/ashtottaramData';
import './AshtottaramListPage.css';

const AshtottaramListPage = () => {
  const navigate = useNavigate();
  const [filterCategory, setFilterCategory] = useState('all');
  const ashtottarams = getAshtottaramList();

  const filteredAshtottarams = filterCategory === 'all'
    ? ashtottarams
    : ashtottarams.filter(deity => deity.category === filterCategory);

  const handleDeityClick = (deityId) => {
    navigate(`/ashtottaram/${deityId}`);
  };

  return (
    <div className="ashtottaram-list-page">
      <div className="ashtottaram-hero">
        <div className="ashtottaram-hero-content">
          <h1>Ashtottara Shatanamavali</h1>
          <p className="ashtottaram-subtitle">
            108 Sacred Names of Hindu Deities
          </p>
          <p className="ashtottaram-description">
            Ashtottara Shatanamavali are the 108 sacred names of Hindu Gods and Goddesses. 
            Chanting these names with devotion brings blessings, removes obstacles, and 
            fulfills desires. Each name represents a divine quality or form.
          </p>
        </div>
      </div>

      <div className="ashtottaram-content">
        <div className="filter-section">
          <h2>Browse by Category</h2>
          <div className="filter-buttons">
            <button
              className={`filter-btn ${filterCategory === 'all' ? 'active' : ''}`}
              onClick={() => setFilterCategory('all')}
            >
              All Deities ({ashtottarams.length})
            </button>
            <button
              className={`filter-btn ${filterCategory === 'god' ? 'active' : ''}`}
              onClick={() => setFilterCategory('god')}
            >
              Gods ({ashtottarams.filter(d => d.category === 'god').length})
            </button>
            <button
              className={`filter-btn ${filterCategory === 'goddess' ? 'active' : ''}`}
              onClick={() => setFilterCategory('goddess')}
            >
              Goddesses ({ashtottarams.filter(d => d.category === 'goddess').length})
            </button>
          </div>
        </div>

        <div className="ashtottaram-grid">
          {filteredAshtottarams.map((deity) => (
            <div
              key={deity.id}
              className="ashtottaram-card"
              onClick={() => handleDeityClick(deity.id)}
            >
              <div className="ashtottaram-card-image">
                <img src={deity.image} alt={deity.name} />
                <div className="ashtottaram-overlay">
                  <span className="view-names-btn">View 108 Names</span>
                </div>
              </div>
              <div className="ashtottaram-card-content">
                <h3>{deity.name}</h3>
                <p className="ashtottaram-card-title">{deity.title}</p>
                <p className="ashtottaram-card-desc">{deity.description}</p>
                <div className="ashtottaram-meta">
                  <span className="names-count">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    {deity.namesCount} Names
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAshtottarams.length === 0 && (
          <div className="no-results">
            <p>No Ashtottarams found in this category.</p>
          </div>
        )}

        <div className="ashtottaram-info-section">
          <h2>About Ashtottara Shatanamavali</h2>
          <div className="info-grid">
            <div className="info-card">
              <h3>🕉️ What is Ashtottaram?</h3>
              <p>
                Ashtottara means 108 in Sanskrit. Ashtottara Shatanamavali refers to 
                the collection of 108 sacred names of a deity. Each name glorifies a 
                specific attribute, form, or deed of the divine.
              </p>
            </div>
            <div className="info-card">
              <h3>🙏 Benefits of Chanting</h3>
              <p>
                Regular chanting of Ashtottaram removes obstacles, grants peace, 
                prosperity, and spiritual elevation. It purifies the mind and creates 
                a divine connection with the deity.
              </p>
            </div>
            <div className="info-card">
              <h3>📿 How to Chant</h3>
              <p>
                Sit in a clean place, light a lamp or incense, and chant each name with 
                "Om" prefix and "Namaha" suffix. Use a mala (rosary) to count 108 repetitions. 
                Chant with devotion and concentration.
              </p>
            </div>
            <div className="info-card">
              <h3>⭐ Significance of 108</h3>
              <p>
                108 is considered a sacred number in Hinduism. It represents the universe's 
                wholeness - 1 (God/Higher Truth), 0 (Completeness/Void), and 8 (Infinity/Eternity).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AshtottaramListPage;
