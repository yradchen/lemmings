const Lemming = require("./lemming");


class Level {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.lemmings = [];
    this.addLemming();
    this.maxLemmings = 3;
  }

  setupLemmings() {
    const lemmings = [];
    const numLemmings = 3;
    // change to const - just used for testing
    let startX = 20;
    const startY = 40;

    for (var i = 0; i < numLemmings; i++) {
      // remove - testing for moving
      startX += 25;
      lemmings.push(new Lemming(startX, startY, this.ctx));
    }
    return lemmings;
  }

  addLemming() {
    const lemmings = [];
    const startX = 20;
    const startY = 40;
    this.lemmings.push(new Lemming(startX, startY, this.ctx));
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.lemmings.forEach(lemming => {
      lemming.render(this.ctx);
    });
  }

  moveLemmings() {
    this.lemmings.forEach(lemming => {
      // change to take in arguments (arguments being the accepted movements)
      lemming.moveLemming();
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



// const lemming = require("./lemming");
//
// class Level {
//   constructor(ctx, canvas) {
//     this.ctx = ctx;
//     this.floorY = 270;
//     // this.move = 2;
//     // this.startX = 20;
//     // this.startY = 40;
//     // this.lemmingHeight = 30;
//     this.canvas = canvas;
//     this.lemmings = [new lemming(ctx, canvas), new lemming(ctx, canvas), new lemming(ctx, canvas)];
//
//   }
//
//   floor() {
//     this.ctx.fillStyle = "red";
//     this.ctx.fillRect(0,this.floorY,480,50);
//   }
//
//   moveAllLemmings() {
//     for (var i = 0; i < this.lemmings.length; i++) {
//       // let lemming = this.lemmings[i];
//       const timeOut = i * 5;
//       setTimeout( this.lemmings[i].moveLemming(), timeOut);
//
//     }
//   }
//
//   play() {
//     // debugger
//       // setTimeout( playLemming, timeOut);
//       // this.lemmings[i].playLemming();
//     const animateCallback = () => {
//       this.moveAllLemmings();
//       this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
//       requestAnimationFrame(animateCallback);
//     };
//     animateCallback();
//   }
// }
//
// // Drawlemming = () => {
// //   c.beginPath();
// //   c.rect(x, y, 10, lemmingHeight);
// //   c.fillStyle = "green";
// //   c.fill();
// //   c.closePath();
// // };
//
//
// // const moveLemming = () => {
// //   c.clearRect(0, 0, canvas.width, canvas.height);
// //   floor();
// //   Drawlemming();
// //   if (y + moveDown > floorY - lemmingHeight) {
// //     x -= moveRight;
// //   } else {
// //     y += moveDown;
// //   }
// // };
// //
// // setInterval(moveLemming, 20);
//
//
//
// module.exports = Level;
