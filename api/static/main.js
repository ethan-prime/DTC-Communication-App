class Button {
    constructor(text, sound, sound_url, image_url) {
        this.text = text;
        this.sound = sound;
        this.sound_url = sound_url;
        this.image_url = image_url;
    }
}

const CONVERSION = {
    "idontknow": "i don't know",
    "dontwant": "don't want"
}

let page = 1;
let m, n, page_buttons;
const LAST_PAGE = 5;
let buttons = [];
//let starting_words = ["hello","I","you","please","thanks","happy","sad","angry","tired","bathroom","food","drink","music","walk","store","computer","yes","no","help","i dont know"]; 
let starting_words = ["hello","you", "please", "thanks", "happy", "sad", "angry", "tired", "bathroom", "food", "drink", "music", "walk", "store", "computer", "yes", "no", "help", "i dont know",     "more", "stop", "go", "want", "don't want", "hurt", "okay", "not okay", "hungry", "thirsty", "cold", "hot", "good", "bad", "comfortable", "uncomfortable", "love", "outside", "inside", "sleep",    "morning", "night", "friend", "family", "work", "school", "quiet", "loud", "fast", "slow", "now", "later", "today", "tomorrow", "clothes", "shoes", "medicine", "allergy", "doctor", "emergency",    "feel", "hear", "see", "touch", "taste", "sorry", "wait", "watch", "listen", "read", "phone", "home", "away", "come", "stay", "leave", "up", "down", "big", "small", "finish", "start", "yes", "no","maybe", "never", "always", "sometimes"]

function playSound(sound) {
    new Audio("static/audios/" + sound.toLowerCase() + ".mp3").play()
}

function createTable(m, n) {
    try {
        document.getElementById('board').remove();
    } catch {
        //pass
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

function addButtons(buttonList, m, n) {  //buttonList = ["hello", "yes", "no", etc...]
    for (let i = 0; i < buttonList.length && i < m*n; i++) {
        word = buttonList[i].toLowerCase().replaceAll(' ','').replaceAll(',','').replaceAll("'",'');
        if (word == "blank") {
            let btn = document.createElement("input");
            btn.setAttribute("type", "button");
            btn.setAttribute("class", "comm-btn");
            btn.setAttribute("id", "blank");
            btn.setAttribute("value","");
            row = Math.floor(i/n);
            col = i % n;
            // we assume that a button table has already been created !
            let elem = document.getElementById("item-"+row+"."+col);
            //console.log(elem);
            elem.appendChild(btn);
            continue;
        }
        let btn = document.createElement("input");
        btn.setAttribute("type", "button");
        btn.setAttribute("class", "comm-btn");
        btn.setAttribute("id", word);
        row = Math.floor(i/n);
        col = i % n;
        // we assume that a button table has already been created !
        let elem = document.getElementById("item-"+row+"."+col);
        //console.log(elem);
        let para = document.createElement('p');
        para.setAttribute("id", word+"-para");
        para.setAttribute("class", "buttonDesc")
        if(CONVERSION[word]) {
            para.innerHTML = CONVERSION[word];
        } else {
            para.innerHTML = word;
        }
        elem.appendChild(btn);
        elem.appendChild(para);
    }
    for (let i = 0; i < buttonList.length; i++) {
        //console.log(word);
        word = buttonList[i].toLowerCase().replaceAll(' ','').replaceAll(',','').replaceAll("'",'');
        try {
            document.getElementById(word).setAttribute("onmousedown", "playSound('"+word+"');");
        } catch {
            //console.log("Error connecting a button to a sound file.");
        }
    }
}

function addImages(words) {
    for (let i = 0; i < words.length; i++) {
        let word = words[i].toLowerCase().replaceAll(' ','').replaceAll(',','').replaceAll("'",'');
        if (word == "blank")
        {
            continue;
        }
        //console.log(word);
        try {
            document.getElementById(word).style.backgroundImage = `url(static/images/${word}.png)`;
            document.getElementById(word).style.backgroundPosition = "center";
        } catch {
            //console.log("Error connecting a button to an image file.");
        }   
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
    //console.log(link);
    link = link[link.length-1]
    console.log(link);
    m = link.split('+')[0];
    n = link.split('+')[1];
    if (m == null || m == 0 || n == null || n == 0) {
        m = 5;
        n = 5;
    }
    page_buttons = link.split('+').slice(2);
    console.log(page_buttons);
    page_buttons = page_buttons.map(x=>x.split('-'));
    console.log(page_buttons);
    createTable(m,n);
    if (page_buttons[0] == undefined) {
        addButtons(starting_words, m, n);
        addImages(starting_words);
    }
    addButtons(page_buttons[0],m,n);
    addImages(page_buttons[0]);
}

function pageBack() {
    if(page == 1) {
        page = LAST_PAGE;
    } else {
        page--;
    }
    if(page_buttons[page-1] == undefined || page_buttons[page-1] == null || page_buttons[page-1]) {
        m, n = parseInt(m), parseInt(n);
        createTable(m,n)
        addButtons(starting_words);
        addImages(starting_words);
    } else {
        document.getElementById('board').remove();
        m, n = parseInt(m), parseInt(n);
        createTable(m,n);
        console.log(page_buttons[page-1],m,n);
        addButtons(page_buttons[page-1],m,n);
        addImages(page_buttons[page-1]);
    }
}

function pageForward() {
    if(page == LAST_PAGE) {
        page = 1;
    } else {
        page++;
    }
    if(page_buttons[page-1] == undefined || page_buttons[page-1] == null) {
        m, n = parseInt(m), parseInt(n);
        createTable(m,n)
        addButtons(starting_words);
        addImages(starting_words);
    } else {
        document.getElementById('board').remove();
        m, n = parseInt(m), parseInt(n);
        createTable(m,n);
        console.log(page_buttons[page-1],m,n);
        addButtons(page_buttons[page-1],m,n);
        addImages(page_buttons[page-1]);
    }
}