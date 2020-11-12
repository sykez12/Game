//Variables
var level = 1;          //The level of the game the user is on
let order = [];         //Keeps track of randomly generated computer light order
let playerOrder = [];   //Order the player presses the lights in
let flash;              //Number of flashes that have appeared in the game
let turn;               //keeps track of which turn the user is on
let good;               //Boolean: Has the player selected all the correct colours
let compTurn;           //Boolean: Is it the computer's turn or the player's turn
let intervalId;         //
let noise = true;       //
let on = true;          //
let win;                //Has the player won the game yet

const turnCounter = document.getElementById("turn");
const green = document.getElementById("green");
const red = document.getElementById("red");
const yellow = document.getElementById("yellow");
const blue = document.getElementById("blue");
const startButton = document.getElementById("start");

//Button

startButton.addEventListener('click', (event) => {
    play();
});

function play() {
    win = false;
    order = [];
    playerOrder = [];
    flash = 0;
    intervalId = 0;
    turn = 1;
    turnCounter.innerHTML = 1;
    good = true;
    for (var i = 0; i < 20; i++) {
        order.push(Math.floor(Math.random() *4) +1);
    }
    compTurn = true;

    intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {
    on = false;

    if (flash == turn) {
        clearInterval(intervalId);
        compTurn = false;
        clearColor();
        on = true;
    }

    if (compTurn) {
        clearColor();
        setTimeout(() => {
            if (order[flash] == 1) one();
            if (order[flash] == 2) two();
            if (order[flash] == 3) three();
            if (order[flash] == 4) four();
            flash++;
        }, 200)
    }
}

function one() {
    if (noise) {
        let audio = document.getElementById("sound1");
        audio.play();
    }
    noise = true;
    green.style.backgroundColor = "lightgreen";
}

function two() {
    if (noise) {
        let audio = document.getElementById("sound2");
        audio.play();
    }
    noise = true;
    red.style.backgroundColor = "tomato";
}

function three() {
    if (noise) {
        let audio = document.getElementById("sound3");
        audio.play();
    }
    noise = true;
    yellow.style.backgroundColor = "yellow";
}

function four() {
    if (noise) {
        let audio = document.getElementById("sound4");
        audio.play();
    }
    noise = true;
    blue.style.backgroundColor = "lightskyblue";
}

function clearColor() {
    green.style.backgroundColor ="darkgreen";
    red.style.backgroundColor = "darkred";
    yellow.style.backgroundColor = "goldenrod";
    blue.style.backgroundColor = "darkblue";
}

function flashColor() {
  green.style.backgroundColor = "lightgreen";
  red.style.backgroundColor = "tomato";
  yellow.style.backgroundColor = "yellow";
  blue.style.backgroundColor = "lightskyblue";
}

green.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(1);
    check();
    one();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

red.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(2);
    check();
    two();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

yellow.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(3);
    check();
    three();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

blue.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(4);
    check();
    four();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

function check() {
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
    good = false;

  if ((playerOrder.length == 1 && good && level == 1) || (playerOrder.length == 3 && good && level == 2)) {
    winGame();
    }

  if (good == false) {
    flashColor();
    turnCounter.innerHTML = "GAME OVER!";
    setTimeout(() => {
      turnCounter.innerHTML = turn;
      clearColor();
      play();
    }, 800);

    noise = false;
  }

  if (turn == playerOrder.length && good && !win) {
    turn++;
    playerOrder = [];
    compTurn = true;
    flash = 0;
    turnCounter.innerHTML = turn;
    intervalId = setInterval(gameTurn, 800);
  }

}

function winGame() {
  flashColor();
  turnCounter.innerHTML = "WINNER!";
  on = false;
  win = true;
  level++
}