class Lemming {
  constructor(startX, startY, ctx) {
    this.height = 30;
    this.xPosition = startX;
    this.yPosition = startY;
    this.width = 10;
    this.ctx = ctx;
    this.move = 1;
    this.direction = "right";
    this.dig = false;
  }

  render() {

    // c.strokeStyle = 'rgb(0,128,0)';
    this.ctx.beginPath();
    this.ctx.rect(this.xPosition, this.yPosition, this.width, this.height);
    if (this.dig) {
      this.ctx.fillStyle = "blue";
    } else {
      this.ctx.fillStyle = "green";
    }
    this.ctx.fill();
    this.ctx.closePath();
  }

  moveLemming(floors, walls) {
    // pass in just the X values????
    var verticalDirection = false;
    // var verticalDirection = "down";
    // debugger
      // debugger
    for (let i = 0; i < floors.length; i++) {
      const floor = floors[i];
      const floorBottom = floor.startY + floor.height;
      const lemmingBottom = this.yPosition + this.height;

      if (this.yPosition >= floorBottom ) {
         continue;
      }
      for (var j = 0; j < floor.holes.length; j++) {
        const hole = floor.holes[j];
        if (this.xPosition === hole) {
          verticalDirection = true;
        }
      }

      let floorEdge = floor.startX + floor.width;

      if (this.xPosition + this.width <= floor.startX) {
        verticalDirection = true;
        this.dig = false;
      } else if (this.xPosition > floorEdge) {
        verticalDirection = true;
        this.dig = false;
      } else if (lemmingBottom !== floor.startY) {
        verticalDirection = true;
        this.dig = false;
      }

      break;
    }
    if (verticalDirection) {
      this.yPosition += this.move;
    } else {
      for (let i = 0; i < walls.length; i++) {
        const wall = walls[i];
        const leftEdge = wall.startX;
        const rightEdge = wall.startX + wall.width;

        const wallBottom = wall.startY + wall.height;
        if (this.yPosition >= wallBottom ) {
           continue;
        }

        if (this.xPosition + this.width === leftEdge & this.direction === 'right') {
          this.direction = "left";
          break;
        } else if (this.direction === 'left' & rightEdge === this.xPosition) {
          this.direction = "right";
          break;
        }
      }
      if (this.direction === "right") {
        this.xPosition += this.move;
      } else {
        this.xPosition -= this.move;
      }

    }

  }

}
// when do I move down?
// Move right if the lemmings startY + the direction it's moving > the floors start Y - the lemmings height.
// Move down if the lemmings Position X is > the floors position




module.exports = Lemming;
