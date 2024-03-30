from flask import Flask, render_template, jsonify
import os
import requests
import json
from dotenv import load_dotenv

load_dotenv()
user_id = os.getenv("USER_ID")

url = f"https://api.lanyard.rest/v1/users/{user_id}"
response = requests.get(url)

response_data = response.json()

spotify_data = response_data['data']['spotify']
album_art_url = spotify_data['album_art_url']
artist_names = spotify_data['artist'] 
song_name = spotify_data['song']


app = Flask(__name__)

@app.route('/')
def index():
    url = f"https://api.lanyard.rest/v1/users/{user_id}"
    response = requests.get(url)
    response_data = response.json()

    if 'spotify' in response_data['data']:
        spotify_data = response_data['data']['spotify']
        album_art_url = spotify_data['album_art_url']
        artist_names = spotify_data['artist'] 
        song_name = spotify_data['song']
    else:
        # Handle 'no Spotify data' case 
        album_art_url = "placeholder.jpg"  
        artist_names = "No song playing"
        song_name = ""

    return render_template('index.html', album_art_url=album_art_url, artist_names=artist_names, song_name=song_name)

@app.route('/spotify-data')
def get_spotify_data():
    # ... (Same code to fetch/process Spotify data as above) ...  
    return jsonify({
        'album_art_url': album_art_url,
        'artist_names': artist_names,
        'song_name': song_name
    })

if __name__ == '__main__':
    app.run(debug=True)
