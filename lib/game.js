const LevelOne = require("./levelone");

class Game {
  constructor(stage) {
    this.stage = stage;
    this.levelOne = new LevelOne(stage, this.reStart.bind(this));
    // levelTwo
    this.currentLevel = this.levelOne;
    this.start2 = this.start2.bind(this);
  }

  start2() {
    this.stage.removeAllChildren();
    this.currentLevel.start();
    this.setupBoard();
  }

  reStart() {
    this.start2();
  }

  setupBoard() {
    this.setupWins();
    this.setupDiggers();
  }

  setupWins() {
    const maxLemmings = this.currentLevel.maxLemmings;
    const winCondition = Math.ceil(maxLemmings * 0.7);
    const condition = document.getElementById("win-conditions");
    condition.innerHTML = `Save ${winCondition} of ${maxLemmings} Lemmings`;
  }

  setupDiggers() {
    const diggers = this.currentLevel.diggers;
    const diggersLeft = document.getElementById("diggers-left");
    diggersLeft.innerHTML = `Diggers left: ${diggers}`;
  }
}


module.exports = Game;
