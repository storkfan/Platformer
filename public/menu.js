 var gameMenu = document.getElementById('game-menu');
 document.getElementById('play').addEventListener('click', hideMenu);
 /*
 function hideMenu() {
   if(gameMenu.style.display === "block"){
     gameMenu.style.display = "none";
     game();
   }
 }*/
 function hideMenu(){
  gameMenu.style.display = "none"; //tempo solution to get rid of game-menu
 }
