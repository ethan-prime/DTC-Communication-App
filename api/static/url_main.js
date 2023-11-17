const library = ["hello","you", "please", "thanks", "happy", "sad", "angry", "tired", "bathroom", "food", "drink", "music", "walk", "store", "computer", "yes", "no", "help", "i dont know",     "more", "stop", "go", "want", "don't want", "hurt", "okay", "not okay", "hungry", "thirsty", "cold", "hot", "good", "bad", "comfortable", "uncomfortable", "love", "outside", "inside", "sleep",    "morning", "night", "friend", "family", "work", "school", "quiet", "loud", "fast", "slow", "now", "later", "today", "tomorrow", "clothes", "shoes", "medicine", "allergy", "doctor", "emergency",    "feel", "hear", "see", "touch", "taste", "sorry", "wait", "watch", "listen", "read", "phone", "home", "away", "come", "stay", "leave", "up", "down", "big", "small", "finish", "start", "yes", "no","maybe", "never", "always", "sometimes", "", " "];
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
