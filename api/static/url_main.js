const library = ['hygiene', 'volleyball', 'boots', 'exchangeideas', 'desert', 'myturn', 'refusingservicescomplaintsgrievances', 'happy', 'watch', 'forearm', 'bowling', 'noneglectorseclusion', 'shoulder', 'clarinet', 'work', 'boat', 'goodbye', 'adequateandhumanecare', 'cube', 'newspaper', 'stop', 'donttouch', 'bassoon', 'piano', 'tongue', 'you', 'knee', 'train', 'sphere', 'nodiscrimination', 'maracas', 'wallet', 'hair', 'I', 'hat', 'mouth', 'tracksuit', 'book', 'please', 'askforhelp', 'panties', 'no', 'gray', 'stockings', 'gong', '', 'briefs', 'teeth', 'suit', 'leastrestrictiveenvironment', 'school', 'mail', 'getreadytogo', 'tambourine', 'park', 'oops', 'sad', 'store', 'taketurns', 'plane', 'outside', 'legalrights', 'frenchhorn', 'socialskills', 'tanktop', 'sensoryroom', 'toys', 'flute', 'arm', 'eyebrow', 'games', 'yellow', 'cymbals', 'cricket', 'jacket', 'bike', 'guilty', 'nose', 'bracelet', 'curious', 'dontwant', 'beanie', 'shy', 'skiing', 'shirt', 'pink', 'blue', 'lacrosse', 'embarrassed', 'cheek', 'backpack', 'snaredrum', 'cleanup', 'finger', 'hurt', 'badminton', 'timpani', 'music', 'doctor', 'library', 'goodmorning', 'idontknow', 'proud', 'confused', 'home', 'individualservice', 'circle', 'scarf', 'bowtie', 'craft', 'restaurant', 'moneyskills', 'field', 'chest', 'raincoat', 'finishyourwork', 'bassdrum', 'face', 'sunhat', 'black', 'earrings', 'scared', 'excited', 'relieved', 'tennis', 'overwhelmed', 'elbow', 'yes', 'jeans', 'noexploitation', 'bathroom', 'triangle', 'drink', 'hand', 'soccer', 'useagoodvoice', 'viola', 'socks', 'violin', 'bra', 'orange', 'moon', 'blouse', 'leg', 'moneyandbanking', 'tuba', 'angry', 'hockey', 'toe', 'lonely', 'ring', 'food', 'go', 'chin', 'nophone', 'coat', 'ear', 'swimming', 'help', 'green', 'boxing', 'clean', 'walk', 'want', 'shoes', 'tooth', 'mountain', 'shorts', 'lips', 'color', 'xylophone', 'excuseme', 'tree', 'movietheater', 'alldone', 'hello', 'lightgreen', 'moustache', 'cap', 'car', 'yourturn', 'baseball', 'bored', 'calm', 'thankyou', 'eye', 'flower', 'football', 'walkwithclass', 'personalproperty', 'sweater', 'vest', 'tired', 'foot', 'exercise', 'basketball', 'tie', 'worried', 'cyan', 'computer', 'oboe', 'sunglasses', 'necklace', 'keepyourworkareaclean', 'magazine', 'labor', 'thanks', 'star', 'guitar', 'harp', 'rest', 'pyramid', 'maybe', 'neck', 'nutrition', 'serviceprovider', 'armpit', 'ankle', 'more', 'brown', 'lightblue', 'noverbalabuse', 'cello', 'nosexualabuse', 'karate', 'pajamas', 'love', 'ocean', 'meetings', 'dress', 'swimsuit', 'lineup', 'heels', 'handkerchief', 'magenta', 'purse', 'cycling', 'golf', 'gototheendoftheline', 'pickleball', 'scooter', 'trumpet', 'tabletennis', 'square', 'white', 'beard', 'back', 'tshirt', 'confidentiality', 'doublebass', 'bag', 'skirt', 'red', 'purple', 'belt', 'nophysicalabuse', 'glasses', 'frustrated', 'impatient', 'trombone'];
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
    document.getElementById('url').innerHTML = "<a href='"+"/"+M+"+"+N+"+"+link+"'>Generate Board</a>"
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
