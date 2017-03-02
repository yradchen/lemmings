class Lemming {
  constructor(startX, startY, ctx) {
    this.height = 30;
    this.xPosition = startX;
    this.yPosition = startY;
    this.width = 10;
    this.ctx = ctx;
    this.move = 2;

  }

  render() {
    // debugger
    this.ctx.beginPath();
    this.ctx.rect(this.xPosition, this.yPosition, this.width, this.height);
    this.ctx.fillStyle = "green";
    this.ctx.fill();
    this.ctx.closePath();
  }

  moveLemming(floors) {
    // pass in just the X values????
    var moveDirection;
    // var moveDirection = "down";

      // debugger
    for (var i = 0; i < floors.length; i++) {
      const floor = floors[i];
      // debugger
      if (this.yPosition + this.height < floor.startY) {
        moveDirection = "down";
      } else if (this.xPosition < floor.width) {
        moveDirection = "right";
        break
      }
      // if ( (this.yPosition + this.move + this.height) > floor.startY) {
      //   moveDirection = "right";
      //   break;
      // } else if (floor.width > this.xPosition + this.width) {
      //   moveDirection = "down";
      //   break
      // }
    }
      // if (floor.width > this.xPosition + this.width) {
      //   debugger
      //   moveDirection = "down";
      // } else if (this.yPosition + this.move > floor.startY - this.height) {
      //   moveDirection = "right";
      // }

    // console.log(moveDirection);

    if (moveDirection === "right") {
      this.xPosition += this.move;
    } else if (moveDirection === "down") {
      this.yPosition += this.move;
    }

  }

}
// when do I move down?
// Move right if the lemmings startY + the direction it's moving > the floors start Y - the lemmings height.
// Move down if the lemmings Position X is > the floors position




module.exports = Lemming;
