import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import { clientId } from './config';

const Callback = () => {
  const history = useHistory();

  useEffect(() => {
    const { access_token } = queryString.parse(window.location.hash);
    if (access_token) {
      localStorage.setItem('spotifyAccessToken', access_token);
      history.push('/');
    } else {
      alert('Authentication failed. Please try again.');
    }
  }, [history]);

  return <div>Redirecting...</div>;
};

export default Callback;
