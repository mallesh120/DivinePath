import React from 'react';
import { shlokas } from '../../data/shlokasData'; 
import './ShlokaOfTheDay.css';

const ShlokaOfTheDay = () => {
  // Get the current day of the year (1-366)
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  // Use the day of the year to pick a shloka from the array
  // The modulo operator (%) ensures we loop back to the start if we run out of shlokas
  const shloka = shlokas[dayOfYear % shlokas.length];

  return (
    <div className="shloka-widget">
      <h2 className="shloka-title">Shloka of the Day</h2>
      <div className="shloka-content">
        <p className="sanskrit-text">{shloka.sanskrit}</p>
        <p className="transliteration-text">"{shloka.transliteration}"</p>
        <p className="meaning-text">{shloka.meaning}</p>
      </div>
    </div>
  );
};

export default ShlokaOfTheDay;