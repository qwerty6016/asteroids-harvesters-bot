'use strict';

let platformCodesExplanation = {
  'asteroidInFrontOfShipLeftSide': 'colors.indexOf(asteroid.color) || -1',
  'asteroidInFrontOfShipRightSide': 'colors.indexOf(asteroid.color) || -1',
  'pathLeftClear': 'boolean',
  'pathRightClear': 'boolean',
  'platformColor': 'colors.indexOf(playerShip.platformColor)',
  'shipIsTooFarFromCanvasCenter': 'boolean || -1',
};

let platformMemory = [
  {
    'id': 0,
    'code': [1, '_', '_', true, 0, '_'],
    'actions': [
      moveShipRight
    ]
  },
  {
    'id': 1,
    'code': [2, '_', '_', true, 0, '_'],
    'actions': [
      moveShipRight
    ]
  },
  {
    'id': 2,
    'code': [1, '_', true, false, 0, '_'],
    'actions': [
      moveShipLeft
    ]
  },
  {
    'id': 3,
    'code': [2, '_', true, false, 0, '_'],
    'actions': [
      moveShipLeft
    ]
  },
  {
    'id': 4,
    'code': ['_', 1, true, '_', 0, '_'],
    'actions': [
      moveShipLeft
    ]
  },
  {
    'id': 5,
    'code': ['_', 2, true, '_', 0, '_'],
    'actions': [
      moveShipLeft
    ]
  },
  {
    'id': 6,
    'code': ['_', 1, false, true, 0, '_'],
    'actions': [
      moveShipRight
    ]
  },
  {
    'id': 7,
    'code': ['_', 2, false, true, 0, '_'],
    'actions': [
      moveShipRight
    ]
  },
  {
    'id': 8,
    'code': [1, '_', '_', true, 1, '_'],
    'actions': [
      moveShipRight
    ]
  },
  {
    'id': 9,
    'code': [0, '_', '_', true, 1, '_'],
    'actions': [
      moveShipRight
    ]
  },
  {
    'id': 10,
    'code': [1, '_', true, false, 1, '_'],
    'actions': [
      moveShipLeft
    ]
  },
  {
    'id': 11,
    'code': [0, '_', true, false, 1, '_'],
    'actions': [
      moveShipLeft
    ]
  },
  {
    'id': 12,
    'code': ['_', 0, true, '_', 1, '_'],
    'actions': [
      moveShipLeft
    ]
  },
  {
    'id': 13,
    'code': ['_', 2, true, '_', 1, '_'],
    'actions': [
      moveShipLeft
    ]
  },
  {
    'id': 14,
    'code': ['_', 0, false, true, 1, '_'],
    'actions': [
      moveShipRight
    ]
  },
  {
    'id': 15,
    'code': ['_', 2, false, true, 1, '_'],
    'actions': [
      moveShipRight
    ]
  },
  {
    'id': 16,
    'code': [1, '_', '_', true, 2, '_'],
    'actions': [
      moveShipRight
    ]
  },
  {
    'id': 17,
    'code': [0, '_', '_', true, 2, '_'],
    'actions': [
      moveShipRight
    ]
  },
  {
    'id': 18,
    'code': [1, '_', true, false, 2, '_'],
    'actions': [
      moveShipLeft
    ]
  },
  {
    'id': 19,
    'code': [0, '_', true, false, 2, '_'],
    'actions': [
      moveShipLeft
    ]
  },
  {
    'id': 20,
    'code': ['_', 1, true, '_', 2, '_'],
    'actions': [
      moveShipLeft
    ]
  },
  {
    'id': 21,
    'code': ['_', 0, true, '_', 2, '_'],
    'actions': [
      moveShipLeft
    ]
  },
  {
    'id': 22,
    'code': ['_', 1, false, true, 2, '_'],
    'actions': [
      moveShipRight
    ]
  },
  {
    'id': 23,
    'code': ['_', 0, false, true, 2, '_'],
    'actions': [
      moveShipRight
    ]
  },
  {
    'id': 24,
    'code': [-1, -1, '_', true, '_', true],
    'actions': [
      moveShipRight,
    ]
  },
  {
    'id': 25,
    'code': [-1, -1, true, '_', '_', false],
    'actions': [
      moveShipLeft,
    ]
  },
];
