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

var playersTurnNow = false;
var gameDifficulty = 1;
var gameArray = [1, 3, 4, 3, 4, 4, 2, 3, 2, 4, 2, 1, 1, 1, 2, 3, 4, 2, 1, 2,];
// var gameArray = [];
var playerArray = [];
var gameCounter = gameArray.length;


// EVENT LISTENER for the colour buttons
for (let j = 0; j < colourPickerButtons.length; j++){
  colourPickerButtons[j].addEventListener('click', playerClick, false);
};


// Functions
function playerClick(){
  console.log("registered " + this + " click");
};

function playRed(e){
  if (e == "computer"){
    console.log('Computer initiated selection');
  } else {
    console.log('user selection from click');
      //   playerArray.push(4)
  }
  var audio1 = document.getElementById('audio-red');
  audio1.play();
  document.querySelector('.red-colour-container .colour-div').style.transform = "scale(1)";
  redButton.disabled = true;
  setTimeout(function(){
  document.querySelector('.red-colour-container .colour-div').style.transform = "scale(.8)"; 
  playersTurnNow == false ? redButton.disabled = false : redButton.disabled = true;
  }, 600);
};

function playBlue(e){
  if (e == "computer"){
    console.log('Computer initiated selection');
  } else {
    console.log('user selection from click');
      //   playerArray.push(4)
  }
  var audio2 = document.getElementById('audio-blue');
  audio2.play();
  document.querySelector('.blue-colour-container .colour-div').style.transform = "scale(1)";
  blueButton.disabled = true;
  setTimeout(function(){
  document.querySelector('.blue-colour-container .colour-div').style.transform = "scale(.8)"; 
  playersTurnNow == false ? blueButton.disabled = false : blueButton.disabled = true;
  }, 600);
};

function playGreen(e){
  if (e == "computer"){
    console.log('Computer initiated selection');
  } else {
    console.log('user selection from click');
      //   playerArray.push(3)
  }
  var audio3 = document.getElementById('audio-green');
  audio3.play();
  document.querySelector('.green-colour-container .colour-div').style.transform = "scale(1)";
  greenButton.disabled = true;
  setTimeout(function(){
  document.querySelector('.green-colour-container .colour-div').style.transform = "scale(.8)"; 
  playersTurnNow == false ? greenButton.disabled = false : greenButton.disabled = true;
  }, 600);
};

function playYellow(e){
  if (e == "computer"){
    console.log('Computer initiated selection');
  } else {
    console.log('user selection from click');
      //   playerArray.push(4)
  }
  var audio4 = document.getElementById('audio-yellow');
  audio4.play();
    document.querySelector('.yellow-colour-container .colour-div').style.transform = "scale(1)";
    yellowButton.disabled = true;
    setTimeout(function(){
    document.querySelector('.yellow-colour-container .colour-div').style.transform = "scale(.8)"; 
    playersTurnNow == false ? yellowButton.disabled = false : yellowButton.disabled = true; 
  }, 600);
};

function gameStatus(){
  if(onorOff.checked){
    console.log("box is now checked!");
    countDisplay.innerText = gameCounter;
    startButton.style.backgroundColor = "green";
    startButton.disabled = false;
  } else {
    console.log("box is now unchecked!");
    countDisplay.innerText = "...";
    startButton.style.backgroundColor = "rgb(248, 52, 52)";
    startButton.disabled = true;
  }
};

function gameMode(){
  // return gameDifficulty == 2 ? 2 : 1; //alternative one line replacement to be tested later
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
  runComputersLogic(gameCounter)
};

function runComputersLogic(count){
  gameArray.push(getRandomColour());
  gameCounter = gameArray.length;
  countDisplay.innerText = gameCounter;
  let x = 0;

  for (let j = 0; j < colourPickerButtons.length; j++){
    colourPickerButtons[j].removeEventListener('click', playerClick, false);
    console.log(colourPickerButtons[j] + " removing the event listener supposedly")
    colourPickerButtons[j].disabled = true;
  }

  (function theLoop (gameArray, x) {
    
    setTimeout(function (){
      console.log(gameArray[x] + " value of gameArray[x]");
      if (gameArray[x] === 1) {
        playRed("computer");
      } else if (gameArray[x] === 2) {
        playBlue("computer");
      } else if (gameArray[x] === 3) {
        playGreen("computer");
      } else {
        playYellow("computer");
      }

      if (++x < gameCounter) {
        theLoop(gameArray, x);
      } else {
        console.log("your turn now player1");
        for (let j = 0; j < colourPickerButtons.length; j++){
          colourPickerButtons[j].addEventListener('click', playerClick, false);
          colourPickerButtons[j].disabled = false;
          playersTurnNow = true;
        }
      }
    }, 1000 - (gameCounter * 25));

  })(gameArray, x);
};


function getRandomColour(){
  return Math.floor((Math.random() * 4) + 1);
}


function resetGame(){
  // gameArray = [];
  playerArray = [];
}


function runPlayersTurn(){
  console.log("is your turn now player1");
}