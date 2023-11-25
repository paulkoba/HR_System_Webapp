// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Navbar from './Navbar';


const Home = () => {
  return (
    <div>
        <Navbar/>
        <div className="home-container">
            <div className="content">
                <h1>Welcome to Dummy HR System</h1>
                <p>
                We are a dummy HR system designed for demonstration purposes.
                Explore our features and functionalities to see how it works.
                </p>

                <p>
                Connect with our Telegram bot for additional assistance:&nbsp;
                <a href="https://t.me/hr_system_23_bot" target="_blank" rel="noopener noreferrer">
                    @hr_system_23_bot
                </a>
                </p>
            </div>
        </div>
    </div>
  );
};

export default Home;
