const LevelOne = require("./levelone");

class Game {
  constructor(ctx, canvas) {
    this.stage = new createjs.Stage("canvas");
    // debugger
    this.levelOne = new LevelOne(ctx, canvas, this.stage);
    // levelTwo
    this.currentLevel = this.levelOne;
  }

  start() {
    this.currentLevel.start();
  }
}


module.exports = Game;
