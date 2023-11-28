import requests
from tqdm import tqdm
from flask import Flask, send_file, request, render_template, redirect, url_for
import os

app = Flask(__name__)

API_KEY = "48dc104fc68372dff1b930db963ad4af"

starting_words = ['serviceprovider', 'guitar', 'star', 'harp', 'rest', 'maybe', 'pyramid', 'nutrition', 'karate', 'pajamas', 'love', 'ocean', 'meetings', 'more', 'brown', 'lightblue', 'cello', 'nosexualabuse', 'noverbalabuse', 'feel', 'oboe', 'sunglasses', 'necklace', 'tie', 'worried', 'computer', 'always', 'hot', 'cyan', 'magazine', 'labor', 'thanks', 'break', 'keepyourworkareaclean', 'now', 'doublebass', 'leave', 'thirsty', 'small', 'tshirt', 'wait', 'start', '', 'confidentiality', 'frustrated', 'impatient', 'trombone', 'skirt', 'bag', 'red', 'belt', 'purple', 'glasses', 'nophysicalabuse', 'magenta', 'heels', 'handkerchief', 'purse', 'cycling', 'pickleball', 'scooter', 'golf', 'gototheendoftheline', 'trumpet', 'fast', 'night', 'dress', 'swimsuit', 'lineup', 'white', 'bad', 'tabletennis', 'square', 'cold', 'nophone', 'uncomfortable', 'coat', 'swimming', 'ring', 'lonely', 'food', 'hungry', 'go', 'read', 'walk', 'want', 'shoes', 'help', 'tomorrow', 'green', 'notokay', 'boxing', 'clean', 'orange', 'moon', 'bra', 'blouse', 'comfortable', 'hockey', 'tuba', 'angry', 'moneyandbanking', 'bored', 'thankyou', 'calm', 'flower', 'car', 'yourturn', 'baseball', 'vest', 'tired', 'exercise', 'basketball', 'finish', 'walkwithclass', 'personalproperty', 'phone', 'football', 'sweater', 'come', 'xylophone', 'color', 'see', 'mountain', 'shorts', 'lightgreen', 'listen', 'cap', 'excuseme', 'movietheater', 'hear', 'tree', 'alldone', 'hello', 'shirt', 'down', 'pink', 'blue', 'lacrosse', 'okay', 'shy', 'skiing', 'hi', 'doctor', 'music', 'family', 'morning', 'library', 'proud', 'confused', 'goodmorning', 'idontknow', 'embarrassed', 'backpack', 'badminton', 'snaredrum', 'cleanup', 'hurt', '', 'timpani', 'cymbals', 'games', 'yellow', 'cricket', 'curious', 'dontwant', 'beanie', 'jacket', 'bike', 'bracelet', 'guilty', 'yes', 'tennis', 'overwhelmed', 'jeans', 'big', 'noexploitation', 'slow', 'bathroom', 'scared', 'relieved', 'excited', 'soccer', 'useagoodvoice', 'viola', 'triangle', 'drink', 'socks', 'violin', 'allergy', 'friend', 'scarf', 'bowtie', 'craft', 'restaurant', 'moneyskills', 'home', 'circle', 'individualservice', 'finishyourwork', 'bassdrum', 'sunhat', 'black', 'emergency', 'medicine', 'earrings', 'sorry', 'field', 'raincoat', 'away', 'you', 'newspaper', 'cube', 'adequateandhumanecare', 'donttouch', 'stop', 'bassoon', 'clothes', 'piano', 'i', 'taste', 'hat', 'tracksuit', 'book', 'train', 'nodiscrimination', 'sphere', 'maracas', 'wallet', 'myturn', 'refusingservicescomplaintsgrievances', 'happy', 'watch', 'today', 'hygiene', 'boots', 'exchangeideas', 'volleyball', 'desert', 'work', 'boat', 'goodbye', 'stay', 'quiet', 'noneglectorseclusion', 'bowling', 'good', 'clarinet', 'taketurns', 'plane', 'legalrights', 'frenchhorn', 'touch', 'outside', 'never', 'sad', 'store', 'sometimes', 'toys', 'flute', 'up', 'tanktop', 'sleep', 'socialskills', 'sensoryroom', 'later', 'gong', 'briefs', 'inside', 'please', 'askforhelp', 'gray', 'panties', 'loud', 'no', 'stockings', 'park', 'oops', 'suit', 'leastrestrictiveenvironment', 'mail', 'school', 'getreadytogo', 'tambourine'];

@app.route('/customize')
def customize():
    return render_template("url_main.html")

@app.route('/')
@app.route('/<url_params>')
def home(url_params=""):
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
        with open(f'{os.getcwd()}/static/audios/{filename}', "wb") as f:
            f.write(r.content)

if __name__ == '__main__':
    app.run()