const library = ['serviceprovider', 'guitar', 'star', 'harp', 'rest', 'maybe', 'pyramid', 'nutrition', 'karate', 'pajamas', 'love', 'ocean', 'meetings', 'more', 'brown', 'lightblue', 'cello', 'nosexualabuse', 'noverbalabuse', 'feel', 'oboe', 'sunglasses', 'necklace', 'tie', 'worried', 'computer', 'always', 'hot', 'cyan', 'magazine', 'labor', 'thanks', 'break', 'keepyourworkareaclean', 'now', 'doublebass', 'leave', 'thirsty', 'small', 'tshirt', 'wait', 'start', '', 'confidentiality', 'frustrated', 'impatient', 'trombone', 'skirt', 'bag', 'red', 'belt', 'purple', 'glasses', 'nophysicalabuse', 'magenta', 'heels', 'handkerchief', 'purse', 'cycling', 'pickleball', 'scooter', 'golf', 'gototheendoftheline', 'trumpet', 'fast', 'night', 'dress', 'swimsuit', 'lineup', 'white', 'bad', 'tabletennis', 'square', 'cold', 'nophone', 'uncomfortable', 'coat', 'swimming', 'ring', 'lonely', 'food', 'hungry', 'go', 'read', 'walk', 'want', 'shoes', 'help', 'tomorrow', 'green', 'notokay', 'boxing', 'clean', 'orange', 'moon', 'bra', 'blouse', 'comfortable', 'hockey', 'tuba', 'angry', 'moneyandbanking', 'bored', 'thankyou', 'calm', 'flower', 'car', 'yourturn', 'baseball', 'vest', 'tired', 'exercise', 'basketball', 'finish', 'walkwithclass', 'personalproperty', 'phone', 'football', 'sweater', 'come', 'xylophone', 'color', 'see', 'mountain', 'shorts', 'lightgreen', 'listen', 'cap', 'excuseme', 'movietheater', 'hear', 'tree', 'alldone', 'hello', 'shirt', 'down', 'pink', 'blue', 'lacrosse', 'okay', 'shy', 'skiing', 'hi', 'doctor', 'music', 'family', 'morning', 'library', 'proud', 'confused', 'goodmorning', 'idontknow', 'embarrassed', 'backpack', 'badminton', 'snaredrum', 'cleanup', 'hurt', '', 'timpani', 'cymbals', 'games', 'yellow', 'cricket', 'curious', 'dontwant', 'beanie', 'jacket', 'bike', 'bracelet', 'guilty', 'yes', 'tennis', 'overwhelmed', 'jeans', 'big', 'noexploitation', 'slow', 'bathroom', 'scared', 'relieved', 'excited', 'soccer', 'useagoodvoice', 'viola', 'triangle', 'drink', 'socks', 'violin', 'allergy', 'friend', 'scarf', 'bowtie', 'craft', 'restaurant', 'moneyskills', 'home', 'circle', 'individualservice', 'finishyourwork', 'bassdrum', 'sunhat', 'black', 'emergency', 'medicine', 'earrings', 'sorry', 'field', 'raincoat', 'away', 'you', 'newspaper', 'cube', 'adequateandhumanecare', 'donttouch', 'stop', 'bassoon', 'clothes', 'piano', 'i', 'taste', 'hat', 'tracksuit', 'book', 'train', 'nodiscrimination', 'sphere', 'maracas', 'wallet', 'myturn', 'refusingservicescomplaintsgrievances', 'happy', 'watch', 'today', 'hygiene', 'boots', 'exchangeideas', 'volleyball', 'desert', 'work', 'boat', 'goodbye', 'stay', 'quiet', 'noneglectorseclusion', 'bowling', 'good', 'clarinet', 'taketurns', 'plane', 'legalrights', 'frenchhorn', 'touch', 'outside', 'never', 'sad', 'store', 'sometimes', 'toys', 'flute', 'up', 'tanktop', 'sleep', 'socialskills', 'sensoryroom', 'later', 'gong', 'briefs', 'inside', 'please', 'askforhelp', 'gray', 'panties', 'loud', 'no', 'stockings', 'park', 'oops', 'suit', 'leastrestrictiveenvironment', 'mail', 'school', 'getreadytogo', 'tambourine'];
const BASE_URL = "http://127.0.0.1:5000";
let M, N;

let LINK = "";
 
function addButtons(m,n) {
    for(let i = 0; i < m*n; i++) {
        let btn = document.createElement("input");
        btn.setAttribute("type", "button");
        btn.setAttribute("class", "add-btn");
        let row = Math.floor(i/n);
        let col = i % n;
        btn.setAttribute("id", "item-"+row+"."+col+"-button");
        btn.setAttribute("value", "+");
        btn.setAttribute("onclick", "updateButton('"+"item-"+row+"."+col+"-button"+"')");
        // we assume that a button table has already been created !
        let elem = document.getElementById("item-"+row+"."+col);
        //console.log(elem);
        elem.appendChild(btn);
    }
}

function updateButton(buttonId) {
    let button = document.getElementById(buttonId);
    let word = prompt("Type the word you want here:");
    word = word.toLowerCase().replaceAll(' ','').replaceAll(',','').replaceAll("'",'');
    console.log(word);
    let library_mapped = library.map((x) => x.toLowerCase().replaceAll(' ','').replaceAll(',','').replaceAll("'",''));
    console.log(library_mapped);
    if (!library_mapped.includes(word) && word != '' && word != ' ') {
        alert("Word not included in library. Try a new word.");
        return;
    }
    button.value = word;
    compileUrl();
}

function createTable(m, n) {
    try {
        document.getElementById('board').remove();
    } catch {
        // pass
    }
    let table = document.createElement("table");
    table.setAttribute('id','board');
    for(let i = 0; i < m; i++) {
        let tr = document.createElement("tr");
        tr.setAttribute("id", "row"+i);
        for(let j = 0; j < n; j++) {
            let td = document.createElement("td");
            td.setAttribute("id", "item-"+i+"."+j);
            td.setAttribute("class", "table-btn");
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    document.body.appendChild(table);
}

function compileUrl() {
    let blank_vals = ["blank", "+", " ", ""]
    let words = [];
    let link = "";
    for(let i = 0; i < M*N; i++) {
        let row = Math.floor(i/N);
        let col = i % N;
        let btn = document.getElementById("item-"+row+"."+col+"-button");
        if (blank_vals.includes(btn.value)) {
            words.push("blank");
        } else {
            words.push(btn.value);
        }
        console.log(words);
    }
    for(let j = 0; j < words.length; j++) {
        link = link + words[j] + "-";
    }
    link = link.slice(0, -1);
    console.log(BASE_URL+"/"+M+"+"+N+"+"+link);
    document.getElementById('url').innerHTML = "<a href='"+"/"+M+"+"+N+"+"+link+"'>Link Here</a>"
}

window.onload = () => {
    N = parseInt(prompt("Width of board:"));
    M = parseInt(prompt("Height of board:"));
    createTable(M,N);
    addButtons(M,N);
}

// add url encoder to actual project
// add multiple pages to url encoder
// add support to see library
// add rest of buttons
