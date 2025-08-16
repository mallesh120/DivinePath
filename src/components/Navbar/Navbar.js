import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'; // <--- THIS LINE IS CRUCIAL

/**
 * The Navbar component provides navigation links for the app.
 * It uses NavLink to automatically style the active link.
 */
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <NavLink to="/">Divine Path</NavLink>
      </div>
      <ul className="navbar-links">
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : '')}>
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
      </ul>
    </nav>
  );
};

export default Navbar;