// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './style.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/users">Users</Link>
      <Link to="/tasks">Open issues</Link>
      {/* Add more navigation links as needed */}
    </nav>
  );
};

export default Navbar;
