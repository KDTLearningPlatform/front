import React, { useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleOAuth2Redirect = async () => {
      try {
        const response = await axiosInstance.get('/auth/oauth2/redirect');
        if (response.data.status === 'ok') {
          navigate('/profilecompletion');
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error handling OAuth2 redirect:', error);
        navigate('/login');
      }
    };

    handleOAuth2Redirect();
  }, [navigate]);

  return <div>Loading...</div>;
};

export default OAuth2RedirectHandler;
