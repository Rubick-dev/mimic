// ### Mimic Simon ###
const colourPickerButtons = document.querySelectorAll(".colour-button");

for (let j = 0; j < colourPickerButtons.length; j++){
  colourPickerButtons[j].addEventListener('click', playerClick, false);
};

function playerClick(){
  console.log("registered click");
};

function playRed(){
  var audio1 = document.getElementById('audio-red');
  audio1.play();
}

function playBlue(){
  var audio2 = document.getElementById('audio-blue');
  audio2.play();
}

function playGreen(){
  var audio3 = document.getElementById('audio-green');
  audio3.play();
}

function playYellow(){
  var audio4 = document.getElementById('audio-yellow');
  audio4.play();
}