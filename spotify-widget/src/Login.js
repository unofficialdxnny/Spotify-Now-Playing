// src/Login.js
import React from 'react';
import { clientId, redirectUri } from './config';

const Login = () => {
  const handleLogin = () => {
    const scopes = 'user-read-currently-playing';
    window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user-read-currently-playing&response_type=token&show_dialog=true`;
  };

  return (
    <div>
      <h1>Spotify Now Playing Widget</h1>
      <button onClick={handleLogin}>Log in with Spotify</button>
    </div>
  );
};

export default Login;


https://accounts.spotify.com/en/authorize?client_id=1ca36fe2f4b345a8b7b54238868e2318&response_type=code&redirect_uri=http%3A%2F%2Flocalhost:3000/callback&scope=user-read-currently-playing
https://accounts.spotify.com/en/authorize?client_id=<your_client_id>&response_type=code&redirect_uri=http%3A%2F%2Flocalhost:3000&scope=user-read-currently-playing
