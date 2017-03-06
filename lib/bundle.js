/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Level = __webpack_require__(1);

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext('2d');
  const level = new Level(ctx);
  level.render();
});

// import the map....

//
// document.addEventListener("DOMContentLoaded", function(){
//   const canvas = document.getElementById("canvas");
//   const c = canvas.getContext('2d');
//
//   // horizontal 'floor'
// const floorY = 270;
// const floor = () => {
//   c.fillStyle = "red";
//   c.fillRect(0,floorY,480,50);
// };
//
// // green rectangle
//
// let moveDown = 2;
// let moveRight = -2;
// let x = 20;
// let y = 40;
//
// const lemmingHeight = 30;
// const Drawlemming = () => {
//   c.beginPath();
//   c.rect(x, y, 10, lemmingHeight);
//   c.fillStyle = "green";
//   c.fill();
//   c.closePath();
// };
//
// const moveLemming = () => {
//   c.clearRect(0, 0, canvas.width, canvas.height);
//   floor();
//   Drawlemming();
//   if (y + moveDown > floorY - lemmingHeight) {
//     x -= moveRight;
//   } else {
//     y += moveDown;
//   }
// };
//
// setInterval(moveLemming, 20);
// });






// stop height for a lemming is the Y coord of floor - height of lemming


// c.fillRect(Distance from left(x cord), Distance from top(y cord), width, height)
//
// {/* <html>
// <body>
// <canvas width="800" height="600" id="canvas"></canvas>
// <script>
// var canvas = document.getElementById('canvas');
// var c = canvas.getContext('2d');
// c.fillStyle = "red";
// c.fillRect(100,100,400,300);
// </script>
// </body>
// </html>  */}
//
// {/* <html>
// <body>
// <canvas width="800" height="600" id="canvas"></canvas>
// <script>
// var canvas = document.getElementById('canvas');
// var c = canvas.getContext('2d');
// c.fillStyle = "red";
// c.fillRect(100,100,400,300);
// </script>
// </body>
// </html>  */}
//
// // Each level would be canvas with drawn images.
//
//
// // how to handle the floor disapearing???
// // Have it handled in the canvas drawing where I pass in an x and y coordinate? This updates every second How do I tell it to stop, when I get to the bottom of the ?
// // What happens when I dig through a floor and get to the air? Trigger a stop dig?
//
//
// // Handling the floor disappearing


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Lemming = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./lemming2\""); e.code = 'MODULE_NOT_FOUND';; throw e; }()));


class Level {
  constructor(ctx) {
    lemmings = [];
    for (var i = 0; i < 3; i++) {
      lemmings.push(new Lemming(20, 40, ctx));
    }

  }

  render() {
    lemmings.forEach(lemming => {
      lemming.render(this.ctx);
    });
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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0);
(function webpackMissingModule() { throw new Error("Cannot find module \"run\""); }());
(function webpackMissingModule() { throw new Error("Cannot find module \"server\""); }());


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map