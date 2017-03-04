const Lemming = require("./lemming");
const Floor = require("./floor");
const Wall = require("./wall");

class LevelOne {
  constructor(ctx, canvas, stage) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.stage = stage;
    // debugger
    this.lemmings = [];
    this.addLemming();
    this.maxLemmings = 1;
    this.floors = this.setupFloors();
    this.walls = this.setupWalls();
  }

  addLemming() {
    const startX = 20;
    const startY = 10;
    this.lemmings.push(new Lemming(startX, startY, this.ctx, this.stage));
  }

  setupWalls() {
    const topWall = new Wall(90, 0, 50, 90, this.ctx);
    const bottomRightWall = new Wall(380, 0, 50, 320, this.ctx);
    const bottomLeftWall = new Wall(0, 220, 5, 50, this.ctx);
    const middleWall = new Wall(210, 150, 50, 90, this.ctx);
    return [topWall, bottomLeftWall, bottomRightWall, middleWall];
  }
// c.fillRect(Distance from left(x cord), Distance from top(y cord), width, height)
    // <canvas id="canvas" width="480" height="320"></canvas>
  setupFloors() {
    let topMostFloor = new Floor(0, 100, 10, 50, this.ctx);
    let topFloor = new Floor(30, 100, 200, 50, this.ctx);
    let middleFloor = new Floor(20, 190, 200, 50, this.ctx);
    let bottomFloor = new Floor(0, 270, 380, 50, this.ctx);
    return [topMostFloor, topFloor, middleFloor, bottomFloor];
  }

  render() {

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.floors.forEach(floor => {
      floor.render();
    });

    this.walls.forEach(wall => {
      wall.render();
    });

    this.lemmings.forEach(lemming => {
      lemming.render();
    });
  }

  moveLemmings() {
    this.lemmings.forEach(lemming => {
      lemming.moveLemming(this.floors, this.walls);
    });
  }

  start() {
    setInterval(() => {
      if (this.lemmings.length < this.maxLemmings) {
        this.addLemming();
      }
    }, 1000);
    const animateCallback = () => {
      this.moveLemmings();
      this.render();
      requestAnimationFrame(animateCallback);
    };
    let canvas = $("#canvas");
    canvas.on("click", this.handleClick.bind(this));

    animateCallback();
  }

  handleClick(e) {
    e.preventDefault();
    const xPosition = e.pageX - e.currentTarget.offsetLeft;
    const yPosition = e.pageY - e.currentTarget.offsetTop;

    for (var i = 0; i < this.lemmings.length; i++) {
      const lemming = this.lemmings[i];
      const lemmingLeftSide = lemming.xPosition;
      const lemmingRightSide = lemming.xPosition + lemming.width;
      const lemmingTop = lemming.yPosition;
      const lemmingBottom = lemming.yPosition + lemming.height;

      if ( (xPosition >= lemmingLeftSide & xPosition <= lemmingRightSide) & (yPosition >= lemmingTop & yPosition <= lemmingBottom) ) {
        lemming.dig = true;
        let floor = this.floors.filter( floor => {
          return floor.startY === lemmingBottom;
        });
        floor = floor[0];
        floor.holes.push(lemming.xPosition);

        break;
      }
    }
  }



}

module.exports = LevelOne;