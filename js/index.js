//Variables

let level = 1;          //The level of the game the user is on
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



//Colour Event Listeners

green.addEventListener('click', (event) => {
  if (on) {                                             //Player can click if on=true
    playerOrder.push(1);                                //Clicking green will push 1 onto playerOrder array
    check();                                            //Check to see if player was correct
    one();                                              //Then run appropriate function
    if(!win) {                                          //If player has not won yet, the colour will be cleared after set amount of time
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



//Button Event Listener

startButton.addEventListener('click', (event) => {
    clearInterval(intervalId);
    play();
});



//Functions

function play() {
    win = false;
    order = [];
    playerOrder = [];
    flash = 0;
    intervalId = 0;
    turn = 1;
    turnCounter.innerHTML = 1;
    good = true;
    for (var i = 0; i < 15; i++) {
        order.push(Math.floor(Math.random() *4) +1);    //Randomizes a number between 1 and 4
    }

    compTurn = true;                                    //Starts with computer sequence

    intervalId = setInterval(gameTurn, 800);           //Runs gameturn function after set amount of time
}

function gameTurn() {
    on = false;                                         //Player cannot interact while on=false

    if (flash == turn) {                                //If number of flashes=turncounter number then compturn is over
        clearInterval(intervalId);
        compTurn = false;
        clearColor();
        on = true;                                      //Now player can interact with the game
    }

    if (compTurn) {
        clearColor();
        setTimeout(() => {                              //Performs this once after set amount of time
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

function check() {                                                          
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])    //If the last colour a player clicked is not equal to the actual colour then they lose
    good = false;

  if (good && ((playerOrder.length == 5 && level == 1) || (playerOrder.length == 10 && level == 2)  || (playerOrder.length == 15 && level == 3))) {
    winGame();                                          //Parameters for winning the game for each level
    }   

  if (good == false) {                                  //If player is incorrect, perform these actions
    flashColor();                               
    turnCounter.innerHTML = "GAME OVER!";
    setTimeout(() => {
      turnCounter.innerHTML = turn;
      clearColor();
      play();
    }, 800);

    noise = false;                                      //If player is incorrect, the sound will not play
  }

  if (turn == playerOrder.length && good && !win) {     //If player is correct, but has not yet won, perform these actions
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