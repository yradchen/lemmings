const LevelOne = require("./levelone");

class Game {
  constructor(ctx, canvas) {
    this.levelOne = new LevelOne(ctx, canvas);
  }

  start() {
    this.levelOne.start();
    // let me = $("body");
    // me.on("click")
  }
}


module.exports = Game;
