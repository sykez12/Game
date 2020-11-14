//Variables
var level = 1; // The level of the game the user is on
var order = []; // Keeps track of randomly generated computer light order
var playerOrder = []; // Order the player presses the lights in
var flash; // Number of flashes that have appeared in the game
var turn; // keeps track of which turn the user is on
var correctSelection; // Boolean: Has the player selected all the correct colours
var compTurn; // Boolean: Is it the computer's turn or the player's turn
var intervalId; //
var noise = true; //
var playerTurn = false; // A flag dictating whether the user can press the buttons or not
var win; // Has the player won the game yet
const turnLevelMultiplier = 3;
const turnCounter = document.getElementById("turn");
const green = document.getElementById("green");
const red = document.getElementById("red");
const yellow = document.getElementById("yellow");
const blue = document.getElementById("blue");
const startButton = document.getElementById("start");