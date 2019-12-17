'use strict';

const statCanvas = document.getElementById('staticCanvas');
const statCtx    = statCanvas.getContext("2d");
const statWidth  = statCanvas.width;
const statHeight = statCanvas.height;
const dynCanvas  = document.getElementById('dynamicCanvas');
const dynCtx     = dynCanvas.getContext("2d");
const dynWidth   = dynCanvas.width;
const dynHeight  = dynCanvas.height;

// display alert if size of staticCanvas not equal to size of dynamicCanvas
if (statWidth != dynWidth || statHeight != dynHeight) alert("Different width/height of canvases!    statWidth = " + statWidth + ", dynWidth = " + dynWidth + ";    statHeight = " + statHeight + ", dynHeight = " + dynHeight);

const colors           = ["#a30404", "#63534b", "#1e4701"];
const starsSize        = 1;
const asteroidsSize    = 12;
const starsSpeed       = 2;
const asteroidsSpeed   = 3;
const projectilesSpeed = 10;

let numOfYellowStars = 20;
let starsYellow      = [];
let numOfWhiteStars  = 20;
let starsWhite       = [];
let asteroids        = [];
let numOfAsteroids0  = 5;
let numOfAsteroids1  = 5;
let numOfAsteroids2  = 5;
let projectiles      = [];
let score            = 0;
let gameOver         = false;
let applyNewGenotype = false;
let playerShip = {
  "size"                  : {"x" : 125, "y" : 50},
  "weaponSize"            : {"x" : 25,  "y" : 50},
  "weaponXCenter"         : 12,
  "stepWidth"             : asteroidsSize,
  "sightDistance"         : dynHeight - Math.floor(dynHeight * 0.5),
  "checkPathDistance"     : null,
  "projectileSize"        : {"x" : 1,   "y" : 12},
  "projectileColor"       : "#60d60c",
  "platformSize"          : {"x" : 75,  "y" : 25},
  "platformXCenter"       : 37,
  "platformCargoUnitSize" : {"x" : 25,  "y" : 25},
  "platformCargoSpace"    : [false, false, false],
  "platformColor"         : Math.floor(Math.random() * 3)
};
playerShip.checkPathDistance = dynHeight - playerShip.size.y - asteroidsSpeed * 3;

// set playerShip starting position
playerShip.currentPosition = {"x" : Math.floor(dynWidth * 0.5 - playerShip.size.x * 0.5), "y" : dynHeight - playerShip.size.y};
playerShip.platformColor   = colors[(Math.floor(Math.random() * colors.length))];

// fill arrays of stars
for (let i = 0; i < numOfYellowStars; i++) {
  starsYellow.push({"x" : Math.floor(Math.random() * dynWidth), "y" : Math.floor(Math.random() * dynHeight)});
};
for (let i = 0; i < numOfWhiteStars; i++) {
  starsWhite.push({"x" : Math.floor(Math.random() * dynWidth), "y" : Math.floor(Math.random() * dynHeight)});
};

// fill arrays of asteroids
for (let i = 0; i < numOfAsteroids0; i++) {
  asteroids.push({"x" : Math.floor(Math.random() * dynWidth), "y" : -Math.floor(Math.random() * (dynHeight * 0.5)), "color" : colors[0]});
};
for (let i = 0; i < numOfAsteroids1; i++) {
  asteroids.push({"x" : Math.floor(Math.random() * dynWidth), "y" : -Math.floor(Math.random() * (dynHeight * 0.5)), "color" : colors[1]});
};
for (let i = 0; i < numOfAsteroids2; i++) {
  asteroids.push({"x" : Math.floor(Math.random() * dynWidth), "y" : -Math.floor(Math.random() * (dynHeight * 0.5)), "color" : colors[2]});
};

// draw staticCanvas background
statCtx.fillStyle = "#000d23";
statCtx.fillRect(0, 0, statWidth, statHeight);

function testPhenotype() {
  animFrame();
};

function applyNewGenotypeBtnPressed() {
  applyNewGenotype = true;
};

function showMemoryPattern() {
  let specimenPartName = document.getElementById('specimenPartName').value;
  let memoryPatternId = document.getElementById('memoryPatternId').value;
  let memoryPattern = null;

  for (let i = 0; i < botMemory[specimenPartName].length; i++) {
    if (botMemory[specimenPartName][i].id == memoryPatternId) {
      document.getElementById('codesExplanation').innerHTML = JSON.stringify(botMemoryCodesExplanations[specimenPartName]);
      memoryPattern = JSON.parse(JSON.stringify(botMemory[specimenPartName][i]));
      for (var j = 0; j < population[0][specimenPartName].length; j++) {
        if (population[0][specimenPartName][j].id == memoryPatternId) {
          memoryPattern.actions = population[0][specimenPartName][j].actions[0];
          document.getElementById('memoryPattern').innerHTML = JSON.stringify(memoryPattern);
        };
      };
    };
  };
};

function testLoop() {
  dynCtx.clearRect(0, 0, dynWidth, dynHeight);
  moveStarsAndAsteroids(starsYellow, starsSpeed);
  moveStarsAndAsteroids(starsWhite, starsSpeed);
  drawStars(starsYellow, "yellow", starsSize);
  drawStars(starsWhite, "white", starsSize);
  moveProjectiles();
  asteroidsProjectilesCollisionDetection();
  drawProjectiles();
  moveStarsAndAsteroids(asteroids, asteroidsSpeed);
  drawAsteroids();
  asteroidsPlayerShipCollisionDetection();
  botDecisions();
  drawPlayerShip();
};

function animFrame(){
  testLoop();
  if (gameOver === true) {
    gameOver = false;
    score = 0;
  };

  if (applyNewGenotype) {
    let newGenotype = JSON.parse(bestSpecimenGenotypeTextarea.value)
    applyGenotype(newGenotype);
    population[0] = newGenotype;
    applyNewGenotype = false;
  };

  requestAnimationFrame(animFrame, dynCanvas);
};

function moveStarsAndAsteroids(starsOrAsteroids, speed) {
  for(let i = 0; i < starsOrAsteroids.length; i++) {
    starsOrAsteroids[i].y += speed;
    if (starsOrAsteroids[i].y > dynHeight) {
      starsOrAsteroids[i].y = 0;
      starsOrAsteroids[i].x = Math.floor(Math.random() * dynWidth);
    };
  };
};

function drawStars(stars, color, size) {
  dynCtx.fillStyle = color;
  for(let i = 0; i < stars.length; i++) {
    dynCtx.beginPath();
    dynCtx.arc(stars[i].x, stars[i].y, size, 0, Math.PI*2, true);
    dynCtx.fill();
  };
};

function drawAsteroids() {
  for(let i = 0; i < asteroids.length; i++) {
    dynCtx.fillStyle = asteroids[i].color;
    dynCtx.beginPath();
    dynCtx.arc(asteroids[i].x, asteroids[i].y, asteroidsSize, 0, Math.PI*2, true);
    dynCtx.fill();
  };
}

function drawPlayerShip() {
  dynCtx.fillStyle = "#a8a8a8";
  dynCtx.fillRect(playerShip.currentPosition.x, playerShip.currentPosition.y, playerShip.weaponSize.x, playerShip.weaponSize.y);
  dynCtx.fillRect(playerShip.currentPosition.x + playerShip.size.x - playerShip.weaponSize.x, playerShip.currentPosition.y, playerShip.weaponSize.x, playerShip.weaponSize.y);
  dynCtx.fillStyle = playerShip.platformColor;
  dynCtx.fillRect(playerShip.currentPosition.x + playerShip.weaponSize.x, playerShip.currentPosition.y + playerShip.platformSize.y, playerShip.platformSize.x, playerShip.platformSize.y);
  dynCtx.font = "15px Comic Sans MS";
  dynCtx.fillStyle = "white";
  dynCtx.textAlign = "center";
  dynCtx.fillText(score, playerShip.currentPosition.x + Math.floor(playerShip.size.x * 0.5), playerShip.currentPosition.y + playerShip.size.y - 10);
  dynCtx.fillStyle = playerShip.platformColor;
  for(let i = 0; i < playerShip.platformCargoSpace.length; i++) {
    if (playerShip.platformCargoSpace[i]) {
      dynCtx.fillRect(playerShip.currentPosition.x + playerShip.weaponSize.x + playerShip.platformCargoUnitSize.x * i, playerShip.currentPosition.y, playerShip.platformCargoUnitSize.x, playerShip.platformCargoUnitSize.y);
    } else {
      break;
    };
  };
};

function moveShipLeft() {
  if ((playerShip.currentPosition.x + playerShip.size.x - playerShip.weaponSize.x - playerShip.stepWidth) > 0) {
    playerShip.currentPosition.x -= playerShip.stepWidth;
  };
};

function moveShipRight() {
  if ((playerShip.currentPosition.x + playerShip.weaponSize.x) < dynWidth) {
    playerShip.currentPosition.x += playerShip.stepWidth;
  };
};

function fireLeftWeapon() {
  projectiles.push({"x" : playerShip.currentPosition.x + playerShip.weaponXCenter, "y" : playerShip.currentPosition.y});
};

function fireRightWeapon() {
  projectiles.push({"x" : playerShip.currentPosition.x + playerShip.size.x - playerShip.weaponXCenter, "y" : playerShip.currentPosition.y});
};

function moveProjectiles() {
  for(let i = projectiles.length - 1; i >= 0; i--) {
    projectiles[i].y -= projectilesSpeed;
    if (projectiles[i].y < 0) {
      projectiles.splice(i, 1);
    };
  };
};

function drawProjectiles() {
  dynCtx.fillStyle = playerShip.projectileColor;
  for(let i = 0; i < projectiles.length; i++) {
    dynCtx.fillRect(projectiles[i].x, projectiles[i].y, playerShip.projectileSize.x, playerShip.projectileSize.y);
  };
};

function asteroidsProjectilesCollisionDetection() {
  for (let i = 0; i < asteroids.length; i++) {
    for (let j = projectiles.length - 1; j >= 0; j--) {
      if (asteroidColidingProjectile(asteroids[i], projectiles[j])) {
        asteroids[i].x = asteroids[i].xStart;
        asteroids[i].y = 0 - asteroids[i].y;
        projectiles.splice(j, 1);
      };
    };
  };
};

function asteroidColidingProjectile(asteroid, projectile) {
  if (
    (asteroid.y + asteroidsSize) >= projectile.y
    && (asteroid.y - asteroidsSize) <= projectile.y
    && (asteroid.x + asteroidsSize) >= projectile.x
    && (asteroid.x - asteroidsSize) <= projectile.x
  ) {
    return true;
  } else {
    return false;
  };
};

function asteroidsPlayerShipCollisionDetection() {
  for (let i = 0; i < asteroids.length; i++) {
    if (asteroidColidingPlayerShip(asteroids[i])) {
      if (asteroids[i].color === playerShip.platformColor) {
        asteroids[i].x = asteroids[i].xStart;
        asteroids[i].y = 0;
        asteroidPlayerShipPlatformSameColor(asteroids[i])
      } else {
        gameOver = true;
      };
    };
  };
};

function asteroidColidingPlayerShip (asteroid) {
  if (
    asteroid.y >= playerShip.currentPosition.y
    && asteroid.y <= playerShip.currentPosition.y + playerShip.size.y
    && asteroid.x >= playerShip.currentPosition.x
    && asteroid.x <= playerShip.currentPosition.x + playerShip.size.x
  ) {
    return true;
  } else {
    return false;
  };
};

function asteroidPlayerShipPlatformSameColor(asteroid) {
  let j = 0;
  while (playerShip.platformCargoSpace[j]) {
    j++;
  };
  playerShip.platformCargoSpace[j] = true;
  if (playerShip.platformCargoSpace[playerShip.platformCargoSpace.length - 1]) {
    score++;
    for (let m = 0; m < playerShip.platformCargoSpace.length; m++) {
      playerShip.platformCargoSpace[m] = false;
    };
    do {
      playerShip.platformColor = colors[(Math.floor(Math.random() * colors.length))];
    } while (playerShip.platformColor === asteroid.color);
  };
};
