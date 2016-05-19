var canvas = document.getElementById('canvas');
var context = document.getElementById('canvas').getContext('2d');

console.log(context);

var keys = [];

var width = 500, height = 400, speed = 4;

var score = 0;

var map = ["mapStage1",
           "mapStage2",
           "mapStage3"
          ];

var mapStage = 0;

var player = {
    x: 40,
    y: 40,
    width: 20,
    height: 20,
    speed: 3,
    velX: 0,
    velY: 0,
    jumping: false
};
var friction = 0.8;
var gravity = 0.3;

var cube = {
    x: Math.random() * (width - 20),
    y: Math.random() * (height - 20),
    width: 20,
    height: 20
};

window.addEventListener('keydown', function(e) {
    keys[e.keyCode] = true;
}, false);

window.addEventListener('keyup', function(e) {
    delete keys[e.keyCode];
}, false);

function game() {
    update();
    render();
}

function update() {
    if(keys[38]){
      if(!player.jumping){
        player.jumping = true;
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

    if(player.x < 0)  {
      player.x = width;
      mapStage--;
      map[mapStage];
    };

    if(player.y < 0) player.y = 0;

    if(player.x >= width + player.width) {
      player.x = 0 + player.width;
      mapStage++;
      map[mapStage];
    };

    if(player.y >= height - player.height){
      player.y = height - player.height;
      player.jumping = false;
    }

    if(collision(player, cube)) process();
}



function render() {
    context.clearRect(0, 0, width, height);
    context.fillStyle = 'orange';
    context.fillRect(player.x, player.y, player.width, player.height);
    context.fillStyle = 'blue';
    context.fillRect(cube.x, cube.y, cube.width, cube.height);

    context.fillStyle = 'black';
    context.font = 'bold 30px helvetica';
    context.fillText(score, 10, 30);

    context.fillStyle = 'black';
    context.font = 'bold 30px helvetica';
    context.fillText(map[mapStage], 60, 30);

    context.fillStyle = 'black';
    context.font = 'bold 30px helvetica';
  }

function process() {
    score++;
    cube.x = Math.random() * (width - 20);
    cube.y = Math.random() * (height - 20);
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
