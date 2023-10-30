from tqdm import tqdm 
import requests

API_KEY = ""

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

download_sounds(["hello", "I", "you", "please", "thanks", "happy", "sad", "angry", "tired", "bathroom", "food", "drink", "music", "walk", "store", "computer", "yes", "no", "help", "i dont know",     "more", "stop", "go", "want", "don't want", "hurt", "okay", "not okay", "hungry", "thirsty", "cold", "hot", "good", "bad", "comfortable", "uncomfortable", "love", "outside", "inside", "sleep",    "morning", "night", "friend", "family", "work", "school", "quiet", "loud", "fast", "slow", "now", "later", "today", "tomorrow", "clothes", "shoes", "medicine", "allergy", "doctor", "emergency",    "feel", "hear", "see", "touch", "taste", "sorry", "wait", "watch", "listen", "read", "phone", "home", "away", "come", "stay", "leave", "up", "down", "big", "small", "finish", "start", "yes", "no","maybe", "never", "always", "sometimes"])
