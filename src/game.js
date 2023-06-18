Game = function(game) {
  // Initialize the score variable
  this.scores = JSON.parse(localStorage.getItem('scores')) || [];
  this.score = 0;
  this.scoreText = null;
  this.playerName = null;
  this.playerDate = null;
  this.gameEnded = false;
  this.scoreboard = document.getElementById("scoreboard");
    // Save these functions as instance properties
    this.newGameHandler = function() {
      window.playButtonClickSound();
      this.startNewGame();
    }.bind(this);

    this.changeNameHandler = function() {
      window.playButtonClickSound();
      var canvas = document.querySelector('canvas'); 
      canvas.parentNode.removeChild(canvas);
      $(function(){
        $("#main-page").load("pages/menu.html");
      });
    }.bind(this);

    this.suicideHandler = function() {
      if(this.gameEnded){
        return;
      }
      this.game.paused = true;
      this.endGame();
      this.gameEnded = true;
    }.bind(this);

};

Game.prototype = {

  preload: function() {
    // Load assets
    this.game.load.image('circle','asset/circle.png');
    this.game.load.image('shadow', 'asset/white-shadow.png');
    this.game.load.image('background', 'asset/tile.png');
    this.game.load.image('eye-white', 'asset/eye-white.png');
    this.game.load.image('eye-black', 'asset/eye-black.png');
    this.game.load.image('food', 'asset/hex.png');
  },
  create: function() {
    this.scoreboard.classList.add("hide");
        // Connection status offlineAPI
        function setConnectionStatus(status) {
          var connectionStatus = document.getElementById("connection_status");
          if (connectionStatus) {
            connectionStatus.textContent = "You are " + status;
          }
        }

        setConnectionStatus(navigator.onLine ? "Online" : "Offline");

        window.addEventListener("online", function() {
          setConnectionStatus("Online");
        });

        window.addEventListener("offline", function() {
          setConnectionStatus("Offline");
        });

    this.updateLeaderboard();
    this.playerName = localStorage.getItem('playerName');
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
    // To hide the scoreboard:

    var newGameBtn = document.getElementById("new-game-btn");
    var changeNameBtn = document.getElementById("change-name-btn");
    var suicideBtn = document.getElementById("suicide");

    // Remove the old listeners and add the new listeners
    newGameBtn.removeEventListener("click", this.newGameHandler);
    newGameBtn.addEventListener("click", this.newGameHandler);

    changeNameBtn.removeEventListener("click", this.changeNameHandler);
    changeNameBtn.addEventListener("click", this.changeNameHandler);

    suicideBtn.removeEventListener("click", this.suicideHandler);
    suicideBtn.addEventListener("click", this.suicideHandler);
    var width = this.game.width;
    var height = this.game.height;

    this.game.world.setBounds(-width, -height, width*2, height*2);
    this.game.stage.backgroundColor = '#444';

    //add tilesprite background
    var background = this.game.add.tileSprite(-width, -height,
        this.game.world.width, this.game.world.height, 'background');

    //initialize physics and groups
    this.game.physics.startSystem(Phaser.Physics.P2JS);
    this.foodGroup = this.game.add.group();
    this.snakeHeadCollisionGroup = this.game.physics.p2.createCollisionGroup();
    this.foodCollisionGroup = this.game.physics.p2.createCollisionGroup();

    //add food randomly
    for (var i = 0 ; i < 100 ; i++) {
        this.initFood(Util.randomInt(-width, width), Util.randomInt(-height, height));
    }

    this.game.snakes = [];

    //create player
    this.playerSnake = new PlayerSnake(this.game, 'circle', 0, 0);
    this.game.camera.follow(this.playerSnake.head);

    //create bots
    new BotSnake(this.game, 'circle', -200, 0);
    new BotSnake(this.game, 'circle', 200, 0);

    //initialize snake groups and collision
    for (var i = 0 ; i < this.game.snakes.length ; i++) {
        var snake = this.game.snakes[i];
        snake.head.body.setCollisionGroup(this.snakeHeadCollisionGroup);
        snake.head.body.collides([this.foodCollisionGroup]);
        //callback for when a snake is destroyed
        snake.addDestroyedCallback(this.snakeDestroyed, this);
    }

    // Initialize the score text
    this.scoreText = document.getElementById("score-value");
    this.scoreText.textContent = "Score: " + this.score;
  },

  update: function() {

    //update game components
    for (var i = this.game.snakes.length - 1 ; i >= 0 ; i--) {
        this.game.snakes[i].update();
    }
    for (var i = this.foodGroup.children.length - 1 ; i >= 0 ; i--) {
        var f = this.foodGroup.children[i];
        f.food.update();
    }
    // When the player collects food and gains points
    const newScore = 10; // Example: new score value
    this.updateScore(newScore);

  },
  initFood: function(x, y) {
    var f = new Food(this.game, x, y);
    f.sprite.body.setCollisionGroup(this.foodCollisionGroup);
    this.foodGroup.add(f.sprite);
    f.sprite.body.collides([this.snakeHeadCollisionGroup]);
    return f;
  },
  snakeDestroyed: function(snake) {
    if(snake == this.playerSnake){
      this.endGame();
    }
    //place food where snake was destroyed
    for (var i = 0 ; i < snake.headPath.length ;
    i += Math.round(snake.headPath.length / snake.snakeLength) * 2) {
        this.initFood(
            snake.headPath[i].x + Util.randomInt(-10,10),
            snake.headPath[i].y + Util.randomInt(-10,10)
        );
    }
  },
  updateScore: function(newScore) {
    // Update the score value
    if (this.playerSnake && this.playerSnake.head.exists) {
      this.score += newScore;
    } else {
      this.score = 0;
    }
    // Update the score text
    this.scoreText.textContent = "Score: " + this.score;
  },
  endGame: function() {
    playDeath();
    // Show the game over text with the final score
    var self = this;
    console.log("Game over!");
    if (this.scoreboard) {
      if (self.scoreboard) self.scoreboard.textContent = "Game Over! Your Score: " + self.score;
      this.scoreboard.classList.remove("hide");
    }
    var date = new Date();
    var formattedDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    var finalScore = {
      playerName: this.playerName,
      score: this.score,
      date: formattedDate
    };
    this.scores.push(finalScore);
    localStorage.setItem('scores', JSON.stringify(this.scores));
    this.updateLeaderboard();

    gameEnded = true;
    // Add the final score to the scoreboard

    // Stop updates and destroy the game


  },
  startNewGame: function() {
    if (this.game.paused) {
      this.game.paused = false;
    }
    this.playerName = localStorage.getItem('playerName');    
    var newGameBtn = document.getElementById("new-game-btn");
    newGameBtn.style.display = "inline"; // show the new game button when the game starts
    this.game.state.restart();
    this.gameEnded = false; // Reset the gameEnded flag
    console.log("Starting new game...");
    this.score = 0;
    this.scoreText = null;
    scoreboard.classList.add("hide");
    this.updateLeaderboard();
  },

  //TODO Leadeboard shit

  updateLeaderboard: function() {
    // Get table elements
    var tableHead = document.getElementById("leaderboard-header");
    var tableBody = document.getElementById("leaderboard-body");
    //clear the table 
    if(tableBody){tableBody.innerText = ""}

    // Retrieve all scores from localStorage
    var allScores = JSON.parse(localStorage.getItem('scores')) || [];

    // Sort the scores in descending order based on score
    allScores.sort((a, b) => b.score - a.score);

    // Display the top 5 scores in the leaderboard
    var topScores = allScores.slice(0, 5);

    // Create the header row
    var th = document.createElement('th');
    //tableHead.appendChild(th);

    topScores.forEach(function(score, index) {
      // Create a new row and data element
      var tr = document.createElement('tr');
      var td = document.createElement('td');

      // Set the content for the score element
      td.textContent = (index + 1) + ". " + score.playerName + " - " + score.score;

      // Append the score element to the row, and the row to the leaderboard body
      tr.appendChild(td);
      if(tableBody){tableBody.appendChild(tr)}
    });
  },
};
function createSvgAndText() {
  var copyrightDiv = document.getElementById('copyright');

  // Create the SVG
  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'svg');
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svg.setAttribute('viewBox', '0 0 200 200');
  svg.setAttribute('width', '20px');
  svg.setAttribute('height', '20px');

  // Create the circle and rect elements for the SVG
  var shapes = [
    { shape: 'circle', attributes: { cx: '98', cy: '98', r: '98', fill: 'orange' } },
    { shape: 'circle', attributes: { cx: '98', cy: '98', r: '78', fill: '#06283D' } },
    { shape: 'circle', attributes: { cx: '98', cy: '98', r: '55', fill: 'orange' } },
    { shape: 'circle', attributes: { cx: '98', cy: '98', r: '30', fill: '#06283D' } },
    { shape: 'rect', attributes: { x: '115', y: '85', width: '45', height: '25', fill: '#06283D' } }
  ];

  shapes.forEach(function(shapeData) {
    var shape = document.createElementNS('http://www.w3.org/2000/svg', shapeData.shape);
    for (var attr in shapeData.attributes) {
      shape.setAttribute(attr, shapeData.attributes[attr]);
    }
    svg.appendChild(shape);
  });
  var copyright = document.getElementsByClassName("author")[0];
  copyright.appendChild(svg);
}
createSvgAndText();