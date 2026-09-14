import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import useSoundEffects from '../../hooks/useSoundEffects';
import './KidsLayout.css';

const KidsLayout = () => {
  const location = useLocation();
  const { playClick } = useSoundEffects();

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
  };

  return (
    <div className="kids-layout">
      <header className="kids-header">
        <Link to="/kids/home" className="kids-logo" onClick={handleNavClick}>
          🌟 Divine Kids
        </Link>
        <Link to="/" className="switch-zone-btn" onClick={handleNavClick}>
          🌸 Return to Main
        </Link>
      </header>

      <main className="kids-main-content">
        <Outlet />
      </main>

      <nav className="kids-bottom-nav" aria-label="Kids Zone Navigation">
        <Link to="/kids/home" className={`nav-item ${isActive('/kids/home')}`} onClick={handleNavClick}>
          <div className="nav-icon">🏠</div>
          <span>Home</span>
        </Link>
        <Link to="/kids/stories" className={`nav-item ${isActive('/kids/stories')}`} onClick={handleNavClick}>
          <div className="nav-icon">📖</div>
          <span>Stories</span>
        </Link>
        <Link to="/kids/games" className={`nav-item ${isActive('/kids/games')}`} onClick={handleNavClick}>
          <div className="nav-icon">🎮</div>
          <span>Games</span>
        </Link>
        <Link to="/kids/chanting" className={`nav-item ${isActive('/kids/chanting')}`} onClick={handleNavClick}>
          <div className="nav-icon">🎵</div>
          <span>Chanting</span>
        </Link>
      </nav>
    </div>
  );
};

export default KidsLayout;
