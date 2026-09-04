import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Search from '../Search/Search';
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
        <NavLink to="/">Divine Path</NavLink>
      </div>

      <ul className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
        <li>
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active-link' : '')}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/gods" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            Gods Gallery
          </NavLink>
        </li>
        <li>
          <NavLink to="/library" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            Literature
          </NavLink>
        </li>
        <li>
          <NavLink to="/sacred-texts" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            Sacred Texts
          </NavLink>
        </li>
        <li>
          <NavLink to="/calendar" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            Calendar
          </NavLink>
        </li>
        <li>
          <NavLink to="/pujas" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            Pujas
          </NavLink>
        </li>
        <li>
          <NavLink to="/virtual-shrine" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            🪔 Mandir
          </NavLink>
        </li>
        <li>
          <NavLink to="/japa-mala" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            📿 Japa Mala
          </NavLink>
        </li>
      </ul>

      <div className="navbar-actions">
        {/* Global Omnibar Search */}
        <Search />

        <NavLink 
          to="/kids"
          className="switch-zone-nav-btn"
          aria-label="Switch to Kids Zone"
          style={{ textDecoration: 'none' }}
        >
          🎈 Kids
        </NavLink>

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

      {/* Overlay for mobile menu */}
      {isMenuOpen && <div className="navbar-overlay" onClick={() => setIsMenuOpen(false)} />}
    </nav>
  );
};

export default Navbar;