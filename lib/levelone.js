const Lemming = require("./lemming");
const Floor = require("./floor");

class Level {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.lemmings = [];
    this.addLemming();
    this.maxLemmings = 3;
    this.floors = this.setupFloors();
  }

  addLemming() {
    const lemmings = [];
    const startX = 20;
    const startY = 40;
    this.lemmings.push(new Lemming(startX, startY, this.ctx));
  }

  setupFloors() {
    let startX = 0;
    let startY = 170;
    let width = 480;
    let height = 50;
    let floors = [];

    for (var i = 0; i < 2; i++) {
      floors.push(new Floor(startX, startY, width, height, this.ctx));
      startY += 100;
    }
    return floors;
  }
  // c.fillRect(Distance from left(x cord), Distance from top(y cord), width, height)

  floor() {
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(0, 270,480,50);
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // this.floor();
    this.floors.forEach(floor => {
      // debugger
      floor.render();
    });

    this.lemmings.forEach(lemming => {
      lemming.render();
    });
  }

  moveLemmings() {
    this.lemmings.forEach(lemming => {
      // change to take in arguments (arguments being the accepted movements)
      lemming.moveLemming(this.floors);
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
