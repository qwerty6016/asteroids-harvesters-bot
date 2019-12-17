'use strict';

let dataPattern = null;
let dataPatternActions = null;

function botDecisions() {
  dataPattern = {
    'leftWeapon': null,
    'rightWeapon': null,
    'platform': null,
  };
  dataPatternActions = {
    'leftWeapon': [],
    'rightWeapon': [],
    'platform': [],
  };

  evaluateDataPattern();
  findDataPatternInBotMemory();
  applyDataPatternActions();
};

function findDataPatternInBotMemory() {
  let patternFound = false;

  for (var m in botMemory) {
    for (var i = 0; i < botMemory[m].length; i++) {
      patternFound = true;

      for (var j = 0; j < dataPattern[m].length; j++) {
        if (botMemory[m][i].code[j] !== '_' && dataPattern[m][j] !== botMemory[m][i].code[j]) {
          patternFound = false;
          break;
        };
      };

      if (patternFound) {
        dataPatternActions[m] = botMemory[m][i].actions;
        break;
      };
    };
  };
};

function applyDataPatternActions() {
  for (var k in dataPatternActions) {
    for (var i = 0; i < dataPatternActions[k].length; i++) {
      dataPatternActions[k][i]();
    };
  };
};

function doNothing() {
  return;
};
