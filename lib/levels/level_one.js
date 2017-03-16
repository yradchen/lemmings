const Floor = require("../floor");
const Level = require("./level");

class LevelOne extends Level {
  constructor(stage) {
    super(stage);
    this.maxLemmings = 10;
    this.exitXPosition = 540;
    this.exitYPosition = 225;
    this.entranceXPosition = 150;
    this.entranceYPosition = 60;
    this.diggers = 5;
  }

  setupWalls() {
    const LeftWall = new Floor(0, 0, 50, 325, this.stage);
    const MidWall = new Floor(400, 0, 50, 200, this.stage);
    const RightWall = new Floor(600, 0, 50, 325, this.stage);
    return [LeftWall, MidWall, RightWall];
  }

  setupFloors() {
    const midFloor = new Floor(50, 150, 350, 50, this.stage);
    const bottomFloor = new Floor(50, 275, 550, 50, this.stage);
    return [midFloor, bottomFloor];
  }

}

module.exports = LevelOne;
