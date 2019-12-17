'use strict';

let generationsAmount = null;
let testCyclesAmount = null;
let populationMaxSize = 30;
let currentGeneration = 0;
let population = [];
let bestSpecimenScore = 0;
let generation = 0;

function evolveGenotype() {
  generationsAmount = document.getElementById('generationsAmount').value;
  testCyclesAmount = document.getElementById('testCyclesAmount').value;
  if (population[0] === undefined) populationInit();

  for (; generation < generationsAmount; generation++) {
    nextGeneration();
  };

  applyGenotype(population[0]);
  bestSpecimenScoreSpan.innerHTML = bestSpecimenScore;
  bestSpecimenGenotypeTextarea.value = JSON.stringify(population[0]);
  testPhenotype();
};

function populationInit() {
  population[0] = {};
  for (let k in botMemory) {
    population[0][k] = [];
    for (let i = 0; i < botMemory[k].length; i++) {
      population[0][k][i] = {
        'id': botMemory[k][i].id,
        'actions': [
          possibleActionsStrings[k][Math.floor(Math.random() * possibleActionsStrings[k].length)],
        ],
      };
    };
  };
};

function nextGeneration() {
  fillPopulation();
  mutation();
  fitnessFunction();
  selection();
  status();
};

function fillPopulation() {
  for (let i = 1; i < populationMaxSize; i++) {
    population.push(JSON.parse(JSON.stringify(population[0])));
  };
};

function mutation() {
  for (let i = 1; i < population.length; i++) {
    for (let k in population[i]) {
      for (var j = 0; j < population[i][k].length; j++) {
        population[i][k][j].actions = [
          possibleActionsStrings[k][Math.floor(Math.random() * possibleActionsStrings[k].length)],
        ];
      };
    };
  };
};

function fitnessFunction() {
  for (let i = 1; i < population.length; i++) {
    applyGenotype(population[i]);
    testGenotype();

    if (score >= bestSpecimenScore) {
      population[0] = JSON.parse(JSON.stringify(population[i]));
      bestSpecimenScore = score;
    };
  };
};

function selection() {
  population = population.slice(0, 1);
};

function status() {
  console.clear();
  console.log(`generation: ${generation}`);
  console.log(`bestSpecimenScore: ${bestSpecimenScore}`);
  console.log(`bestSpecimen: ${JSON.stringify(population[0])}`);
};

function applyGenotype(specimen) {
  for (var k in botMemory) {
    for (var j = 0; j < botMemory[k].length; j++) {
      for (var n = 0; n < specimen[k].length; n++) {
        if (specimen[k][n].id === botMemory[k][j].id) {
          botMemory[k][j].actions = [possibleActionsFunctions[k][specimen[k][n].actions[0]]];
          break;
        };
      };
    };
  };
};

function testGenotype() {
  gameOver = false;
  score = 0;
  for (let cycle = 0; cycle < testCyclesAmount; cycle++) {
    moveProjectiles();
    asteroidsProjectilesCollisionDetection();
    moveStarsAndAsteroids(asteroids, asteroidsSpeed);
    asteroidsPlayerShipCollisionDetection();
    botDecisions();
    if (gameOver === true) break;
  };
};
