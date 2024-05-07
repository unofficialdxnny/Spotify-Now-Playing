const clientId = '1ca36fe2f4b345a8b7b54238868e2318';
const redirectUri = 'http://localhost:5500/SNP/callback.html';
const clientSecret = '7bf337a0dc774655a7bce821c7a847d1'

const trackInfoText = document.getElementById('track-info');

// Function to update track information
function updateTrackInfo(trackData) {
    const albumCover = document.getElementById('album-cover');
    const songName = document.getElementById('song-name');
    const artistName = document.getElementById('artist-name');
    
    albumCover.src = trackData.album.images[0].url;
    songName.textContent = trackData.name;
    artistName.textContent = trackData.artists[0].name;
}

// Function to update progress bar
function updateProgressBar(progress) {
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = `${progress * 100}%`;
}

// Function to fetch currently playing track
function fetchCurrentlyPlayingTrack(accessToken) {
    return fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    })
    .then(data => {
        updateTrackInfo(data.item);
        updateProgressBar(data.progress_ms / data.item.duration_ms);
    })
    .catch(error => {
        console.error('Error fetching currently playing track:', error);
        trackInfoText.textContent = "Error fetching currently playing track";
    });
}

// Function to authorize Spotify
function authorizeSpotify() {
    // Redirect user to Spotify authorization page
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=user-read-currently-playing`;
}

// Check if there's an access token in the URL (user just authenticated)
const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');

if (code) {
    // Exchange code for access token
    fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}&client_id=${clientId}&client_secret=${clientSecret}`
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    })
    .then(tokenData => {
        const accessToken = tokenData.access_token;
        // Fetch currently playing track using the access token
        return fetchCurrentlyPlayingTrack(accessToken);
    })
    .catch(error => {
        console.error('Failed to exchange code for access token:', error);
    });
}
