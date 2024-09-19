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
let double = [];
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
    double = []; 
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
        MemoContainer += `<button type="button" class="OBtn" data-id="${memo[i].id}" onclick="cart(this)">
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
    
    if (span || Wspan) {
        e.removeChild(span || Wspan);
    }

    let buttonId = e.getAttribute('data-id');

    if (double.length === 1) {
        if (double[0] === buttonId) {
            console.log("yes");
            TrueDub++;
            double = [];
        } else {
            console.log("no");
            e.innerHTML += `<span class="OWrong"></span>`;
            Wrong++;
            document.getElementById(`${Wrong}`).src = "./public/wrong-true.svg";
            document.getElementById(`${Wrong}`).className = "WT"
            if (Wrong >= 5) {
                TrueDub=0;
                newG();
            }
        }
    } else {
        double.push(buttonId);
        e.onclick = null; 
    }

    if (TrueDub===8) {
        const TtoTrue = seconds*(Wrong+1)
        document.getElementById("score").innerText=`last score : ${TtoTrue}`
        if(Hscore<TtoTrue){
            Hscore = TtoTrue
        }
        newG()
    }
}



