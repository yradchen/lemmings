const Game = require("./game");

document.addEventListener("DOMContentLoaded", () => {
  const stage = new createjs.Stage("canvas");
  const game = new Game(stage);
  game.selectLevel();
});
