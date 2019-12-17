'use strict';

function evaluateDataPattern() {
  let indexOfPlatformColor = colors.indexOf(playerShip.platformColor);

  dataPattern.platform = [
    asteroidInFrontOfShipLeftSide(),
    asteroidInFrontOfShipRightSide(),
    pathLeftClear(),
    pathRightClear(),
    indexOfPlatformColor,
    shipIsTooFarFromCanvasCenter(),
  ];

  dataPattern.leftWeapon = [
    asteroidInFrontOfLeftWeapon(),
    projectilesInFrontOfLeftWeapon(),
    indexOfPlatformColor,
  ];

  dataPattern.rightWeapon = [
    asteroidInFrontOfRightWeapon(),
    projectilesInFrontOfRightWeapon(),
    indexOfPlatformColor,
  ];
};

function pathLeftClear() {
  let checkPathLeftBoundary = playerShip.currentPosition.x - playerShip.stepWidth;
  let checkPathRightBoundary = playerShip.currentPosition.x;
  let checkPathLeft = asteroidInFrontOfBoundaries(checkPathLeftBoundary, checkPathRightBoundary, playerShip.checkPathDistance);
  if (
    (playerShip.currentPosition.x + playerShip.size.x - playerShip.weaponSize.x) >= 0
    && (!checkPathLeft.color || checkPathLeft.color === playerShip.platformColor)
  ) {
    return true;
  } else {
    return false;
  };
};

function pathRightClear() {
  let checkPathLeftBoundary = playerShip.currentPosition.x + playerShip.width;
  let checkPathRightBoundary = playerShip.currentPosition.x + playerShip.width + playerShip.stepWidth;
  let checkPathRight = asteroidInFrontOfBoundaries(checkPathLeftBoundary, checkPathRightBoundary, playerShip.checkPathDistance);
  if (
    (playerShip.currentPosition.x + playerShip.weaponSize.x) <= dynWidth
    && (!checkPathRight.color || checkPathRight.color === playerShip.platformColor)
  ) {
    return true;
  } else {
    return false;
  };
};

function asteroidInFrontOfShipLeftSide() {
  let shipLeftBoundary = playerShip.currentPosition.x;
  let shipRightBoundary = playerShip.currentPosition.x + playerShip.platformXCenter;
  let asteroid = asteroidInFrontOfBoundaries(shipLeftBoundary, shipRightBoundary, playerShip.sightDistance);
  if (asteroid.color) {
    asteroid = colors.indexOf(asteroid.color)
  } else {
    asteroid = -1;
  };

  return asteroid;
};

function asteroidInFrontOfShipRightSide() {
  let shipLeftBoundary = playerShip.currentPosition.x + playerShip.platformXCenter;
  let shipRightBoundary = playerShip.currentPosition.x + playerShip.size.x;
  let asteroid = asteroidInFrontOfBoundaries(shipLeftBoundary, shipRightBoundary, playerShip.sightDistance);
  if (asteroid.color) {
    asteroid = colors.indexOf(asteroid.color)
  } else {
    asteroid = -1;
  };

  return asteroid;
};

function projectilesInFrontOfLeftWeapon() {
  let leftWeaponPosition = playerShip.currentPosition.x + playerShip.weaponXCenter;
  return projectilesInFrontOfWeapon(leftWeaponPosition) > 0;
};

function asteroidInFrontOfLeftWeapon() {
  let leftWeaponLeftBoundary = playerShip.currentPosition.x;
  let leftWeaponRightBoundary = playerShip.currentPosition.x + playerShip.weaponSize.x;
  let asteroid = asteroidInFrontOfBoundaries(leftWeaponLeftBoundary, leftWeaponRightBoundary, playerShip.sightDistance);
  if (asteroid.color) {
    asteroid = colors.indexOf(asteroid.color)
  } else {
    asteroid = -1;
  };

  return asteroid;
};

function projectilesInFrontOfRightWeapon() {
  let rightWeaponPosition = playerShip.currentPosition.x + playerShip.size.x - playerShip.weaponXCenter;
  return projectilesInFrontOfWeapon(rightWeaponPosition) > 0;
};

function asteroidInFrontOfRightWeapon() {
  let rightWeaponLeftBoundary = playerShip.currentPosition.x + playerShip.size.x - playerShip.weaponSize.x;
  let rightWeaponRightBoundary = playerShip.currentPosition.x + playerShip.size.x;
  let asteroid = asteroidInFrontOfBoundaries(rightWeaponLeftBoundary, rightWeaponRightBoundary, playerShip.sightDistance);
  if (asteroid.color) {
    asteroid = colors.indexOf(asteroid.color)
  } else {
    asteroid = -1;
  };

  return asteroid;
};

function projectilesInFrontOfWeapon(weaponPosition) {
  let projectilesShooted = 0;
  for (var i = 0; i < projectiles.length; i++) {
    if (
      weaponPosition >= projectiles[i].x
      && weaponPosition < (projectiles[i].x + playerShip.projectileSize.x)
    ) {
      projectilesShooted++;
    };
  };

  return projectilesShooted;
};

function asteroidInFrontOfBoundaries(leftBoundary, rightBoundary, distance) {
  let asteroid = {};
  for (var i = 0; i < asteroids.length; i++) {
    if (
      asteroids[i].x >= leftBoundary
      && asteroids[i].x <= rightBoundary
      && asteroids[i].y > distance
    ) {
      if (
        (!asteroid.y || asteroid.y < asteroids[i].y)
        && asteroids[i].color != playerShip.platformColor
      ) {
        asteroid.color = asteroids[i].color;
        asteroid.y = asteroids[i].y;
      };
    };
  };

  return asteroid;
};

function shipIsTooFarFromCanvasCenter() {
  if (playerShip.currentPosition.x < 0) {
    return true;
  } else if (playerShip.currentPosition.x > dynWidth) {
    return false;
  } else {
    return -1;
  };
};
