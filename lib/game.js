const LevelOne = require("./levelone");

class Game {
  constructor(stage) {
    this.stage = stage;
    this.levelOne = new LevelOne(stage);
    // levelTwo
    this.currentLevel = this.levelOne;
  }

  start() {
    this.currentLevel.render();
  }
}


module.exports = Game;
