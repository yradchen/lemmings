
const Floor = require("../floor");
const Level = require("./level");

class LevelTwo extends Level {
  constructor(stage) {
    super(stage);
    this.maxLemmings = 2;
    this.exitXPosition = 90;
    this.exitYPosition = 260;
    this.entranceXPosition = 230;
    this.entranceYPosition = 20;
    this.diggers = 2;

  }

  setupWalls() {
    const wallOne = new Floor(350, 0, 25, 75, this.stage);
    return [wallOne];
  }

  setupFloors() {
    const floorOne = new Floor(150, 50, 200, 25, this.stage);
    const floorTwoLeft = new Floor(50, 125, 150, 25, this.stage);
    const floorTwoRight = new Floor(250, 125, 150, 25, this.stage);
    const floorThree = new Floor(50, 175, 250, 25, this.stage);
    const floorFour = new Floor(125, 225, 250, 25, this.stage);
    const floorFive = new Floor(100, 310, 20, 10, this.stage);
    return [floorOne, floorTwoLeft, floorTwoRight, floorThree, floorFour, floorFive];
  }
}

module.exports = LevelTwo;
