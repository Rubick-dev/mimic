// ### Mimic Simon ###
const colourPickerButtons = document.querySelectorAll(".colour-button");

for (let j = 0; j < colourPickerButtons.length; j++){
  colourPickerButtons[j].addEventListener('click', playerClick, false);
};

function playerClick(){
  console.log("registered click");
};