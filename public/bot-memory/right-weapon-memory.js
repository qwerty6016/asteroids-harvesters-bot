'use strict';

let rightWeaponCodesExplanation = {
  'asteroidInFrontOfRightWeapon': 'colors.indexOf(asteroid.color) || -1',
  'projectilesInFrontOfRightWeapon': 'boolean',
  'platformColor': 'colors.indexOf(playerShip.platformColor)',
};

let rightWeaponMemory = [
  {
    'id': 0,
    'code': [1, false, 0],
    'actions': [
      fireRightWeapon
    ],
  },
  {
    'id': 1,
    'code': [2, false, 0],
    'actions': [
      fireRightWeapon
    ],
  },
  {
    'id': 2,
    'code': [0, false, 1],
    'actions': [
      fireRightWeapon
    ],
  },
  {
    'id': 3,
    'code': [2, false, 1],
    'actions': [
      fireRightWeapon
    ],
  },
  {
    'id': 4,
    'code': [0, false, 2],
    'actions': [
      fireRightWeapon
    ],
  },
  {
    'id': 5,
    'code': [1, false, 2],
    'actions': [
      fireRightWeapon
    ],
  },
];
