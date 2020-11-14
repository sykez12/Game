// --------------------- Noise helpers ---------------------

function playNoise(soundElementId) {
    if (noise) {
        let audio = document.getElementById(soundElementId);
        audio.play();
    }
    noise = true;
}

function one() {
    playNoise("sound1");
    green.style.backgroundColor = "lightgreen";
}

function two() {
    playNoise("sound2");
    red.style.backgroundColor = "tomato";
}

function three() {
    playNoise("sound3");
    yellow.style.backgroundColor = "yellow";
}

function four() {
    playNoise("sound4");
    blue.style.backgroundColor = "lightskyblue";
}

// --------------------- Color helpers ---------------------

function clearColor() {
    green.style.backgroundColor = "darkgreen";
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

// --------------------- Colour Event Listeners ---------------------


green.addEventListener('click', (event) => {
    buttonClickedEvent(one, 1);
})

red.addEventListener('click', (event) => {
    buttonClickedEvent(two, 2);
})

yellow.addEventListener('click', (event) => {
    buttonClickedEvent(three, 3);
})

blue.addEventListener('click', (event) => {
    buttonClickedEvent(four, 4);
})

//Button Event Listener
startButton.addEventListener('click', (event) => {
    clearInterval(intervalId);
    play();
});

// --------------------- Game logic helpers ---------------------

/*
Increase the number of orders by the number of turns per level = turnLevelMultiplier
Generate turnLevelMultiplier random numbers
Append them to order
 */
function createAdditionalLevelTurns() {
    for (var i = 0; i < turnLevelMultiplier; i++) {
        order.push(Math.floor(Math.random() * 4) + 1); // Randomizes a number between 1 and 4
    }
}