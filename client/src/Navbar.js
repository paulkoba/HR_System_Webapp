// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './style.css'
import Helmet from 'react-helmet';
import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';
import { endpointsPrefix } from './Keys';
const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookie, setCookie, removeCookie] = useCookies(['authToken']);
  const [username, setUsername] = useState('');

  const initNavbarBoilerplate = async() => {
    console.log("Auth key:", cookie);
    

    if (!!cookie.authToken) {
      console.log("Logged in");
      const usernameResponse = await fetch(`${endpointsPrefix}/verify_creds/${cookie.authToken}`);
      const usernameData = await usernameResponse.json();
      setUsername(usernameData.Username.substr(1));
      setIsLoggedIn(true);
    } else {
      setUsername(null)
      setIsLoggedIn(false);
    }
  }

  useEffect(() => {
    initNavbarBoilerplate();
  }, [cookie]);

  const logoutButton = async () => {
    removeCookie('authToken', {path:'/'})
    window.location.reload()
  }

  return (
    <nav className="navbar">
      <Helmet>
        <meta http-equiv="Content-Security-Policy" content="frame-ancestors https://192.168.50.111 https://oauth.telegram.org/" />
      </Helmet>
      <Link to="/">Home</Link>
      <Link to="/users">Users</Link>
      <Link to="/tasks">Open issues</Link>
      {username && <Link to={`/users/${username}`}>Profile</Link> }

      {isLoggedIn ? <Link onClick={logoutButton}>Logout</Link> :
                     <Link to="/login">Login</Link>}
    </nav>
  );
};

export default Navbar;
