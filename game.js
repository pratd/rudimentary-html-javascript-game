"use strict"
var myGamePiece;
var myObstacles = [];
const data = {
    fps: 25,
    speed: 25,
    canvas: {
    width: 468,
    height: 750
}, car1: {
    width: 80,
    height: 120,
    turn: 25,
    image: image(src="spacecraft.jpg"),
    position: {
      x: 120,
      y: 340
    }
  },
  car2: {
    width: 80,
    height: 120,
    distance: 250,
    image: image(src="spacecraft.jpg")
  },
  line: {
    width: 10,
    height: 50,
    distance: 100,
    pos1: 105,
    pos2: 205,
    color: "#efefef"
  },
  moves: [20, 120, 220],
  score: 1,
  grace: 10
};
var game = false;
var die = false;
var car1Move = 0;
var car1Turn = 0;
var score = 0;
var lines = [];
var car1 = [];
var car2 = [];
var canvas = document.querySelector("#canvas");
var context = canvas.getContext("2d");
var instruction = document.querySelector("#instruction");
var scoreText = document.querySelector("#score");
var lose = document.querySelector("#lose");

window.addEventListener("keydown", function(evt) {
  evt.preventDefault();

  if (!game) {
    if (evt.keyCode === 13) {
      game = true;
      instruction.style.display = "none";
      lose.style.display = "none";

      initialize();
    }
  }

  if (car1Move <= 0 && car1Turn <= 0) {
    if (evt.keyCode === 37) {
      if (car1[0] === data.moves[1]) {
        car1Move = data.moves[0];
        car1Turn = 1;
      }
      else if (car1[0] === data.moves[2]) {
        car1Move = data.moves[1];
        car1Turn = 1;
      }
    }
    else if (evt.keyCode === 39) {
      if (car1[0] === data.moves[0]) {
        car1Move = data.moves[1];
        car1Turn = 2;
      }
      else if (car1[0] === data.moves[1]) {
        car1Move = data.moves[2];
        car1Turn = 2;
      }
    }
  }
});

function clearCanvas() {
  context.clearRect(0, 0, data.canvas.width, data.canvas.height);
}

function initLines() {
  var y = data.canvas.height - data.line.height;

  while (y >= 0) {
    lines.push([
      [data.line.pos1, y, data.line.width, data.line.height],
      [data.line.pos2, y, data.line.width, data.line.height]
    ]);

    y -= data.line.distance;
  }
}

function initCar1() {
  car1 = [data.car1.position.x, data.car1.position.y, data.car1.width, data.car1.height];
}

function initCar2() {
  for (var i = 0; i < Math.floor(Math.random() * 2) + 1; i++) {
    var random = data.moves[Math.floor(Math.random() * 3)];

    if (car2.length > 0) {
      if (random === car2[car2.length - 1][1]) {
        i--;
      }
      else {
        car2.push([random, data.car2.height * -1]);
      }
    }
    else {
      car2.push([random, data.car2.height * -1]);
    }
  }
}

function drawLines() {
  var remove = false;

  context.fillStyle = data.line.color;

  for (var i = 0; i < lines.length; i++) {
    context.fillRect(lines[i][0][0], lines[i][0][1], lines[i][0][2], lines[i][0][3]);
    context.fillRect(lines[i][1][0], lines[i][1][1], lines[i][1][2], lines[i][1][3]);

    if (lines[i][0][1] > data.canvas.height) {
      remove = i;
    }
    else {
      lines[i][0][1] += data.speed;
      lines[i][1][1] += data.speed;
    }
  }

  if (lines[lines.length - 1][0][1] > data.line.distance - data.line.height) {
    lines.push([
      [data.line.pos1, (data.line.height * -1), data.line.width, data.line.height],
      [data.line.pos2, (data.line.height * -1), data.line.width, data.line.height]
    ]);
  }

  if (remove) {
    lines.splice(remove, 1);
  }
}

function drawCar1() {
  if (car1Move > 0 && car1Turn > 0) {
    if (car1Turn === 1) {
      if (car1[0] > car1Move) {
        car1[0] -= data.car1.turn;
      }
      else {
        car1[0] = car1Move;
        car1Move = 0;
        car1Turn = 0;
      }
    }
    else if (car1Turn === 2) {
      if (car1[0] < car1Move) {
        car1[0] += data.car1.turn;
      }
      else {
        car1[0] = car1Move;
        car1Move = 0;
        car1Turn = 0;
      }
    }
  }
  context.drawImage(data.car1.image, car1[0], car1[1], car1[2], car1[3]);
}

function drawCar2() {
  var remove = false;

  for (var i = 0; i < car2.length; i++) {
    if (car2[i][1] > data.canvas.height) {
      remove = i;
    }
    else {
      car2[i][1] += data.speed;
    }
    context.drawImage(data.car2.image, car2[i][0], car2[i][1], data.car2.width, data.car2.height);
  }

  if (car2[car2.length - 1][1] > data.car2.distance) {
    initCar2();
  }

  if (remove) {
    car2.splice(remove, 1);
  }
}

function collision() {
  for (var i = 0; i < car2.length; i++) {
    if (
      car1[0] + data.grace <= car2[i][0] + data.car2.width
      && car1[0] + data.car1.width - data.grace >= car2[i][0]
      && car1[1] + data.grace <= car2[i][1] + data.car2.height
      && car1[1] + data.car2.height - data.grace >= car2[i][1]
    ) {
      die = true;
      game = false;
      instruction.style.display = "block";
      lose.style.display = "block";
    }
  }
}

function incrementScore() {
  score += data.score;

  scoreText.innerHTML = score;
}

function render(callback) {
  setTimeout(function() {
    requestAnimationFrame(render);

    if (!die && game) {
      clearCanvas();
      drawLines();
      drawCar1();
      drawCar2();
      collision();
      incrementScore();
    }
  }, 1000 / data.fps);
}

function initialize() {
  die = false;
  score = 0;
  car1Move = 0;
  car1Turn = 0;
  lines = [];
  car1 = [];
  car2 = [];

  initLines();
  initCar1();
  initCar2();
  clearCanvas();
}

CanvasRenderingContext2D();