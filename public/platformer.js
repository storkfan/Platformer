var canvas = document.getElementById('canvas');
var context = document.getElementById('canvas').getContext('2d');

// GAME MENU
// var gameMenu = document.getElementById('game-menu');
// document.getElementById('play').addEventListener('click', hideMenu);
//
// function hideMenu() {
//   if(gameMenu.style.display === "block"){
//     gameMenu.style.display = "none";
//     game();
//   }
// }
// GAME MENU END

var keys = [];

var width = 500, height = 400, speed = 4;

var score = 0;

var currentMap = 0;
var map = [];
var currentMapStage = 0;
var stage1 = [];
var stage2 = [];
var stage2 = [];

map = [
    stage1 = [
        {
            x: 120,
            y: 300,
            width: 80,
            height: 80
        },
        {
            x: 250,
            y: 250,
            width: 40,
            height: 40
        }
    ],
    stage2 = [
        {
            x: 120,
            y: 250,
            width: 40,
            height: 40
        },
        {
            x: 300,
            y: 350,
            width: 40,
            height: 40
        }
    ],
    stage3 = [
        {
            x: 250,
            y: 100,
            width: 40,
            height: 40
        },
        {
            x: 400,
            y: 350,
            width: 40,
            height: 40
        }
    ],
]

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

function game() {
    update();
    render();
}

function update() {

    if(keys[38]){
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


    if (currentMapStage == 0 && player.x <= 0) {
        player.x = 0;
    } else if (player.x == 0 && currentMapStage !== 0) {
       currentMapStage--;
       player.x = width - player.width;
    }

    if(player.x >= width + player.width) {
        currentMapStage++;
        player.x = 0 + player.width;
    } else if (player.x >= width - player.width && currentMapStage == map[currentMapStage].length) {
        player.x = width - player.width;
    }

    if(player.y >= height - player.height){
      player.y = height - player.height;
      player.jumping = false;
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
    context.font = 'bold 30px helvetica';
    context.fillText(score, 10, 30);

    context.fillStyle = 'black';
    context.font = 'bold 30px helvetica';
  }

function process() {
    score++;
    cube.x = Math.random() * (width - 20);
    cube.y = height - 20;
}

function collision(first, second) {
    return !(first.x > second.x + second.width ||
            first.x + first.width < second.x ||
            first.y  > second.y + second.height ||
            first.y + first.height < second.y);
}

setInterval(function () {
    game();
}, 1000/60)
