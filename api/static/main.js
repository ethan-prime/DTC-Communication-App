class Button {
    constructor(text, sound, sound_url, image_url) {
        this.text = text;
        this.sound = sound;
        this.sound_url = sound_url;
        this.image_url = image_url;
    }
}

let buttons = [];
//let starting_words = ["hello","I","you","please","thanks","happy","sad","angry","tired","bathroom","food","drink","music","walk","store","computer","yes","no","help","i dont know"]; 
let starting_words = ["hello", "I", "you", "please", "thanks", "happy", "sad", "angry", "tired", "bathroom", "food", "drink", "music", "walk", "store", "computer", "yes", "no", "help", "i dont know",     "more", "stop", "go", "want", "don't want", "hurt", "okay", "not okay", "hungry", "thirsty", "cold", "hot", "good", "bad", "comfortable", "uncomfortable", "love", "outside", "inside", "sleep",    "morning", "night", "friend", "family", "work", "school", "quiet", "loud", "fast", "slow", "now", "later", "today", "tomorrow", "clothes", "shoes", "medicine", "allergy", "doctor", "emergency",    "feel", "hear", "see", "touch", "taste", "sorry", "wait", "watch", "listen", "read", "phone", "home", "away", "come", "stay", "leave", "up", "down", "big", "small", "finish", "start", "yes", "no","maybe", "never", "always", "sometimes"]

function playSound(sound) {
    new Audio("static/audios/" + sound.toLowerCase() + ".mp3").play()
}

function createTable(m, n) {
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

function addButtons(buttonList, m, n) {  //buttonList = ["hello", "yes", "no", etc...]
    for (let i = 0; i < buttonList.length && i < m*n; i++) {
        console.log(buttonList[i]);
        word = buttonList[i].toLowerCase().replaceAll(' ','').replaceAll(',','').replaceAll("'",'');
        let btn = document.createElement("input");
        btn.setAttribute("type", "button");
        btn.setAttribute("class", "comm-btn");
        btn.setAttribute("id", word);
        btn.setAttribute("value", buttonList[i]);
        row = Math.floor(i/n);
        col = i % n;
        // we assume that a button table has already been created !
        let elem = document.getElementById("item-"+row+"."+col);
        console.log(elem);
        elem.appendChild(btn);
    }
    for (let i = 0; i < buttonList.length; i++) {
        console.log(word);
        word = buttonList[i].toLowerCase().replaceAll(' ','').replaceAll(',','').replaceAll("'",'');
        document.getElementById(word).setAttribute("onclick", "playSound('"+word+"');");
    }
}

//let btns = document.getElementsByClassName('comm-btn');
//for(let i = 0; i < btns.length; i++) {
//   buttons.push(new Button(text=btns[i].id, sound=btns[i].id, image_url=btns[i].style.backgroundImage));
//   console.log(buttons)
//   btns[i].onclick = () => {playSound(btns[i].id)};
//   btns[i].value = btns[i].id;
//}

window.onload = () => {
    let link = window.location.href;
    link = link.split('/');
    console.log(link);
    link =  link[link.length-1]
    let m = link.split('+')[0];
    let n = link.split('+')[1];
    if (m == null || m == 0 || n == null || n == 0) {
        m = 5;
        n = 5;
    }
    createTable(m,n);
    addButtons(starting_words, m, n);
}
