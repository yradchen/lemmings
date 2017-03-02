class Lemming {
  constructor(startX, startY, ctx) {
    this.height = 30;
    this.startX = startX;
    this.startY = startY;
    this.ctx = ctx;
    this.move = 2;

  }

  render() {
    // debugger
    this.ctx.beginPath();
    this.ctx.rect(this.startX, this.startY, 10, this.height);
    this.ctx.fillStyle = "green";
    this.ctx.fill();
    this.ctx.closePath();
  }

  moveLemming(floors) {
    // pass in just the X values????
    var moveDirection = "down";
    floors.forEach(floor => {
      if(this.startY + this.move > floor.startY - this.height) {
        // debugger
        moveDirection = "right";
      }
    });
    // console.log(moveDirection);

    if (moveDirection === "right") {
      // debugger
      this.startX += this.move;
    } else if (moveDirection === "down") {
      this.startY += this.move;
    }

    // if (this.startY + this.move > 270 - this.height) {
    //   this.startX += this.move;
    // } else {
    //   this.startY += this.move;
    // }
  }

}

// class Lemming {
//   constructor(ctx, canvas) {
//     this.ctx = ctx;
//     this.canvas = canvas;
//     this.startX = 20;
//     this.startY = 40;
//     this.lemmingHeight = 30;
//     this.move = 2;
//   }
//
//   drawlemming() {
//     this.ctx.beginPath();
//     this.ctx.rect(this.startX, this.startY, 10, this.lemmingHeight);
//     this.ctx.fillStyle = "green";
//     this.ctx.fill();
//     this.ctx.closePath();
//     this.moveLemming = this.moveLemming.bind(this);
//   }
//
//   moveLemming() {
//     // This doesn't work as it clears the lemming
//     // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
//     // this.floor();
//     // debugger
//     this.drawlemming();
//
//     if (this.startY + this.move > this.floorY - this.lemmingHeight) {
//       this.startX += this.move;
//     } else {
//
//       this.startY += this.move;
//     }
//   }
//
//   playLemming() {
//     setInterval(this.moveLemming.bind(this), 20);
//   }
//
// }




module.exports = Lemming;
