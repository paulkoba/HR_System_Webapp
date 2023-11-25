import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './style.css'
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
const UserDetails = ({ }) => {
  const [user, setUser] = useState(null);
  const [manager, setManager] = useState(null);
  const { username } = useParams();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const user = await fetch(`http://127.0.0.1:8080/api/users/${username}`);
        const userData = await user.json();
        setUser(userData);

        const managerResponse = await fetch(`http://127.0.0.1:8080/api/member_id_to_telegram/${userData.MemberID}`);
        const managerData = await managerResponse.json();
        setManager(managerData);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [username]);

  return (
    <div>
      <Navbar/>
      <div className="user-details-container">
        <h1 className="title">User Details</h1>
        {(user && manager) ? (
          <div className="user-info">

            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={user.Name} readOnly />

            <label htmlFor="surname">Surname:</label>
            <input type="text" id="surname" value={user.Surname} readOnly />

            <label htmlFor="telegram">Telegram:</label>
            <input type="text" id="telegram" value={user.Telegram} readOnly />

            <label htmlFor="phone">Phone:</label>
            <input type="text" id="phone" value={user.Phone} readOnly />

            <label htmlFor="birthDate">Birth Date:</label>
            <input type="text" id="birthDate" value={user.BirthDate} readOnly />

            <label htmlFor="onboardingDate">Onboarding Date:</label>
            <input type="text" id="onboardingDate" value={user.OnboardingDate} readOnly />

            <label htmlFor="memberID">Member ID:</label>
            <input type="text" id="memberID" value={user.MemberID} readOnly />

            <label htmlFor="managerID">Manager:</label>
            <input type="text" id="managerID" value={manager.Telegram} readOnly />

            <label htmlFor="email">Email:</label>
            <input type="text" id="email" value={user.Email} readOnly />

            <div className="button-container">
              <Link to={`/users/`} className="view-details-button">
                <button className="back-button">
                  Back
                </button>
              </Link>
              <button className="edit-button">Edit</button>
            </div>
          </div>
        ) : (
          <p className="loading-message">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
