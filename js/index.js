// --------------------- Game logic  ---------------------

/*
Randomises the button sequence and sets the interval for the gameturn
*/
function play() {
    win = false;
    playerOrder = [];
    flash = 0;
    intervalId = 0;
    turn = 1;
    turnCounter.innerHTML = 1;
    correctSelection = true;
    
    createAdditionalLevelTurns();

    compTurn = true; //Starts with computer sequence

    intervalId = setInterval(gameTurn, 800); //Runs gameturn function after set amount of time
}

function gameTurn() {
    playerTurn = false; //Player cannot interact while on=false

    if (flash == turn) { //If number of flashes=turncounter number then compturn is over
        clearInterval(intervalId);
        compTurn = false;
        clearColor();
        playerTurn = true; //Now player can interact with the game
    }

    if (compTurn) {
        clearColor();
        setTimeout(() => { //Performs this once after set amount of time
            if (order[flash] == 1) one();
            if (order[flash] == 2) two();
            if (order[flash] == 3) three();
            if (order[flash] == 4) four();
            flash++;
        }, 200)
    }
}

function buttonClickedEvent(btnFunction, orderNumber) {
    if (playerTurn) { // Player can click if
        playerOrder.push(orderNumber); // Clicking green will push 1 onto playerOrder array
        check(); // Check to see if player was correct
        btnFunction(); // Then run appropriate function
        if (!win) { // If player has not won yet, the colour will be cleared after set amount of time
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
}

function getLengthForLevel(){
    return level*turnLevelMultiplier;
}

function isMaxTurnReached() {
    // Logic for checking if the user reached the maximum number of turns for level 'x', where x --> infinity
    return playerOrder.length == getLengthForLevel();
}

function check() {
    // If the last colour a player clicked is not equal to the actual colour then they lose
    if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1]) 
        correctSelection = false;

    if (correctSelection && isMaxTurnReached()) {
        winGame(); //Parameters for winning the game for each level
    }

    // If player is incorrect, perform these actions
    if (correctSelection == false) { 
        loseGame();
    }

    //If player is correct, but has not yet won, perform these actions
    if (turn == playerOrder.length && correctSelection && !win) {
        nextTurn();
    }
}

function loseGame() {
    flashColor();
    turnCounter.innerHTML = "GAME OVER!";
    setTimeout(() => {
        turnCounter.innerHTML = turn;
        clearColor();
        play();
    }, 800);
    noise = false; //If player is incorrect, the sound will not play
}

function nextTurn() {
    turn++;
    playerOrder = [];
    compTurn = true;
    flash = 0;
    turnCounter.innerHTML = turn;
    intervalId = setInterval(gameTurn, 800);
}

function winGame() {
    flashColor();
    turnCounter.innerHTML = "WINNER!";
    playerTurn = false;
    win = true;
    level++;
    document.getElementById('level-number').innerHTML = `Level ${level}`;
    alert(`Congratulations, you have completed level ${level-1}. Press Start to begin level ${level}.`);
}
