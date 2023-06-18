function validateInput(playerName) {
  // Validate the input: Check if the name is not empty
  if (playerName.length <= 4) {
    alert('Please enter a name longer than 5 characters');
    return false;
  }

  return true;
}

function startGame() {
  console.log('Starting game...');
  var playerNameInput = document.getElementById('player-name');
  var playerName = playerNameInput.value;

  // Validate the input
  if (!validateInput(playerName)) {
    return;
  }

  // Save the player's name to sessionStorage and localStorage
  localStorage.setItem('playerName', playerName);

  // Redirect to the game page
  $(function(){
    $("#main-page").load("pages/game.html");
  });

}

// Add an event listener to the start game button
var startGameBtn = document.getElementById('start-game-btn');
startGameBtn.addEventListener('click', function() {
  window.playButtonClickSound();
  startGame();
});
