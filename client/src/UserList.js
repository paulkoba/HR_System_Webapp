import React, { useState, useEffect } from 'react';
import './style.css'
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const UserList = ({ }) => {
  const [userList, setUserList] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8080/api/users/`);
        setUserList(await response.json());
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div>
      <Navbar/>
      <div className="user-list-container">
        <h1 className="title">User Details</h1>
        {userList ? (
          <div className="user-info">
            {userList.map((user) => (
              <div key={user.MemberID} className="user-item">
                <p className="user-name">{`${user.Name} ${user.Surname}`}</p>
                <p className="user-detail"><a href={`https://t.me/${user.Telegram.replace('@', '')}`} target="_blank" rel="noopener noreferrer">{user.Telegram}</a></p>
                <Link to={`/users/${user.Telegram.replace('@', '')}`} className="view-details-button">
                  <button className="view-details-button">View Details</button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="loading-message">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default UserList;
