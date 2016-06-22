var gameMenu = document.getElementById('game-menu');
var gameOver = document.getElementById('game-over');
var gameComplete = document.getElementById('game-complete');
var points = document.getElementById('points');
var gameOptions = document.getElementById('game-options');
var gameScores = document.getElementById('game-scores');
// var options = document.getElementById('options');
var scores = document.getElementById('scores');
var play = document.getElementById('play');

// options.addEventListener('click', showOptions);
scores.addEventListener('click', showHighscores);
play.addEventListener('click', initGame);

var y = document.getElementsByClassName('play-again');
var i;
for (i = 0; i < y.length; i++) {
  y[i].addEventListener('click', hideMenu);
}

var x = document.getElementsByClassName('back-to-menu');
var i;
for (i = 0; i < x.length; i++) {
  x[i].addEventListener('click', backToMenu);
}

// function showOptions() {
// //   gameMenu.style.display = "none";
// //   gameOptions.style.display = "block";
// // }

function showHighscores() {
  gameMenu.style.display = "none";
  gameScores.style.display = "block";
}

function backToMenu() {
  gameComplete.style.display = "none";
  gameOver.style.display = "none";
  // gameOptions.style.display = "none";
  gameScores.style.display = "none";
  gameOver.style.display = "none";
  gameMenu.style.display = "block";
}

document.getElementById('play').addEventListener('click', hideMenu);

function hideMenu(){
  gameComplete.style.display = "none";
  gameMenu.style.display = "none"; //tempo solution to get rid of game-menu
  gameOver.style.display = "none";
  // gameOptions.style.display = "none";
}
