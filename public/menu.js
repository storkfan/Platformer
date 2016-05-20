 var gameMenu = document.getElementById('game-menu');
 var gameOver = document.getElementById('game-over');
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
 }
