const MemoCart = [
    { id: "banana", src: "./public/banane.png" },
    { id: "cheese", src: "./public/fromage.png" },
    { id: "apple", src: "./public/pomme.png" },
    { id: "milk", src: "./public/lait.png" },
    { id: "gold", src: "./public/lingot-dor.png" },
    { id: "money", src: "./public/argent.png" },
    { id: "orange", src: "./public/orange.png" },
    { id: "coconut", src: "./public/noix-de-coco.png" }
];

const TheMemoContainer = document.getElementById('theMemoContainer');
const newGameBtn = document.getElementById('newGameBtn');
let doubleCount = 0;
let LastE 
let timerInterval; 
let seconds = 0;   
let Wrong = 0;   
let TrueDub = 0;   
let Hscore = 0;



function formatTime(secs) {
    let minutes = Math.floor(secs / 60);
    let remainingSeconds = secs % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}


function startTimer() {
    clearInterval(timerInterval); 
    seconds = 0; 
    document.getElementById('timer').innerText = formatTime(seconds); 

    timerInterval = setInterval(() => {
        seconds++;
        document.getElementById('timer').innerText = formatTime(seconds);
    }, 1000);
}


function newG() {
    document.getElementById("Wrong").innerHTML = `
        <img id="1" class='WF' src="./public/wrong-false.svg" alt="wrong icon">
        <img id="2" class='WF' src="./public/wrong-false.svg" alt="wrong icon">
        <img id="3" class='WF' src="./public/wrong-false.svg" alt="wrong icon">
        <img id="4" class='WF' src="./public/wrong-false.svg" alt="wrong icon">
        <img id="5" class='WF' src="./public/wrong-false.svg" alt="wrong icon">
    `;

    startTimer(); 
    doubleCount = 0; 
    Wrong = 0; 
    TrueDub = 0;
    document.getElementById('Hscore').innerText=`highest score : ${Hscore}`

    let carts = MemoCart;
    let memo = [];
    let totalPairs = carts.length;
    let allNumbers = Array.from({ length: totalPairs * 2 }, (_, i) => i);
    allNumbers = allNumbers.sort(() => 0.5 - Math.random());

    const borderElement = document.getElementById('TheBorder');
    borderElement.classList.remove('theBorder');
    void borderElement.offsetWidth; 
    borderElement.classList.add('theBorder');

    carts.forEach(element => {
        if (memo.length >= totalPairs * 2) return;

        let number1 = allNumbers.pop();
        let number2 = allNumbers.pop();

        memo.push({ ...element, number: number1 });
        memo.push({ ...element, number: number2 });
    });
    memo.sort((a, b) => a.number - b.number);
    let MemoContainer = '';
    for (let i = 0; i < memo.length; i++) {
        MemoContainer += `<button type="button" class="OBtn" id="${memo[i].id+i}" onclick="cart(this)">
                            <img src="${memo[i].src}" alt="${memo[i].id}">
                            <span class="OBox"></span>
                          </button>`;
    }

    TheMemoContainer.innerHTML = MemoContainer; 
}


newGameBtn.addEventListener('click', newG);


function cart(e) {
    let span = e.querySelector('.OBox');
    let Wspan = e.querySelector('.OWrong');

    // Remove any existing feedback spans, if present
    if (span || Wspan) {
        e.removeChild(span || Wspan);
    }

    let buttonNew = e.innerHTML; // Store the current button's content

    if (doubleCount > 0) { // If this is the second click in a pair
        const lastOne = document.getElementById(LastE); // Get the last clicked button

        if (lastOne && lastOne.innerHTML === buttonNew) { // Check if they match
            TrueDub++; // Increment match count
            doubleCount = 0;

            // Disable click for both matched elements
            e.onclick = null;
            lastOne.onclick = null; // Properly disable lastOne click
            LastE = ""; // Reset the last clicked button ID
        } else {
            e.innerHTML = buttonNew + `<span class="OWrong"></span>`;
            lastOne.innerHTML += `<span class="OWrong"></span>`;

            Wrong++;


            document.getElementById(`${Wrong}`).src = "./public/wrong-true.svg";
            document.getElementById(`${Wrong}`).className = "WT";

            
            if (Wrong >= 5) {
                TrueDub = 0;
                newG();
            }

            e.onclick = () => cart(e); 
            lastOne.onclick = () => cart(lastOne);

            doubleCount = 0;
            LastE = ""; 

            return; 
        }
    } else {
        doubleCount = 1;
        e.onclick = null;
        LastE = e.getAttribute('id'); 
    }

    if (TrueDub === 8) {
        
        const TtoTrue = (seconds - 5) * (5 - Wrong);
        document.getElementById("score").innerText = `Last score: ${TtoTrue}`;

       
        if (Hscore < TtoTrue) {
            Hscore = TtoTrue;
        }

        newG(); 
    }
}