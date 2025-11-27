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
  
  // Get next 3 upcoming festivals
  const upcomingFestivals = getUpcomingFestivals(3);
  const festivalsToShow = upcomingFestivals.length > 0 
    ? upcomingFestivals 
    : sortFestivalsByDate(festivalsData).slice(0, 3);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="home-hero">
        <h1 className="home-title">🕉️ Welcome to Divine Path</h1>
        <p className="home-subtitle">
          Explore the sacred wisdom, festivals, and divine stories of Hinduism
        </p>
      </div>

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

      {/* Upcoming Festivals Section */}
      <div className="upcoming-festivals-section">
        <div className="section-header">
          <h2 className="section-title">📅 Upcoming Festivals</h2>
          <a href="/festivals" className="view-all-link">
            View All Festivals →
          </a>
        </div>
        <div className="upcoming-festivals-grid">
          {festivalsToShow.map(festival => (
            <FestivalCard key={festival.id} festival={festival} compact={true} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;