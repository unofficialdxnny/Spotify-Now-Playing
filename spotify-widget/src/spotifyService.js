// src/spotifyService.js
import SpotifyWebApi from 'spotify-web-api-js';
import { clientId, redirectUri } from './config';

const spotifyApi = new SpotifyWebApi();
spotifyApi.setClientId(clientId);
spotifyApi.setRedirectURI(redirectUri);

export default spotifyApi;
