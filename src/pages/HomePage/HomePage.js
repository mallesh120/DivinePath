import React from 'react';
import ShlokaOfTheDay from '../../components/ShlokaOfTheDay/ShlokaOfTheDay';
import StoryOfTheDay from '../../components/StoryOfTheDay/StoryOfTheDay';
import DailyHoroscope from '../../components/DailyHoroscope/DailyHoroscope';
import DevotionalAudio from '../../components/DevotionalAudio/DevotionalAudio';
import GradientHeader from '../../components/ui/GradientHeader/GradientHeader';
import SpiritualCard from '../../components/ui/SpiritualCard/SpiritualCard';
import styles from './HomePage.module.css';

const HomePage = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className={styles.homePage}>
      <GradientHeader 
        title="🕉️ Daily Devotional"
        subtitle="Your spiritual companion for daily wisdom, guidance, and devotion"
        date={currentDate}
      />

      <div className={styles.devotionalContainer}>
        {/* Shloka of the Day */}
        <section className={styles.devotionalSection}>
          <ShlokaOfTheDay />
        </section>

        {/* Story of the Day */}
        <section className={styles.devotionalSection}>
          <StoryOfTheDay />
        </section>

        {/* Daily Horoscope */}
        <section className={styles.devotionalSection}>
          <DailyHoroscope />
        </section>

        {/* Devotional Audio */}
        <section className={styles.devotionalSection}>
          <DevotionalAudio />
        </section>

        {/* Daily Practice Tips */}
        <section className={styles.devotionalSection}>
          <div className={styles.practiceTipsWidget}>
            <h2 className={styles.tipsTitle}>✨ Daily Spiritual Practices</h2>
            <div className={styles.tipsGrid}>
              <SpiritualCard>
                <span className={styles.tipIcon}>🌅</span>
                <h3 className={styles.tipTitle}>Morning</h3>
                <ul className={styles.tipList}>
                  <li>Wake up during Brahma Muhurta</li>
                  <li>Practice gratitude meditation</li>
                  <li>Chant your chosen mantra</li>
                  <li>Read today's shloka</li>
                </ul>
              </SpiritualCard>
              <SpiritualCard>
                <span className={styles.tipIcon}>☀️</span>
                <h3 className={styles.tipTitle}>Daytime</h3>
                <ul className={styles.tipList}>
                  <li>Practice mindful breathing</li>
                  <li>Offer food before eating</li>
                  <li>Do good deeds selflessly</li>
                  <li>Maintain positive thoughts</li>
                </ul>
              </SpiritualCard>
              <SpiritualCard>
                <span className={styles.tipIcon}>🌙</span>
                <h3 className={styles.tipTitle}>Evening</h3>
                <ul className={styles.tipList}>
                  <li>Light a lamp (diya)</li>
                  <li>Evening prayers and aarti</li>
                  <li>Reflect on the day's learnings</li>
                  <li>Practice forgiveness</li>
                </ul>
              </SpiritualCard>
              <SpiritualCard>
                <span className={styles.tipIcon}>🌃</span>
                <h3 className={styles.tipTitle}>Night</h3>
                <ul className={styles.tipList}>
                  <li>Peaceful meditation</li>
                  <li>Read sacred texts</li>
                  <li>Practice gratitude journaling</li>
                  <li>Sleep with positive affirmations</li>
                </ul>
              </SpiritualCard>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;