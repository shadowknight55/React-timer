import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/timer">Timer</Link></li>
        <li><Link to="/settings">Settings</Link></li>
        <li><Link to="/progress">Progress</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
