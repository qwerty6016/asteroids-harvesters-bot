'use strict';

let possibleActionsStrings = {
  'leftWeapon': [
    'fireLeftWeapon',
    'doNothing',
  ],
  'rightWeapon': [
    'fireRightWeapon',
    'doNothing',
  ],
  'platform': [
    'moveShipLeft',
    'moveShipRight',
    'doNothing',
  ],
};

let possibleActionsFunctions = {
  'leftWeapon': {
    'fireLeftWeapon': fireLeftWeapon,
    'doNothing': doNothing,
  },
  'rightWeapon': {
    'fireRightWeapon': fireRightWeapon,
    'doNothing': doNothing,
  },
  'platform': {
    'moveShipLeft': moveShipLeft,
    'moveShipRight': moveShipRight,
    'doNothing': doNothing,
  },
};
