"use strict";

//// selectors

const options = document.querySelectorAll("[data-selection]");
const enemy = document.querySelector(".enemy");
const userScore = document.querySelector(".user-score");
const enemyScore = document.querySelector(".enemy-score");
const scoresContainer = document.querySelector(".score-container");

const gameOptions = [
  { name: "piedra", emoji: "✊", beat: "tijera" },
  { name: "papel", emoji: "✋", beat: "piedra" },
  { name: "tijera", emoji: "✌", beat: "papel" },
];

const scores = { player: 1, enemy: 1 };

///////////////////////////////////////////////////////////

//selecciona

const makeSelection = function (selection) {
  return gameOptions.find((el) => el.name === selection);
};

//seleccion del enemigo
const makeSelectionEnemy = function () {
  const selectionIndex = Math.floor(Math.random() * gameOptions.length);
  return gameOptions[selectionIndex];
};

//detemina quien gana

const isWinner = function (playerSelec, enemySelec) {
  return playerSelec.beat === enemySelec.name;
};

//actualiza el DOM con los resultados

const UpdateScore = function (playerW, enemyW) {
  if (playerW) userScore.textContent = scores.player++;
  if (enemyW) enemyScore.textContent = scores.enemy++;
};

const loseOrWin = function (scores) {
  const result = document.createElement("h1");
  if (scores.player > 3) {
    scoresContainer.textContent = "";
    result.textContent = "You win";
    result.classList.add("win-screen");
    enemy.textContent = "😎";
    scoresContainer.appendChild(result);
  }
  if (scores.enemy > 3) {
    scoresContainer.textContent = "";
    result.textContent = "You Lose";
    result.classList.add("lose-screen");
    enemy.textContent = "😢";
    scoresContainer.appendChild(result);
  }
};

// funcion que pone en marcha al juego

const playGame = function (element) {
  if (scores.player > 3 || scores.enemy > 3) return; //// evita seguir jugando
  const selection = element.dataset.selection;
  const playerSelection = makeSelection(selection);
  const enemySelection = makeSelectionEnemy();
  enemy.textContent = enemySelection.emoji;
  const playerWin = isWinner(playerSelection, enemySelection);
  const enemyWin = isWinner(enemySelection, playerSelection);

  UpdateScore(playerWin, enemyWin);
  loseOrWin(scores);
};

/// add event listeners
options.forEach(
  (optionEl) =>
    optionEl.addEventListener("click", playGame.bind(null, optionEl)) //utilizo bind para poder pasar argumentos
);
