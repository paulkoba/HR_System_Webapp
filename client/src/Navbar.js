// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './style.css'
import Helmet from 'react-helmet';


const Navbar = () => {
  return (
    <nav className="navbar">
      <Helmet>
        <meta http-equiv="Content-Security-Policy" content="frame-ancestors https://192.168.50.111 https://oauth.telegram.org/" />
      </Helmet>
      <Link to="/">Home</Link>
      <Link to="/users">Users</Link>
      <Link to="/tasks">Open issues</Link>
    </nav>
  );
};

export default Navbar;
