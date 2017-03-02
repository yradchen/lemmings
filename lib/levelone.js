const Lemming = require("./lemming");
const Floor = require("./floor");

class Level {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.lemmings = [];
    this.addLemming();
    this.maxLemmings = 1;
    this.floors = this.setupFloors();
  }

  addLemming() {
    const lemmings = [];
    const startX = 20;
    const startY = 10;
    this.lemmings.push(new Lemming(startX, startY, this.ctx));
  }

  setupFloors() {
    let startX = 0;
    let startY = 70;
    let width = 300;
    let height = 50;
    let floors = [];

    for (var i = 0; i < 3; i++) {
      floors.push(new Floor(startX, startY, width, height, this.ctx));
      startY += 100;
      width += 50;
    }
    return floors;
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
