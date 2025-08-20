import React, { useState } from 'react';
import './HomePage.css';

// 1. Import our data and card components
import { godsData } from '../../data/godsData';
import { literatureData } from '../../data/literature';
import GodCard from '../../components/GodCard/GodCard';
import LiteratureCard from '../../components/LitratureCard/LiteratureCard';
import Panchangam from '../../components/Panchangam/Panchangam';

// Helper function to get a random item from an array
const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const HomePage = () => {
  // 2. Use state to select a random god and story only once when the page loads
  const [featuredGod] = useState(getRandomItem(godsData));
  const [featuredStory] = useState(getRandomItem(literatureData));

  return (
    <div className="home-page">

      <Panchangam />

      {/* 3. Create the featured content section */}
      <div className="featured-section">
        <div className="featured-item">
          <h2 className="featured-title">Featured God</h2>
          <GodCard god={featuredGod} />
        </div>
        <div className="featured-item">
          <h2 className="featured-title">Featured Story</h2>
          <LiteratureCard story={featuredStory} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;