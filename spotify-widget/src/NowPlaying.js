// src/NowPlaying.js
import React, { useState, useEffect } from 'react';
import spotifyApi from './spotifyService';

const NowPlaying = () => {
  const [nowPlaying, setNowPlaying] = useState(null);

  useEffect(() => {
    const getNowPlaying = async () => {
      try {
        const response = await spotifyApi.getMyCurrentPlaybackState();
        setNowPlaying(response.item);
      } catch (error) {
        console.error('Error fetching now playing:', error);
      }
    };

    getNowPlaying();
  }, []);

  return (
    <div>
      {nowPlaying ? (
        <div>
          <h2>Now Playing:</h2>
          <img src={nowPlaying.album.images[0].url} alt="Album Artwork" />
          <p>{nowPlaying.name} - {nowPlaying.artists[0].name}</p>
        </div>
      ) : (
        <p>No track currently playing</p>
      )}
    </div>
  );
};

export default NowPlaying;
