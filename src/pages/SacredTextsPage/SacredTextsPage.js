import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAshtottaramList } from '../../data/ashtottaram/ashtottaramData';
import './SacredTextsPage.css';

const SacredTextsPage = () => {
  const [activeTab, setActiveTab] = useState('stotrams'); // 'stotrams' or 'ashtotharams'
  const [stotramCategories, setStotramCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState('all');
  
  const navigate = useNavigate();
  const ashtottarams = getAshtottaramList();

  useEffect(() => {
    const fetchStotrams = async () => {
      try {
        const response = await fetch('/data/stotrams/english.json');
        if (!response.ok) throw new Error('Failed to fetch stotrams');
        
        const data = await response.json();
        
        // Group by category to find unique categories and their counts
        const categoryMap = new Map();
        data.forEach(item => {
          if (!categoryMap.has(item.category)) {
            categoryMap.set(item.category, 0);
          }
          categoryMap.set(item.category, categoryMap.get(item.category) + 1);
        });

        const uniqueCategories = Array.from(categoryMap.entries()).map(([name, count]) => ({
          name,
          count,
          slug: encodeURIComponent(name)
        }));

        setStotramCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching stotrams:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStotrams();
  }, []);

  const handleCategoryClick = (slug) => {
    navigate(`/adults/stotrams/${slug}`);
  };

  const handleDeityClick = (deityId) => {
    navigate(`/adults/ashtottaram/${deityId}`);
  };

  const filteredAshtottarams = filterCategory === 'all'
    ? ashtottarams
    : ashtottarams.filter(deity => deity.category === filterCategory);

  return (
    <div className="sacred-texts-page">
      <div className="sacred-hero">
        <div className="sacred-hero-content">
          <h1>Sacred Library</h1>
          <p className="sacred-subtitle">
            Explore a vast collection of ancient stotrams, mantras, and 108 sacred names
          </p>
        </div>
      </div>

      <main className="library-main">
        <div className="tabs-container">
          <button 
            className={`tab-btn ${activeTab === 'stotrams' ? 'active' : ''}`}
            onClick={() => setActiveTab('stotrams')}
          >
            Stotrams & Mantras
          </button>
          <button 
            className={`tab-btn ${activeTab === 'ashtotharams' ? 'active' : ''}`}
            onClick={() => setActiveTab('ashtotharams')}
          >
            Ashtotharams (108 Names)
          </button>
        </div>

        {activeTab === 'stotrams' && (
          <div className="tab-content stotrams-content">
            {loading ? (
              <div className="library-loading">
                <div className="spinner"></div>
                <p>Loading the sacred texts...</p>
              </div>
            ) : (
              <div className="categories-grid">
                {stotramCategories.map((category) => (
                  <div 
                    key={category.name} 
                    className="category-card"
                    onClick={() => handleCategoryClick(category.slug)}
                  >
                    <div className="category-icon">
                      <span className="material-icons">menu_book</span>
                    </div>
                    <div className="category-content">
                      <h3>{category.name}</h3>
                      <span className="stotram-count">{category.count} Stotrams</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'ashtotharams' && (
          <div className="tab-content ashtotharams-content">
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
                        <span className="material-icons" style={{ fontSize: '1rem', marginRight: '4px' }}>list</span>
                        {deity.namesCount} Names
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredAshtottarams.length === 0 && (
              <div className="no-results">
                <p>No Ashtotharams found in this category.</p>
              </div>
            )}

            <div className="ashtottaram-info-section">
              <h2>About Ashtottara Shatanamavali</h2>
              <div className="info-grid">
                <div className="info-card">
                  <h3>🕉️ What is Ashtotharam?</h3>
                  <p>
                    Ashtottara means 108 in Sanskrit. Ashtottara Shatanamavali refers to 
                    the collection of 108 sacred names of a deity. Each name glorifies a 
                    specific attribute, form, or deed of the divine.
                  </p>
                </div>
                <div className="info-card">
                  <h3>🙏 Benefits of Chanting</h3>
                  <p>
                    Regular chanting of Ashtotharam removes obstacles, grants peace, 
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
        )}
      </main>
    </div>
  );
};

export default SacredTextsPage;
