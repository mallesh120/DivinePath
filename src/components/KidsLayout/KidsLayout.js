import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import './KidsLayout.css';

const KidsLayout = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <div className="kids-layout">
      <div className="kids-header">
        <Link to="/kids/home" className="kids-logo">
          🌟 Divine Kids
        </Link>
        <Link to="/" className="switch-zone-btn" onClick={() => localStorage.removeItem('preferredZone')}>
          Switch to Adults
        </Link>
      </div>

      <div className="kids-main-content">
        <Outlet />
      </div>

      <nav className="kids-bottom-nav">
        <Link to="/kids/home" className={`nav-item ${isActive('/kids/home')}`}>
          <div className="nav-icon">🏠</div>
          <span>Home</span>
        </Link>
        <Link to="/kids/stories" className={`nav-item ${isActive('/kids/stories')}`}>
          <div className="nav-icon">📖</div>
          <span>Stories</span>
        </Link>
        <Link to="/kids/games" className={`nav-item ${isActive('/kids/games')}`}>
          <div className="nav-icon">🎮</div>
          <span>Games</span>
        </Link>
        <Link to="/kids/chanting" className={`nav-item ${isActive('/kids/chanting')}`}>
          <div className="nav-icon">🎵</div>
          <span>Chanting</span>
        </Link>
      </nav>
    </div>
  );
};

export default KidsLayout;
