import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './StotramCategoryPage.css';

const StotramCategoryPage = () => {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState('');
  const [stotrams, setStotrams] = useState([]);
  const [filteredStotrams, setFilteredStotrams] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStotrams = async () => {
      try {
        const decodedName = decodeURIComponent(categorySlug);
        setCategoryName(decodedName);

        const response = await fetch('/data/stotrams/english.json');
        if (!response.ok) throw new Error('Failed to fetch stotrams');
        
        const data = await response.json();
        
        // Filter stotrams for this category
        const categoryStotrams = data.filter(item => item.category === decodedName);
        setStotrams(categoryStotrams);
        setFilteredStotrams(categoryStotrams);
      } catch (error) {
        console.error('Error fetching stotrams:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStotrams();
  }, [categorySlug]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    const filtered = stotrams.filter(stotram => 
      stotram.title.toLowerCase().includes(query)
    );
    setFilteredStotrams(filtered);
  };

  const handleStotramClick = (stotram) => {
    // We will navigate to the Universal Reader, passing the title as the ID
    // and passing the category so the reader knows where to fetch from
    navigate(`/adults/stotrams/read/${encodeURIComponent(stotram.title)}?category=${categorySlug}`);
  };

  return (
    <div className="stotram-category-page">
      <main className="category-main">
        <div className="category-header-wrapper">
          <Link to="/adults/stotrams" className="back-link">
            <span className="material-icons">arrow_back</span>
            Back to Library
          </Link>
          <header className="category-header">
            <h1>{categoryName}</h1>
            <p>{stotrams.length} Stotrams Available</p>
          </header>
        </div>

        <div className="search-container">
          <span className="material-icons search-icon">search</span>
          <input 
            type="text" 
            placeholder="Search stotrams..." 
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
        </div>

        {loading ? (
          <div className="library-loading">
            <div className="spinner"></div>
            <p>Loading {categoryName}...</p>
          </div>
        ) : (
          <div className="stotrams-list">
            {filteredStotrams.length > 0 ? (
              filteredStotrams.map((stotram, index) => (
                <div 
                  key={index} 
                  className="stotram-list-item"
                  onClick={() => handleStotramClick(stotram)}
                >
                  <div className="stotram-icon">
                    <span className="material-icons">auto_stories</span>
                  </div>
                  <div className="stotram-details">
                    <h3>{stotram.title}</h3>
                  </div>
                  <span className="material-icons read-icon">chevron_right</span>
                </div>
              ))
            ) : (
              <div className="no-results">
                <span className="material-icons">search_off</span>
                <p>No stotrams found matching "{searchQuery}"</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default StotramCategoryPage;
