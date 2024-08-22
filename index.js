// Arrays to hold the sequence of colors for the game and the user's input
let gameSeq = [];
let userSeq = [];

// Array containing the colors used in the game
let btns = ["red", "yellow", "green", "purple"];

// Flags and counters for game state
let started = false;
let level = 0;

// Selecting the h2 element to display the current level
let h2 = document.querySelector('h2');

// Sound effect elements and functions to play sounds when events occur
let endSound = document.querySelector(".endSound");
let gameOverSound = function () {
    endSound.play();
}

let btnsSound = document.querySelector(".btnSound");
let btnSound = function () {
    btnsSound.play();
}

let sbtnSound = document.querySelector(".sbtnSound");
let startbtnSound = function () {
    sbtnSound.play();
}

// Start game button event listener
let startbtn = document.querySelector(".start");
startbtn.addEventListener("click", function () {
    // If the game hasn't started, start it
    if (started == false) {
        console.log("game is started");
        started = true;
        startbtn.innerText = "End";
        startbtn.style.backgroundColor = "red";
        levelUp();  // Start the first level
        startbtnSound(); // Play start sound
    } else {
        // If the game is already started, end it and reset
        startbtn.style.backgroundColor = "blue";
        startbtn.innerText = "Start";
        startbtnSound(); // Play start sound again
        reset(); // Reset game
    }
});

// Function to flash the game button (highlight briefly)
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 200);
}

// Function to flash the button that the user clicks
function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(() => {
        btn.classList.remove("userFlash");
    }, 200);
    btnSound(); // Play button sound
}

// Function to increase the game level and generate a new color in the sequence
function levelUp() {
    userSeq = [];  // Clear user's sequence for the new level
    level++;
    h2.innerText = `Level ${level}`;  // Display the current level

    // Randomly select a color from the array
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);  // Add the selected color to the game's sequence
    console.log(gameSeq);

    gameFlash(randBtn);  // Flash the selected button
}

// Variable to keep track of the highest level achieved
let currlevel = 0;

// Function to check the user's input against the game sequence
function checkAns(idx) {
    // If the user's input matches the corresponding color in the game sequence
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            // If the user has completed the sequence, level up after a delay
            setTimeout(() => levelUp(), 1000);
        }
    } else {
        // If the user's input does not match, the game is over
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br>Press Start Button To Start`;
        document.querySelector("body").style.backgroundColor = "red";
        startbtn.style.backgroundColor = "blue";

        gameOverSound();  // Play game over sound

        // Flash the background to indicate the game is over
        setTimeout(() => { document.querySelector("body").style.backgroundColor = "black"; }, 100);
        setTimeout(() => { document.querySelector("body").style.backgroundColor = "red"; }, 200);
        setTimeout(() => { document.querySelector("body").style.backgroundColor = "black"; }, 300);
        setTimeout(() => { document.querySelector("body").style.backgroundColor = "red"; }, 400);
        setTimeout(() => { document.querySelector("body").style.backgroundColor = "black"; }, 500);

        // Update and display the high score
        let highScore = document.querySelector('h1.highscore');
        if (currlevel >= level) {
            highScore.innerText = `Your High Score is ${currlevel}.`;
        } else {
            highScore.innerText = `Your High Score is ${level}.`;
            currlevel = level;
        }
        reset();  // Reset the game
    }
}

// Event listener for each game button to handle user input
function btnPress() {
    let btn = this;
    userFlash(btn);  // Flash the button when clicked
    let userColor = this.getAttribute("id");  // Get the ID of the clicked button
    console.log(userColor);
    userSeq.push(userColor);  // Add the user's choice to their sequence
    console.log(userSeq);

    checkAns(userSeq.length - 1);  // Check the user's input against the game sequence
}

// Attach the event listener to all buttons
let allBtns = document.querySelectorAll('.btn');
for (const btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

// Function to reset the game state
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    startbtn.innerText = "Start";
}
