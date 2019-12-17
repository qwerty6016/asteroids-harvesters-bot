'use strict';

let leftWeaponCodesExplanation = {
  'asteroidInFrontOfLeftWeapon': 'colors.indexOf(asteroid.color) || -1',
  'projectilesInFrontOfLeftWeapon': 'boolean',
  'platformColor': 'colors.indexOf(playerShip.platformColor)',
};

let leftWeaponMemory = [
  {
    'id': 0,
    'code': [1, false, 0],
    'actions': [
      fireLeftWeapon
    ],
  },
  {
    'id': 1,
    'code': [2, false, 0],
    'actions': [
      fireLeftWeapon
    ],
  },
  {
    'id': 2,
    'code': [0, false, 1],
    'actions': [
      fireLeftWeapon
    ],
  },
  {
    'id': 3,
    'code': [2, false, 1],
    'actions': [
      fireLeftWeapon
    ],
  },
  {
    'id': 4,
    'code': [0, false, 2],
    'actions': [
      fireLeftWeapon
    ],
  },
  {
    'id': 5,
    'code': [1, false, 2],
    'actions': [
      fireLeftWeapon
    ],
  },
];
