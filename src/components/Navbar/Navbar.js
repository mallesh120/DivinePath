import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';

/**
 * The Navbar component provides navigation links for the app.
 * It uses NavLink to automatically style the active link.
 * Includes a hamburger menu for mobile responsiveness.
 */
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const savedTheme = localStorage.getItem('divine_path_theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('divine_path_theme', newTheme);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.navbar')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main Navigation">
      <div className="navbar-brand">
        <NavLink to="/adults">Divine Path</NavLink>
      </div>
      
      <div className="navbar-actions">
        <button 
          className="switch-zone-nav-btn"
          onClick={() => {
            localStorage.setItem('preferredZone', 'kids');
            window.location.href = '/kids';
          }}
          aria-label="Switch to Kids Zone"
        >
          🎈 Kids
        </button>

        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
          title={`Switch to ${isDarkMode ? 'Light' : 'Dark'} Mode`}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>

        <button 
          className={`navbar-hamburger ${isMenuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>

      <ul className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
        <li>
          <NavLink to="/adults" end className={({ isActive }) => (isActive ? 'active-link' : '')}>
            Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/adults/gods" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            Gods Gallery
          </NavLink>
        </li>
        <li>
          <NavLink to="/adults/library" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            Literature
          </NavLink>
        </li>
        <li>
          <NavLink to="/adults/festivals" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            Festivals
          </NavLink>
        </li>
        <li>
          <NavLink to="/adults/calendar" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            Hindu Calendar
          </NavLink>
        </li>
        <li>
          <NavLink to="/adults/pujas" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            Puja Guide
          </NavLink>
        </li>
        <li>
          <NavLink to="/adults/ashtottaram" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            108 Names
          </NavLink>
        </li>

      </ul>

      {/* Overlay for mobile menu */}
      {isMenuOpen && <div className="navbar-overlay" onClick={() => setIsMenuOpen(false)} />}
    </nav>
  );
};

export default Navbar;