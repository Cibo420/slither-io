window.playButtonClickSound = function() {
  var buttonClickSound = new Audio("../sounds/button-click.wav");
  buttonClickSound.play();
};
window.playDeath = function() {
  var deathSound = new Audio("../sounds/death.wav");
  deathSound.volume = 0.2;
  deathSound.play();
  
};