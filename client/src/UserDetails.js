import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './style.css'
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { endpointsPrefix } from './Keys';
import { useCookies } from 'react-cookie';

const UserDetails = ({ }) => {
  const [user, setUser] = useState(null);
  const [manager, setManager] = useState(null);
  const { username } = useParams();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookie, setCookie, removeCookie] = useCookies(['authToken']);
  const [loggedInUsername, setLoggedInUsername] = useState('');

  const [isEditing, setIsEditing] = useState(false)

  const initNavbarBoilerplate = async() => {
    console.log("Auth key:", cookie);
    

    if (!!cookie.authToken) {
      console.log("Logged in");
      const usernameResponse = await fetch(`${endpointsPrefix}/verify_creds/${cookie.authToken}`);
      const usernameData = await usernameResponse.json();
      setLoggedInUsername(usernameData.Username.substr(1));
      setIsLoggedIn(true);
    } else {
      setLoggedInUsername(null)
      setIsLoggedIn(false);
    }
  }
  
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const user = await fetch(`${endpointsPrefix}/users/${username}`);
        const userData = await user.json();
        setUser(userData);

        const managerResponse = await fetch(`${endpointsPrefix}/member_id_to_telegram/${userData.MemberID}`);
        const managerData = await managerResponse.json();
        setManager(managerData);

        initNavbarBoilerplate();
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [username]);

  const setEditable = async() => {
    console.log("Editing");
    const inputs = document.querySelectorAll('input[readOnly]');
    inputs.forEach(input => {
      if(input.id !== 'telegram' && input.id !== 'memberID' && input.id !== 'managerID') {
        input.removeAttribute('readOnly');
      }
    });
    setIsEditing(true);
  }

  const saveEdited = async() => {
    console.log("Saving changes");
    try {
      const data = {
        name: document.getElementById('name').value,
        surname: document.getElementById('surname').value,
        telegram: document.getElementById('telegram').value,
        phone: document.getElementById('phone').value,
        birthDate: document.getElementById('birthDate').value,
        onboardingDate: document.getElementById('onboardingDate').value,
        email: document.getElementById('email').value,
      };

      const response = await fetch(`${endpointsPrefix}/edit_user/${data.telegram}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: cookie.authToken
        },
        body: JSON.stringify(data),
      })

      window.location.reload()
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  }

  return (
    <div>
      <Navbar/>
      <div className="user-details-container">
        <h1 className="title">User Details</h1>
        {(user && manager) ? (
          <div className="user-info">

            <label htmlFor="name">Name:</label>
            <input type="text" id="name" defaultValue={user.Name} readOnly />

            <label htmlFor="surname">Surname:</label>
            <input type="text" id="surname" defaultValue={user.Surname} readOnly />

            <label htmlFor="telegram">Telegram:</label>
            <input type="text" id="telegram" defaultValue={user.Telegram} readOnly />

            <label htmlFor="phone">Phone:</label>
            <input type="text" id="phone" defaultValue={user.Phone} readOnly />

            <label htmlFor="birthDate">Birth Date:</label>
            <input type="text" id="birthDate" defaultValue={user.BirthDate} readOnly />

            <label htmlFor="onboardingDate">Onboarding Date:</label>
            <input type="text" id="onboardingDate" defaultValue={user.OnboardingDate} readOnly />

            <label htmlFor="memberID">Member ID:</label>
            <input type="text" id="memberID" defaultValue={user.MemberID} readOnly />

            <label htmlFor="managerID">Manager:</label>
            <input type="text" id="managerID" defaultValue={manager.Telegram} readOnly />

            <label htmlFor="email">Email:</label>
            <input type="text" id="email" defaultValue={user.Email} readOnly />

            {!isEditing ? <div className="button-container">
              <Link to={`/users/`} className="view-details-button">
                <button className="back-button">
                  Back
                </button>
              </Link>
              {isLoggedIn && username == loggedInUsername ? 
                <button className="edit-button" onClick={setEditable}>
                  Edit
                </button> : <></>}
            </div> : <div className="button-container">
            <Link to={`/users/`} className="view-details-button"><button className="back-button">
                  Back
                </button>
                </Link>
                <button className="edit-button" onClick={saveEdited}>
                  Save
                </button>
            </div>}
          </div>
        ) : (
          <p className="loading-message">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
