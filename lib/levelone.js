const Lemming = require("./lemming");
const Floor = require("./floor");
const Wall = require("./wall");

class Level {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.lemmings = [];
    this.addLemming();
    this.maxLemmings = 5;
    this.floors = this.setupFloors();
    this.walls = this.setupWalls();
  }

  addLemming() {
    const lemmings = [];
    const startX = 20;
    const startY = 10;
    this.lemmings.push(new Lemming(startX, startY, this.ctx));
  }

  setupWalls() {
    let topWall = new Wall(90, 0, 50, 90, this.ctx);
    let bottomRightWall = new Wall(380, 0, 50, 320, this.ctx);
    let bottomLeftWall = new Wall(0, 220, 5, 50, this.ctx);
    let middleWall = new Wall(210, 150, 50, 90, this.ctx);
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
    // this.floor();
    this.floors.forEach(floor => {
      // debugger
      floor.render();
    });

    this.walls.forEach(wall => {
      // debugger
      wall.render();
    });

    this.lemmings.forEach(lemming => {
      lemming.render();
    });
  }

  moveLemmings() {
    this.lemmings.forEach(lemming => {
      // change to take in arguments (arguments being the accepted movements)
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

    animateCallback();
  }



}

module.exports = Level;

// ideas for floors -
// have a separate class that takes an x and a y and will "render" a floor at those positions;
// have a setup floor method in levelone that changes the X position and pushes new floors into the this.floors array.
// iterate through that array and render the floors.

// How do I handle the lemmings knowing where the X points of the floor are?
// Into the move lemming function I pass all the floors.
// In the move lemmings function I look at floor.x to see where I have to stop.
