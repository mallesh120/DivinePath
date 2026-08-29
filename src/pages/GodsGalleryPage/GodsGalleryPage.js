import React, { useState, useMemo } from 'react';
import { trimurtiData, godsData, godCategories, getGodsByCategory, searchGods } from '../../data/gods/godsData';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './GodsGalleryPage.css';

const GodsGalleryPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleGodClick = (godId) => {
    navigate(`/gods/${godId}`);
  };

  // Get Vishnu's avatars from trimurtiData
  const vishnu = trimurtiData.find(god => god.id === 'vishnu');
  const dashavatarPreview = vishnu?.avatars || [];

  // Filter and search gods for the explorer section
  const filteredGods = useMemo(() => {
    let gods = selectedCategory === 'all' 
      ? godsData 
      : getGodsByCategory(selectedCategory);

    if (searchQuery.trim()) {
      gods = gods.filter(god => searchGods(searchQuery).includes(god));
    }

    return gods;
  }, [selectedCategory, searchQuery]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
  };

  return (
    <div className="gallery-page" data-theme="dark">
      {/* Hero Section */}
      <motion.div 
        className="gallery-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="gallery-title">The Divine Pantheon</h1>
        <p className="gallery-subtitle">
          Explore the rich tapestry of Hindu deities — from the supreme Holy Trinity to the diverse gods of the cosmos.
        </p>
      </motion.div>

      {/* Trinity Section */}
      <motion.div 
        className="gallery-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="section-header">
          <h2 className="section-title">The Holy Trinity</h2>
          <p className="section-subtitle">
            The Trimurti — Representing the cosmic functions of creation, preservation, and destruction.
          </p>
        </div>

        <div className="trimurti-grid">
          {trimurtiData.map((god) => (
            <motion.div 
              key={god.id} 
              className="trimurti-card"
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              onClick={() => handleGodClick(god.id)}
            >
              <div className="trimurti-card-image-container">
                <img src={god.imageUrl} alt={god.name} className="trimurti-card-image" />
                <div className="trimurti-card-overlay">
                  <span className="view-details-text">View Details →</span>
                </div>
              </div>
              <div className="trimurti-card-content">
                <h2 className="trimurti-card-name">{god.name}</h2>
                <p className="trimurti-card-title">{god.title}</p>
                <div className="trimurti-card-role">{god.role}</div>
                <p className="trimurti-card-description">{god.description}</p>
                
                <div className="trimurti-card-stats">
                  {god.consort && (
                    <div className="stat-item">
                      <span className="stat-icon">✨</span>
                      <span className="stat-label">Consort:</span>
                      <span className="stat-value">{god.consort.name}</span>
                    </div>
                  )}
                  {god.avatars && god.avatars.length > 0 && (
                    <div className="stat-item">
                      <span className="stat-icon">🔄</span>
                      <span className="stat-label">Avatars:</span>
                      <span className="stat-value">{god.avatars.length}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Dashavatar Preview Section */}
      {dashavatarPreview.length > 0 && (
        <motion.div 
          className="gallery-section dashavatar-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <div className="section-header">
            <h2 className="section-title">The Dashavatar</h2>
            <p className="section-subtitle">The principal incarnations of Lord Vishnu.</p>
          </div>

          <div className="avatars-preview-grid">
            {dashavatarPreview.map((avatar, index) => (
              <motion.div 
                key={index} 
                className="avatar-preview-card"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                onClick={() => handleGodClick('vishnu')}
              >
                <div className="avatar-preview-image-container">
                  {avatar.imageUrl ? (
                    <img src={avatar.imageUrl} alt={avatar.name} className="avatar-preview-image" />
                  ) : (
                    <div className="avatar-placeholder">No Image</div>
                  )}
                  <div className="avatar-number">{avatar.order || index + 1}</div>
                </div>
                <div className="avatar-preview-info">
                  <h4 className="avatar-preview-name">{avatar.name}</h4>
                  <p className="avatar-preview-description">{avatar.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.button 
            className="view-all-avatars-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleGodClick('vishnu')}
          >
            View All 10 Avatars →
          </motion.button>
        </motion.div>
      )}

      {/* Unified Pantheon Explorer */}
      <motion.div 
        className="gallery-section explorer-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="section-header">
          <h2 className="section-title">Explore All Deities</h2>
          <p className="section-subtitle">Search and filter through the complete Hindu pantheon.</p>
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search gods by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>

        {/* Category Filters */}
        <div className="category-filters">
          {godCategories.map((category) => (
            <motion.button
              key={category.id}
              className={`category-pill ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </div>

        <div className="results-count">
          {filteredGods.length} {filteredGods.length === 1 ? 'deity' : 'deities'} found
        </div>

        {/* Dynamic Gods Grid */}
        <motion.div layout className="all-gods-grid">
          <AnimatePresence>
            {filteredGods.length > 0 ? (
              filteredGods.map((god) => (
                <motion.div
                  layout
                  key={god.id}
                  className="all-god-card"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover={{ y: -8, scale: 1.02 }}
                  onClick={() => handleGodClick(god.id)}
                >
                  <div className="all-god-image-container">
                    <img src={god.imageUrl} alt={god.name} className="all-god-image" />
                    <div className="god-card-gradient"></div>
                    {god.category && (
                      <div className="god-category-badge">{god.category}</div>
                    )}
                  </div>
                  <div className="all-god-content">
                    <h3 className="all-god-name">{god.name}</h3>
                    <p className="all-god-description">{god.description}</p>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                className="no-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="no-results-icon">✨</div>
                <h3>No deities found</h3>
                <p>Try adjusting your search or filter criteria.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default GodsGalleryPage;