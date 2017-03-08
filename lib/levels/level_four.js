const Floor = require("../floor");
const Level = require("./level");

class LevelFour extends Level {
  constructor(stage) {
    super(stage);
    this.maxLemmings = 14;
    this.exitXPosition = 285;
    this.exitYPosition = 250;
    this.entranceXPosition = 300;
    this.entranceYPosition = 40;
    this.diggers = 2;
    this.exitSpeed = 1000;
  }

  setupWalls() {
    const wallOneLeft = new Floor(175, 40, 25, 65, this.stage);
    const wallOneRight = new Floor(400, 40, 25, 65, this.stage);
    return [wallOneLeft, wallOneRight];
  }

  setupFloors() {
    const floorOne = new Floor(200, 80, 200, 25, this.stage);
    const floorTwo = new Floor(290, 130, 30, 10, this.stage);
    const floorThree = new Floor(290, 160, 30, 10, this.stage);
    const floorFourRight = new Floor(320, 200, 150, 10, this.stage);
    const floorFourLeft = new Floor(140, 200, 150, 10, this.stage);
    const floorFive = new Floor(250, 300, 100, 10, this.stage);

    return [floorOne, floorTwo, floorThree, floorFourLeft, floorFourRight, floorFive];
  }
}

module.exports = LevelFour;
