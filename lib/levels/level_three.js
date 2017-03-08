const Floor = require("../floor");
const Level = require("./level");

class LevelThree extends Level {
  constructor(stage) {
    super(stage);
    this.maxLemmings = 1;
    this.exitXPosition = 390;
    this.exitYPosition = 260;
    this.entranceXPosition = 510;
    this.entranceYPosition = 20;
    this.diggers = 4;

  }

  setupWalls() {
    // options =
    let options = [70, 120, 170, 220];
    const rand = options[Math.floor(Math.random() * options.length)];
    const rand2 = options[Math.floor(Math.random() * options.length)];
    const wallOneLeft = new Floor(0, rand2, 10, 30, this.stage);
    const wallOneRight = new Floor(650, rand, 20, 30, this.stage);
    return [wallOneLeft, wallOneRight];
  }

  setupFloors() {
    const floorOne = new Floor(150, 50, 100, 10, this.stage);
    const floorTwo = new Floor(500, 100, 150, 10, this.stage);
    const floorThree = new Floor(500, 150, 150, 10, this.stage);
    const floorFour = new Floor(500, 200, 150, 10, this.stage);
    const floorFive = new Floor(500, 250, 150, 10, this.stage);
    const floorSix = new Floor(400, 310, 100, 10, this.stage);

    return [floorTwo, floorThree, floorFour, floorFive, floorSix];
  }
}

module.exports = LevelThree;
