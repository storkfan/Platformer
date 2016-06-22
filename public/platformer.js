var canvas = document.getElementById('canvas');
var context = document.getElementById('canvas').getContext('2d');

// TODO: fix better solution for this
var gameOverMenu = document.getElementById('game-over');

var keys = [];

var width = 1024, height = 640, speed = 4;

var score = 0;

var sec = 0;

// TODO: Not fully functional yet, neets to be reset and not started until player actively starts next game
function pad(val) {
    return val > 9 ? val : "0" + val;
}
var timer = setInterval(function () {
    var seconds = pad(++sec % 60);
    var minutes = pad(parseInt(sec / 60, 10));
}, 1000);

//var fps = 60; //no need for it atm, only used when setTimeout on game() func.

var player = {
    x: 40,
    y: 40,
    width: 20,
    height: 20,
    speed: 3,
    velX: 0,
    velY: 0,
    jumping: false,
    grounded: false
};

var friction = 0.8;
var gravity = 0.3;

var cube = {
    x: 100,
    y: 300,
    width: 20,
    height: 20
};

window.addEventListener('keydown', function(e) {
    keys[e.keyCode] = true;
}, false);

window.addEventListener('keyup', function(e) {
    delete keys[e.keyCode];
}, false);

//disables the default behavior of keys
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

function colCheck(shapeA, shapeB) {
    // get the vectors to check against
    var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
        vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
        // add the half widths and half heights of the objects
        hWidths = (shapeA.width / 2) + (shapeB.width / 2),
        hHeights = (shapeA.height / 2) + (shapeB.height / 2),
        colDir = null;

    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
        // figures out on which side we are colliding (top, bottom, left, or right)
        var oX = hWidths - Math.abs(vX),
            oY = hHeights - Math.abs(vY);
        if (oX >= oY) {
            if (vY > 0) {
                colDir = "t";
                shapeA.y += oY;
            } else {
                colDir = "b";
                shapeA.y -= oY;
            }
        } else {
            if (vX > 0) {
                colDir = "l";
                shapeA.x += oX;
            } else {
                colDir = "r";
                shapeA.x -= oX;
            }
        }
    }
    return colDir;
}

function initGame() {
  requestAnimationFrame(initGame);
  update();
  render();
}

function update() {

    if(keys[38] || keys[32]){
      if(!player.jumping){
        player.jumping = true;
        player.grounded = false;
        player.velY = -player.speed*2;
      }
    }

    // if(keys[40]) player.y+=speed;
    if(keys[37]) player.x-=speed;
    if(keys[39]) player.x+=speed;

    player.velX *= friction;
    player.velY += gravity;

    player.x += player.velX;
    player.y += player.velY;

    if (currentMapStage === 0 && player.x <= 0) {
        player.x = 0;
    } else if (player.x === 0 && currentMapStage !== 0) {
       currentMapStage--;
       player.x = width - player.width;
    }

    if(player.x >= width + player.width) {
        currentMapStage++;
        player.x = 0 + player.width;
    } else if (player.x >= width - player.width && currentMapStage == map[currentMapStage].length -1) {
        player.x = width - player.width;
    }

    if(player.y >= height - player.height){
      player.y = height - player.height;
      player.jumping = false;

      if(player.y < height + player.y){
        // alert("U DED MAFAKKA, AIN'T NO SECOND CHANCES HERE M8!");
        gameOverMenu.style.display = "block";
        //saveScore();
        currentMapStage = 0;
        score = 0;
        sec = 0;
        player.x = 40;
        player.y = 40;
      }
    }

    if(player.y < 0) player.y = 0;

    if(collision(player, cube)) process();
}

function render() {
    context.clearRect(0, 0, width, height);

    context.fillStyle = "black";
    context.beginPath();
    player.grounded = false;
    for (var i = 0; i < map[currentMapStage].length; i++) {
      context.fillRect(map[currentMapStage][i].x, map[currentMapStage][i].y, map[currentMapStage][i].width, map[currentMapStage][i].height);

      var dir = colCheck(player, map[currentMapStage][i]);

      if (dir === "l" || dir === "r") {
          player.velX = 0;
          player.jumping = false;
      } else if (dir === "b") {
          player.grounded = true;
          player.jumping = false;
      } else if (dir === "t") {
          player.velY *= -1;
      }
    }

    if(player.grounded){
        player.velY = 0;
    }

    context.fillStyle = 'orange';
    context.fillRect(player.x, player.y, player.width, player.height);
    context.fillStyle = 'blue';
    context.fillRect(cube.x, cube.y, cube.width, cube.height);

    context.fillStyle = 'black';
    context.font = 'bold 20px helvetica';
    context.fillText("Score: " + score, 10, 30);

    context.fillStyle = 'black';
    context.font = 'bold 20px helvetica';
    context.fillText("Time: " + sec, 910, 30);
  }

function process() {
    score++;
    cube.x = Math.random() * (width - 20);
    cube.y = 200;
}

function collision(first, second) {
    return !(first.x > second.x + second.width ||
            first.x + first.width < second.x ||
            first.y  > second.y + second.height ||
            first.y + first.height < second.y);
}

// function saveScore(){
//   document.cookie = score;
//   console.log(document.cookie);
// }

// function deleteCookie(){
//   document.cookie = score + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
// }

// Replace this with animationframe
/*setInterval(function () {
    game();
}, 1000/60)*/

//animationFrame - http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());
