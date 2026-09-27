import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import useSoundEffects from '../../hooks/useSoundEffects';
import './KidsLayout.css';

const KidsLayout = () => {
  const location = useLocation();
  const { playClick } = useSoundEffects();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('divine_path_theme');
    if (saved) return saved === 'dark';
    const hour = new Date().getHours();
    return hour < 8 || hour >= 17;
  });

  useEffect(() => {
    const handleThemeEvent = (e) => {
      setIsDarkMode(e.detail === 'dark');
    };

    window.addEventListener('divineThemeChange', handleThemeEvent);
    return () => window.removeEventListener('divineThemeChange', handleThemeEvent);
  }, []);

  const toggleTheme = () => {
    const nextIsDark = !isDarkMode;
    const newTheme = nextIsDark ? 'dark' : 'light';
    setIsDarkMode(nextIsDark);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('divine_path_theme', newTheme);
    window.dispatchEvent(new CustomEvent('divineThemeChange', { detail: newTheme }));
  };

  const isActive = (path) => {
    if (path === '/kids/home') {
      return location.pathname === '/kids/home' || location.pathname === '/kids' || location.pathname === '/kids/' ? 'active' : '';
    }
    return location.pathname.startsWith(path) ? 'active' : '';
  };

  const handleNavClick = () => {
    try {
      playClick();
    } catch (e) {}
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="kids-layout">
      <header className="kids-header">
        <Link to="/kids/home" className="kids-logo" onClick={handleNavClick}>
          🌟 Divine Kids
        </Link>
        
        <nav className={`kids-top-nav ${isMenuOpen ? 'open' : ''}`} aria-label="Kids Zone Navigation">
          <Link to="/kids/home" className={`nav-item ${isActive('/kids/home')}`} onClick={handleNavClick}>
            <span className="nav-icon">🏠</span>
            <span>Home</span>
          </Link>
          <Link to="/kids/stories" className={`nav-item ${isActive('/kids/stories')}`} onClick={handleNavClick}>
            <span className="nav-icon">📖</span>
            <span>Stories</span>
          </Link>
          <Link to="/kids/games" className={`nav-item ${isActive('/kids/games')}`} onClick={handleNavClick}>
            <span className="nav-icon">🎮</span>
            <span>Games</span>
          </Link>
          <Link to="/kids/chanting" className={`nav-item ${isActive('/kids/chanting')}`} onClick={handleNavClick}>
            <span className="nav-icon">🎵</span>
            <span>Chanting</span>
          </Link>
        </nav>

        <div className="kids-header-actions">
          <Link to="/" className="switch-zone-btn" onClick={handleNavClick}>
            🌸 Main Site
          </Link>

          <button 
            className="theme-toggle kids-theme-toggle" 
            onClick={toggleTheme}
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            title={`Switch to ${isDarkMode ? 'Light' : 'Dark'} Mode`}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          <button 
            className={`kids-hamburger ${isMenuOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </header>

      {/* Overlay for mobile menu */}
      {isMenuOpen && <div className="kids-nav-overlay" onClick={() => setIsMenuOpen(false)} />}

      <main className="kids-main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default KidsLayout;
