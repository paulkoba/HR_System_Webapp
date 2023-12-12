import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router-dom';

const AuthCallbackPage = () => {
  const [cookie, setCookie] = useCookies(['authToken']);

  const { auth_key } = useParams();
  const navigate = useNavigate();
  const goToMainPage = () => navigate('/');

  goToMainPage();
  useEffect(() => {
    if (cookie.authToken !== 'true') {
      // Set the authToken cookie with an expiration time (e.g., 1 day)
      setCookie('authToken', auth_key, { maxAge: 86400, path: '/' });
    }
    
    goToMainPage();
  }, [, setCookie]);


};

export default AuthCallbackPage;