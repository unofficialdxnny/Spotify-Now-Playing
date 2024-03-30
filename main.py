from dotenv import load_dotenv
import os
import requests
import json
import pprint

# coloured json
def colorize_json(json_data, indent=4):
    def color(text, color_code):
        return f"\033[{color_code}m{text}\033[0m"  # ANSI escape code

    data = json.loads(json_data)
    formatted = json.dumps(data, indent=indent)

    lines = formatted.splitlines()
    colorized = []
    for line in lines:
        if line.strip().startswith('{'):
            colorized.append(color(line, 94))  # Blue for objects
        elif line.strip().startswith('['):
            colorized.append(color(line, 92))  # Green for arrays
        elif line.strip().startswith('"'):
            colorized.append(color(line, 93))  # Yellow for keys
        else:
            colorized.append(color(line, 91))  # Light red for values

    return '\n'.join(colorized)


load_dotenv()

user_id = os.getenv("USER_ID")

# print(user_id)

url = f"https://api.lanyard.rest/v1/users/{user_id}"
response = requests.get(url)

response_data = response.json()


# print(colorize_json(json.dumps(response_data)))

spotify_data = response_data['data']['spotify']
album_art_url = spotify_data['album_art_url']
artist_names = spotify_data['artist'] 
song_name = spotify_data['song']

print("Album Art URL:", album_art_url)
print("Artist(s):", artist_names)
print("Song Name:", song_name)