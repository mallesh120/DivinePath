import React from 'react';
import ShlokaOfTheDay from '../../components/ShlokaOfTheDay/ShlokaOfTheDay';
import StoryOfTheDay from '../../components/StoryOfTheDay/StoryOfTheDay';
import DailyHoroscope from '../../components/DailyHoroscope/DailyHoroscope';
import DevotionalAudio from '../../components/DevotionalAudio/DevotionalAudio';
import './HomePage.css';

const HomePage = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="home-page">
      <div className="devotional-hero">
        <div className="hero-content">
          <h1 className="hero-title">🕉️ Daily Devotional</h1>
          <p className="hero-subtitle">
            Your spiritual companion for daily wisdom, guidance, and devotion
          </p>
          <p className="hero-date">{currentDate}</p>
        </div>
      </div>

      <div className="devotional-container">
        {/* Shloka of the Day */}
        <section className="devotional-section">
          <ShlokaOfTheDay />
        </section>

        {/* Story of the Day */}
        <section className="devotional-section">
          <StoryOfTheDay />
        </section>

        {/* Daily Horoscope */}
        <section className="devotional-section">
          <DailyHoroscope />
        </section>

        {/* Devotional Audio */}
        <section className="devotional-section">
          <DevotionalAudio />
        </section>

        {/* Daily Practice Tips */}
        <section className="devotional-section">
          <div className="practice-tips-widget">
            <h2 className="tips-title">✨ Daily Spiritual Practices</h2>
            <div className="tips-grid">
              <div className="tip-card">
                <span className="tip-icon">🌅</span>
                <h3 className="tip-title">Morning</h3>
                <ul className="tip-list">
                  <li>Wake up during Brahma Muhurta</li>
                  <li>Practice gratitude meditation</li>
                  <li>Chant your chosen mantra</li>
                  <li>Read today's shloka</li>
                </ul>
              </div>
              <div className="tip-card">
                <span className="tip-icon">☀️</span>
                <h3 className="tip-title">Daytime</h3>
                <ul className="tip-list">
                  <li>Practice mindful breathing</li>
                  <li>Offer food before eating</li>
                  <li>Do good deeds selflessly</li>
                  <li>Maintain positive thoughts</li>
                </ul>
              </div>
              <div className="tip-card">
                <span className="tip-icon">🌙</span>
                <h3 className="tip-title">Evening</h3>
                <ul className="tip-list">
                  <li>Light a lamp (diya)</li>
                  <li>Evening prayers and aarti</li>
                  <li>Reflect on the day's learnings</li>
                  <li>Practice forgiveness</li>
                </ul>
              </div>
              <div className="tip-card">
                <span className="tip-icon">🌃</span>
                <h3 className="tip-title">Night</h3>
                <ul className="tip-list">
                  <li>Peaceful meditation</li>
                  <li>Read sacred texts</li>
                  <li>Practice gratitude journaling</li>
                  <li>Sleep with positive affirmations</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;