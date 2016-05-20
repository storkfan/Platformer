 var gameMenu = document.getElementById('game-menu');
 var gameOver = document.getElementById('game-over');
 var gameOptions = document.getElementById('game-options');
 var gameScores = document.getElementById('game-scores');

 document.getElementById('options').addEventListener('click', showOptions);
 document.getElementById('scores').addEventListener('click', showHighscores);

var x = document.getElementsByClassName('back-to-menu');
var i;
for (i = 0; i < x.length; i++) {
    x[i].addEventListener('click', backToMenu);
}

 function showOptions() {
   gameMenu.style.display = "none";
   gameOptions.style.display = "block";
   console.log('booom');
 }

 function showHighscores() {
   gameMenu.style.display = "none";
   gameScores.style.display = "block";
 }

 function backToMenu() {
   gameOptions.style.display = "none";
   gameScores.style.display = "none";
   gameOver.style.display = "none";
   gameMenu.style.display = "block";
   console.log('rekt');
 }


 document.getElementById('play').addEventListener('click', hideMenu);
 document.getElementById('play-again').addEventListener('click', hideMenu);

 /*
 function hideMenu() {
   if(gameMenu.style.display === "block"){
     gameMenu.style.display = "none";
     game();
   }
 }*/
 function hideMenu(){
  gameMenu.style.display = "none"; //tempo solution to get rid of game-menu
  gameOver.style.display = "none";
  gameOptions.style.display = "none";
 }
