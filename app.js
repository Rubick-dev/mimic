// ### Mimic Simon ###
const colourPickerButtons = document.querySelectorAll(".colour-button");
const countDisplay = document.querySelector('.count-display');
const startButton = document.querySelector('.start-button');
const onorOff = document.getElementById('gameOnorOff');
const gameModeHTML = document.getElementById('gameModeEasyorHard');
const redButton = document.getElementById('btn-red');
const blueButton = document.getElementById('btn-blue');
const greenButton = document.getElementById('btn-green');
const yellowButton = document.getElementById('btn-yellow');

var repeatCompTurn = false;
var playersTurnNow = false;
var gameDifficulty = 1;
// var gameArray = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]; // test array
var gameArray = [];
var playerArray = [];
var gameCounter = gameArray.length;
var timeouts = [];
var reset = false;



// Functions
// On button click by user, runs the game logic 
function playerClick(colour){
  console.log("registered " + colour + " click");
  let currentColour = colour.target.value;
  playerArray.push(currentColour);
  playSound(currentColour);
  playAnimation(currentColour);
  let check = playerArray.length - 1;
  if (gameArray[check] != playerArray[check]){
    console.log("true they are not equal");
    if (gameMode()) {
      console.log("Game is over as hard mode");
      location.reload();
    } else {
      repeatCompTurn = true;
      playerArray = [];
      for (let j = 0; j < colourPickerButtons.length; j++){
        colourPickerButtons[j].removeEventListener('click', playerClick, false);
        console.log(colourPickerButtons[j] + " removing the event listener")
        colourPickerButtons[j].disabled = true;
      }
      timeouts.push(setTimeout(function(){
        runComputersLogic(gameCounter);
      }, 2000));
      console.log("go again, game mode is easy");
    }
  } else {
    console.log("do a check to see if game and player array are the same length!");
    if (playerArray.length == gameArray.length) {
      repeatCompTurn = false;
      if (playerArray.length == 20) {
        console.log("YOU WIN");
        countDisplay.innerText = "**";
        winningSound();
      } else {
        for (let j = 0; j < colourPickerButtons.length; j++){
          colourPickerButtons[j].removeEventListener('click', playerClick, false);
          console.log(colourPickerButtons[j] + " removing the event listener")
          colourPickerButtons[j].disabled = true;
        }
        timeouts.push(setTimeout(function(){
        runComputersLogic(gameCounter);
        }, 2000));
      }
    }
  }
};


// Function to play the sound of the corrosponding squares
function playSound(val){
  switch (val){
    case "1":
      var audio1 = document.getElementById('audio-red');
      audio1.play();
      break;
    case '2':
      var audio2 = document.getElementById('audio-blue');
      audio2.play();
      break;
    case '3':
      var audio3 = document.getElementById('audio-green');
      audio3.play();
      break;
    case '4':
      var audio4 = document.getElementById('audio-yellow');
      audio4.play();
      break;
  }
};


//Play the animation for computer and human
function playAnimation(val) {
  if (val == "1"){
    document.querySelector('.red-colour-container .colour-div').style.transform = "scale(1)";
    redButton.disabled = true;  
    timeouts.push(setTimeout(function(){
      document.querySelector('.red-colour-container .colour-div').style.transform = "scale(.8)"; 
      playersTurnNow == true ? redButton.disabled = false : redButton.disabled = true;
    }, 600));
  } else if (val == "2") {
    document.querySelector('.blue-colour-container .colour-div').style.transform = "scale(1)";
    blueButton.disabled = true;
    timeouts.push(setTimeout(function(){
      document.querySelector('.blue-colour-container .colour-div').style.transform = "scale(.8)"; 
      playersTurnNow == true ? blueButton.disabled = false : blueButton.disabled = true;
    }, 600));
  } else if (val == "3"){
    document.querySelector('.green-colour-container .colour-div').style.transform = "scale(1)";
    greenButton.disabled = true;
    timeouts.push(setTimeout(function(){
      document.querySelector('.green-colour-container .colour-div').style.transform = "scale(.8)"; 
      playersTurnNow == true ? greenButton.disabled = false : greenButton.disabled = true;
    }, 600));
  } else if (val == "4"){
    document.querySelector('.yellow-colour-container .colour-div').style.transform = "scale(1)";
    yellowButton.disabled = true;
    timeouts.push(setTimeout(function(){
      document.querySelector('.yellow-colour-container .colour-div').style.transform = "scale(.8)"; 
      playersTurnNow == true ? yellowButton.disabled = false : yellowButton.disabled = true;
    }, 600));
  } 
};



function gameStatus(){
  if(onorOff.checked){
    console.log("box is now checked!");
    countDisplay.innerText = gameCounter;
    startButton.style.backgroundColor = "green";
    startButton.disabled = false;
  } else {
    console.log("box is now unchecked!");
    // countDisplay.innerText = "...";
    // startButton.style.backgroundColor = "rgb(248, 52, 52)";
    // startButton.disabled = true;
    // resetGame();
    location.reload();
  }
};


// determines the user defined game Diffculty and runs the correct logic on human error
function gameMode(){
  return gameDifficulty == 2 ? true : false;
};

function setGameMode(){
  if (gameModeHTML.checked) {
    gameDifficulty = 2;
    console.log(gameDifficulty == 2 ? "game is Hard" : "game is Easy");
  } else {
    gameDifficulty = 1;
    console.log( gameDifficulty == 2 ? "game is Hard" : "game is Easy");
  }
};


function startGameNow(){
  resetGame();
  timeouts.push(setTimeout(function(){
    reset = false;
    runComputersLogic(gameCounter);
    }, 2000));
};


// Computer takes turn
function runComputersLogic(count){
  if (reset) {
    console.log("reset fired in the top part of loop");
    return;
  }
  if (!repeatCompTurn) {
    gameArray.push(getRandomColour());
  } 
  gameCounter = gameArray.length;
  countDisplay.innerText = gameCounter;
  let x = 0;

  for (let j = 0; j < colourPickerButtons.length; j++){
    colourPickerButtons[j].removeEventListener('click', playerClick, false);
    console.log(colourPickerButtons[j] + this + " removing the event listener")
    colourPickerButtons[j].disabled = true;
  }

  (function theLoop (gameArray, x) {
    if (reset) {
      console.log("reset fired in the inner part of the loop");
      return;
    }
    timeouts.push(setTimeout(function (){
      let curSound = gameArray[x].toString();
      playSound(curSound);
      playAnimation(curSound);

      if (++x < gameCounter) {
        theLoop(gameArray, x);
      } else {
        console.log("your turn now player1");
        for (let j = 0; j < colourPickerButtons.length; j++){
          colourPickerButtons[j].addEventListener('click', playerClick, false);
          colourPickerButtons[j].disabled = false;
          playerArray = [];
          playersTurnNow = true;
          repeatCompTurn = false;
        }
      }
    }, 1000 - (gameCounter * 10)));
  })(gameArray, x);
};


function getRandomColour(){
  return Math.floor((Math.random() * 4) + 1);
};

function winningSound(){
    for (let i = 1; i < 5; i++){
      let iSound = i.toString();
    playSound(iSound);
  }

}

function resetGame(){
  winningSound();
  reset = true;
  for (let i = 0; i < timeouts.length; i++) {
    clearTimeout(timeouts[i]);
    clearInterval(timeouts[i]);
  timeouts = [];
  }
  repeatCompTurn = false;
  playersTurnNow = false;
  gameArray = [];
  gameCounter = gameArray.length;
  timeouts = [];
  playerArray = [];
  countDisplay.innerText = gameCounter;
};