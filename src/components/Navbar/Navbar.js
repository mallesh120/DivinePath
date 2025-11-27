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
        <li>
          <NavLink to="/festivals" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            Festivals
          </NavLink>
        </li>
        <li>
          <NavLink to="/pujas" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            Puja Guide
          </NavLink>
        </li>
        <li>
          <NavLink to="/ashtottaram" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            108 Names
          </NavLink>
        </li>
        <li>
          <NavLink to="/panchangam" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            Panchangam
          </NavLink>
        </li>
        <li>
          <NavLink to="/devotional" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            Daily Devotional
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;