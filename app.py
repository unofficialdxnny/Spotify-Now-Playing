from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
import os
import requests
import json

load_dotenv()

app = Flask(__name__)

def fetch_and_process_spotify_data(user_id):
    """Fetches, processes, and returns Spotify data for a given user ID."""
    url = f"https://api.lanyard.rest/v1/users/{user_id}"
    response = requests.get(url)

    if response.status_code == 200:
        response_data = response.json()
        if 'spotify' in response_data['data']:
            return {  # Return processed data directly
                'album_art_url': response_data['data']['spotify']['album_art_url'],
                'artist_names': response_data['data']['spotify']['artist'],
                'song_name': response_data['data']['spotify']['song']
            }

    # Handle all potential error cases with a single return
    return {  
        'album_art_url': "placeholder.jpg", 
        'artist_names': "No song playing",
        'song_name': ""
    }

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        user_id = request.form['user_id']
        spotify_data = fetch_and_process_spotify_data(user_id)
        return render_template('index.html', **spotify_data)

    return render_template('index.html')

@app.route('/spotify-data')
def get_spotify_data():
    user_id = request.args.get('user_id')  # Get user_id from query parameter
    if not user_id:
        return jsonify({'error': 'Missing user_id'}), 400  # Error handling

    spotify_data = fetch_and_process_spotify_data(user_id)
    return jsonify(spotify_data)

if __name__ == '__main__':
    app.run(debug=True)
