const clientId = '1ca36fe2f4b345a8b7b54238868e2318';
const redirectUri = 'http://localhost:5500/SNP/';
const clientSecret = '7bf337a0dc774655a7bce821c7a847d1'


const trackInfoText = document.getElementById('track-info');

// Function to authorize Spotify
function authorizeSpotify() {
    // Redirect user to Spotify authorization page
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=user-read-currently-playing`;
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
        const trackName = data.item.name;
        const artistName = data.item.artists[0].name;
        const trackInfo = `${trackName} by ${artistName}`;
        trackInfoText.textContent = trackInfo;
    })
    .catch(error => {
        console.error('Error fetching currently playing track:', error);
        trackInfoText.textContent = "Error fetching currently playing track";
    });
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
