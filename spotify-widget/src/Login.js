// src/Login.js
import React from 'react';
import { clientId, redirectUri } from './config';

const Login = () => {
  const handleLogin = () => {
    const scopes = 'user-read-currently-playing';
    window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&show_dialog=true`;
  };

  return (
    <div>
      <h1>Spotify Now Playing Widget</h1>
      <button onClick={handleLogin}>Log in with Spotify</button>
    </div>
  );
};

export default Login;
