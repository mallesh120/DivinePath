import React, { useState } from 'react';
import './HomePage.css';

// 1. Import our data and card components
import { godsData } from '../../data/godsData';
import { literatureData } from '../../data/literature';
import { getUpcomingFestivals, festivalsData, sortFestivalsByDate } from '../../data/festivalsData';
import GodCard from '../../components/GodCard/GodCard';
import LiteratureCard from '../../components/LitratureCard/LiteratureCard';
import FestivalCard from '../../components/FestivalCard/FestivalCard';

// Helper function to get a random item from an array
const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const HomePage = () => {
  // 2. Use state to select a random god, story, and next upcoming festival
  const [featuredGod] = useState(getRandomItem(godsData));
  const [featuredStory] = useState(getRandomItem(literatureData));
  const [featuredFestival] = useState(() => {
    const upcoming = getUpcomingFestivals(1);
    if (upcoming.length > 0) {
      return upcoming[0];
    }
    // If no upcoming festivals, get all festivals sorted by date and return first one
    const allSorted = sortFestivalsByDate(festivalsData);
    return allSorted[0];
  });

  return (
    <div className="home-page">

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
        <div className="featured-item featured-festival">
          <h2 className="featured-title">Upcoming Festival</h2>
          <FestivalCard festival={featuredFestival} compact={true} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;