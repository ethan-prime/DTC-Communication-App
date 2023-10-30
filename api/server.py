import requests
from tqdm import tqdm
from flask import Flask, send_file, request, render_template, redirect, url_for
import os

app = Flask(__name__)

API_KEY = ""

starting_words = ["hello","I","you","please","thanks","happy","sad","angry","tired","bathroom","food","drink","music","walk","store","computer","yes","no","help","i dont know"]

@app.route('/')
@app.route('/<m>+<n>')
def home(m=5,n=5):
    return render_template('main.html')

def download_sounds(words):
    for word in tqdm(words):
        body = {
            "text": word,
            "model_id": "eleven_multilingual_v2",
                "voice_settings": {
                "stability": 0.95,
                "similarity_boost": 0.85,
                "style": 0,
                "use_speaker_boost": "true"
            }
        };   
        headers = {
            "xi-api-key":API_KEY
        };
        r = requests.post("https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM",json=body,headers=headers)
        filename = word.replace(' ','').replace(',','').replace("'",'') + ".mp3"
        with open(f'static/audios/{filename}', "wb") as f:
            f.write(r.content)

if __name__ == '__main__':
    app.run()