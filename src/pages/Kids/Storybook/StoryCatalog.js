import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { kidsStories } from '../../../data/kids/stories';
import useSoundEffects from '../../../hooks/useSoundEffects';
import KidsPageTransition from '../../../components/KidsLayout/KidsPageTransition';
import './StoryCatalog.css';

const CATEGORIES = ['All Stories', 'Gods & Heroes', 'Festivals', 'Moral Fables'];

const StoryCatalog = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Stories');
  const { playClick } = useSoundEffects();

  const filteredStories = selectedCategory === 'All Stories'
    ? kidsStories
    : kidsStories.filter(story => story.category === selectedCategory);

  const handleCategoryChange = (cat) => {
    try {
      playClick();
    } catch (e) {}
    setSelectedCategory(cat);
  };

  return (
    <KidsPageTransition>
      <div className="story-catalog-container">
        <div className="catalog-header">
          <div className="catalog-header-text">
            <h2>📚 Magical Storybooks</h2>
            <p>Pick a story to read, listen, and tap playful animations!</p>
          </div>
          <div className="star-reward-pill">
            <span>⭐ Earn +1 Star per story!</span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="category-filters" role="tablist" aria-label="Story categories">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => handleCategoryChange(cat)}
              role="tab"
              aria-selected={selectedCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Stories Grid */}
        <div className="stories-grid">
          {filteredStories.map((story, index) => (
            <motion.div
              key={story.id}
              className="story-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <div className="story-card-cover">
                {story.illustration ? (
                  <img 
                    src={story.illustration} 
                    alt={story.title} 
                    className="story-cover-img"
                    loading="lazy"
                  />
                ) : (
                  <div className="story-cover-emoji-box">
                    <span className="cover-emoji-large">{story.coverEmoji}</span>
                  </div>
                )}
                <span className="story-category-tag">{story.category}</span>
                <span className="story-readtime-tag">⏱️ {story.readTime || '2 min'}</span>
              </div>

              <div className="story-card-body">
                <h3 className="story-card-title">{story.title}</h3>
                <p className="story-card-desc">{story.description}</p>

                <div className="story-card-footer">
                  <span className="story-pages-count">📄 {story.pages.length} Pages</span>
                  <Link 
                    to={`/kids/stories/${story.id}`} 
                    className="read-story-btn"
                    onClick={() => {
                      try { playClick(); } catch (e) {}
                    }}
                  >
                    Read Story ▶
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </KidsPageTransition>
  );
};

export default StoryCatalog;
