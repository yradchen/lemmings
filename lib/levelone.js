const Lemming = require("./lemming");
const Floor = require("./floor");
const Exits = require("./exit_sprites");
// const Wall = require("./wall");
const Wall = require("./wall_sprites");
class LevelOne {
  constructor(stage) {
    this.stage = stage;
    this.lemmings = [];
    this.maxLemmings = 2;
    this.floors = this.setupFloors();
    this.walls = this.setupWalls();
    this.exitXPosition = 320;
    this.exitYPosition = 220;
    this.savedLemmings = 0;
  }

  addLemming() {
    const startX = 30;
    const startY = 10;
    const lemmingIndex = this.lemmings.length;
    this.lemmings.push(new Lemming(startX, startY, this.stage, this.lastStaticObject, lemmingIndex));
  }

  setupWalls() {
    const topWall = new Floor(90, 0, 40, 90, this.stage);
    const bottomRightWall = new Floor(380, 0, 50, 320, this.stage);
    const bottomLeftWall = new Floor(0, 220, 5, 50, this.stage);
    const middleWall = new Floor(210, 150, 50, 90, this.stage);
    return [topWall, bottomLeftWall, bottomRightWall, middleWall];
  }
// c.fillRect(Distance from left(x cord), Distance from top(y cord), width, height)
    // <canvas id="canvas" width="480" height="320"></canvas>
  setupFloors() {
    let topMostFloor = new Floor(0, 100, 10, 50, this.stage);
    let topFloor = new Floor(50, 100, 200, 50, this.stage);
    let middleFloor = new Floor(30, 190, 200, 20, this.stage);
    let bottomFloor = new Floor(0, 270, 380, 50, this.stage);
    return [topMostFloor, topFloor, middleFloor, bottomFloor];
  }

  render() {

    this.floors.forEach(floor => {
      floor.render();
    });
    //
    this.walls.forEach(wall => {
      wall.render();
    });
    if (this.stage.children) {
      this.lastStaticObject = this.stage.children.length;
    }
    this.SetupExit();

  }

  moveLemmings() {
    this.lemmings.forEach(lemming => {
      lemming.moveLemming(this.floors, this.walls);
    });
  }

  SetupExit() {
    const exit = Exits();
    exit.x = this.exitXPosition;
    exit.y = this.exitYPosition;
    this.exitYPosition += 50;
    this.stage.addChild(exit);
  }

  start() {
    this.render();
    const handleTick = (event) => {
      this.moveLemmings();
      this.stage.update(event);
      this.checkExit();
    };
    createjs.Ticker.on("tick", handleTick);
    setInterval(() => {
      if (this.lemmings.length < this.maxLemmings) {
        this.addLemming();
      }
    }, 2000);
    let canvas = $("#canvas");
    canvas.on("click", this.handleClick.bind(this));
  }

  handleClick(e) {
    e.preventDefault();
    const xPosition = e.pageX - e.currentTarget.offsetLeft;
    const yPosition = e.pageY - e.currentTarget.offsetTop;
    for (var i = 0; i < this.lemmings.length; i++) {
      const lemming = this.lemmings[i];
      // debugger
      const lemmingLeftSide = lemming.lemming.x;
      const lemmingRightSide = lemming.lemming.x + lemming.width;
      const lemmingTop = lemming.lemming.y;
      const lemmingBottom = lemming.lemming.y + lemming.height;

      if ( (xPosition >= lemmingLeftSide & xPosition <= lemmingRightSide) & (yPosition >= lemmingTop & yPosition <= lemmingBottom) ) {
        let floor = this.floors.filter( floor => {
          return floor.startY === lemmingBottom;
        });
        floor = floor[0];
        let timeOut = 300;
        if (floor) {
          lemming.handleDigging(floor, timeOut);
          floor.handleHole(lemming.lemming.x, timeOut);
        }

        break;
      }
    }
  }

  checkExit() {
    this.lemmings.forEach(lemming => {
      if (lemming.lemming.x === this.exitXPosition & (lemming.lemming.y + lemming.height) === this.exitYPosition) {
        this.stage.removeChild(lemming.lemming);
        delete this.lemmings[lemming.index];
        this.savedLemmings += 1;
    }
    });
  }





}

module.exports = LevelOne;
