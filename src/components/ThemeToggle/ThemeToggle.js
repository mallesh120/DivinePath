import React from 'react';
import useDarkMode from '../../hooks/useDarkMode';
import './ThemeToggle.css';

export default function ThemeToggle() {
  const [isDark, toggle] = useDarkMode();

  const handleKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <button
      className={`theme-toggle ${isDark ? 'dark' : 'light'}`}
      role="switch"
      aria-checked={isDark}
      onClick={toggle}
      onKeyDown={handleKey}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className="track" aria-hidden="true">
        <svg width="44" height="26" viewBox="0 0 44 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="track-svg">
          <rect x="1" y="1" width="42" height="24" rx="12" fill="currentColor" />
        </svg>
      </span>
      <span className="thumb" aria-hidden="true">
        {isDark ? (
          /* Moon icon */
          <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="icon-moon">
            <path fill="currentColor" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
          </svg>
        ) : (
          /* Sun icon */
          <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="icon-sun">
            <path fill="currentColor" d="M6.76 4.84l-1.8-1.79L3.17 4.84l1.79 1.79 1.8-1.79zM1 13h3v-2H1v2zm10 9h2v-3h-2v3zm7.24-2.76l1.79 1.79 1.79-1.79-1.79-1.79-1.79 1.79zM20 13h3v-2h-3v2zM12 7a5 5 0 100 10 5 5 0 000-10zm0-5h-2v3h2V2zm-6.24 3.76L4 4.97 2.21 6.76l1.79 1.79 1.76-1.79zM17.24 19.24l1.76 1.79 1.79-1.79-1.79-1.79-1.76 1.79z"/>
          </svg>
        )}
      </span>
    </button>
  );
}
