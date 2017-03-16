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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class Floor {
  constructor(startX, startY, width, height, stage) {
    this.startX = startX;
    this.startY = startY;
    this.height = height;
    this.width = width;
    this.stage = stage;
    this.holes = {};
  }

  render() {
    var img = new Image();
    var s = new createjs.Shape();
    img.onload = () => {
      s.graphics.beginBitmapFill(img, "repeat");
      s.graphics.drawRect(this.startX, this.startY, this.width, this.height);
    };
    img.src = "./assets/images/Floor_Texture.png";
    this.stage.addChild(s);
  }

  handleHole(xPosition, timeOut) {
    this.holes[xPosition] = 1;
    const createHole = setInterval(() => {
      if (this.holes[xPosition] < this.height) {
        this.holes[xPosition] += 1;
      } else {
        clearInterval(createHole);
      }
    }, timeOut + 20);
  }

}

module.exports = Floor;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Lemming = __webpack_require__(3);
const Floor = __webpack_require__(0);
const Exits = __webpack_require__(9);
const Entrances = __webpack_require__(8);

class Level {
  constructor(stage) {
    this.stage = stage;
    this.lemmings = [];
    this.floors = this.setupFloors();
    this.walls = this.setupWalls();
    this.savedLemmings = 0;
    this.lostLemmings = 0;
    this.exitSpeed = 2000;
  }

  addLemming() {
    const startX = this.entranceXPosition;
    const startY = this.entranceYPosition;
    const lemmingIndex = this.lemmings.length;
    this.lemmings.push(new Lemming(startX, startY, this.stage, this.lastStaticObject, lemmingIndex));
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
    this.setupExit();
    this.setupEntrance();

  }

  setupEntrance() {
    const entrance = Entrances();
    const entranceSpriteOffset = 12;
    entrance.x = this.entranceXPosition - entranceSpriteOffset;
    entrance.y = this.entranceYPosition - entranceSpriteOffset;
    this.stage.addChild(entrance);
  }

  setupExit() {
    const exit = Exits();
    exit.x = this.exitXPosition;
    exit.y = this.exitYPosition;
    this.exitYPosition += 50;
    this.stage.addChild(exit);
  }

  start() {
    this.render();
    const handleTick = (event) => {
      this.lemmings.forEach(lemming => {
        lemming.moveLemming(this.floors, this.walls);
        this.checkExit(lemming);
        this.checkDeath(lemming);
      });
      this.stage.update(event);
      this.checkGameOver();
    };
    this.ticker = createjs.Ticker.on("tick", handleTick);
    // createjs.Ticker.removeAllEventListeners();
    setInterval(() => {
      if (this.lemmings.length < this.maxLemmings) {
        this.addLemming();
      }
    }, this.exitSpeed);
    let canvas = $("#canvas");
    canvas.on("click", this.handleClick.bind(this));
  }

  handleClick(e) {
    e.preventDefault();
    if (this.diggers > 0) {
      const xPosition = e.pageX - e.currentTarget.offsetLeft;
      const yPosition = e.pageY - e.currentTarget.offsetTop;

      for (var i = 0; i < this.lemmings.length; i++) {
        const lemming = this.lemmings[i];
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
            this.diggers -= 1;
            this.changeDiggerDom();
            lemming.handleDigging(floor, timeOut);
            floor.handleHole(lemming.lemming.x, timeOut);
          }

          break;
        }
      }
    } else {
    }
  }

  changeDiggerDom() {
    const diggersLeft = document.getElementById("diggers-left");
    diggersLeft.innerHTML = `Diggers left: ${this.diggers}`;
  }

  checkDeath(lemming) {
    const rightEdge = this.stage.canvas.width;
    const bottomEdge = this.stage.canvas.height;
    const lemmingBottom = lemming.lemming.y + lemming.height;

    if (lemmingBottom >= bottomEdge || lemming.lemming.x > rightEdge) {
      this.stage.removeChild(lemming.lemming);
      this.lostLemmings += 1;
      delete this.lemmings[lemming.index];
      this.updateLostCount();
    }
  }

  checkExit(lemming) {

    const rightSideExit = this.exitXPosition + 30;
    if (lemming.lemming.x >= this.exitXPosition & lemming.lemming.x <= rightSideExit) {
      if (lemming.lemming.y + lemming.height === this.exitYPosition) {
        this.stage.removeChild(lemming.lemming);
        delete this.lemmings[lemming.index];
        this.savedLemmings += 1;
        this.updateWinCount();
      }
    }
    // if (lemming.lemming.x === this.exitXPosition & (lemming.lemming.y + lemming.height) === this.exitYPosition) {
    //
    // }

  }

  updateLostCount() {
    const lost = document.getElementById("lost-lemmings");
    lost.innerHTML = `Lost: ${this.lostLemmings}`;
  }

  updateWinCount() {
    const wins = document.getElementById("saved-info");
    wins.innerHTML = `Saved: ${this.savedLemmings}`;
  }

  checkGameOver() {
    if (this.lostLemmings + this.savedLemmings === this.maxLemmings) {
      let canvas = $("#canvas");
      canvas.off("click");
      // this.stopGameTimer();
      this.stage.removeAllChildren();
      createjs.Ticker.removeAllEventListeners();
      this.stage.removeAllEventListeners();
      this.stage.clear();
      this.nextStage(this.savedLemmings);
    }
  }

}

module.exports = Level;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const LevelOne = __webpack_require__(5);
const LevelTwo = __webpack_require__(7);
const LevelThree = __webpack_require__(6);
const LevelFour = __webpack_require__(4);

class Game {
  constructor() {
    this.levels = [LevelOne, LevelTwo, LevelThree, LevelFour];
    this.select = this.select.bind(this);
  }

    select(e) {
      e.preventDefault();
      this.levelNumber = parseInt(e.currentTarget.innerHTML[0]);
      const selectedLevel = this.levelNumber - 1;
      const level = this.levels[selectedLevel];
      const stage = new createjs.Stage("canvas");
      this.removeLevelSelectionScreen();
      this.currentLevel = new level(stage);
      this.play();
    }

    setupLost() {
      const lost = document.getElementById("lost-lemmings");
      lost.innerHTML = `Lost: 0`;
    }


    removeLevelSelectionScreen() {
      const levelSelectionScreen = document.getElementById("options");
      levelSelectionScreen.classList.add("hidden");
    }

    addLevelSelectionScreen() {
      const levelSelectionScreen = document.getElementById("options");
      levelSelectionScreen.classList.remove("hidden");
    }

    bsod(e) {
      if (this.bsodset === true) return;
      const x = document.getElementById("x");
      const body = document.getElementById("body");
      x.addEventListener("click", () => {
        bsod.classList.remove("hidden");
        this.bsod = body.addEventListener('keypress', this.exitBsod);
      });
      this.bsodset = true;
    }
    exitBsod(e) {
      e.target.removeEventListener('keypress', this.exitBsod);
      bsod.classList.add("hidden");
    }

    selectLevel() {
      this.bsod();
      const levels = document.getElementsByClassName("levels");
      for (var i = 0; i < levels.length; i++) {
        levels[i].addEventListener("click", this.select);
      }
    }

  play() {
    this.currentLevel.stopGameTimer = this.stopTimer.bind(this);
    this.currentLevel.nextStage = this.nextStage.bind(this);
    // this.startTimer(300);
    this.currentLevel.start();
    this.setupBoard();
  }

  winningMessage(result) {
    let message = `Level ${this.levelNumber} lost! Please pick another level`;
    if (result) {
      message = "Congratulations on beating the level! Pick another level to play.";
    }
    const docMessage = document.getElementById("message");
    docMessage.innerHTML = message;
  }

  setupBoard() {
    this.setupWins();
    this.setupDiggers();
    this.setupLost();
    this.setupSaved();
  }
  setupSaved() {
    const wins = document.getElementById("saved-info");
    wins.innerHTML = `Saved: 0`;
  }


  nextStage(savedLemmings) {
    if (savedLemmings >= this.winCondition) {
      this.winningMessage(true);
    } else {
      this.winningMessage(false);
    }
    this.addLevelSelectionScreen();
    this.selectLevel();
  }

  setupWins() {
    const maxLemmings = this.currentLevel.maxLemmings;
    this.winCondition = Math.ceil(maxLemmings * 1.0);
    const condition = document.getElementById("win-conditions");
    condition.innerHTML = `Save ${this.winCondition} of ${maxLemmings} Lemmings`;
  }

  setupDiggers() {
    const diggers = this.currentLevel.diggers;
    const diggersLeft = document.getElementById("diggers-left");
    diggersLeft.innerHTML = `Diggers left: ${diggers}`;
  }

  startTimer(duration) {
    this.Timer = setInterval( () => {
      let minutes = Math.floor(duration / 60);
      let seconds = duration % 60;
      if (duration === 0) this.stopTimer();
      if (minutes < 10) minutes = "0" + minutes;
      if (seconds < 10) seconds = "0" + seconds;

      duration -= 1;
      const timeLeft = document.getElementById("time-left");
      timeLeft.innerHTML = `${minutes}:${seconds}`;
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.Timer);
  }

}


module.exports = Game;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// import walkingLemmings from './sprites';
const walkingLemmings = __webpack_require__(10);
class Lemming {
  constructor(startX, startY, stage, lastStaticObject, index) {
    this.index = index;
    this.lemming = walkingLemmings();
    this.lemming.x = startX;
    this.lemming.y = startY;
    this.lemming.scaleX = 2.0;
    this.lemming.scaleY = 2.0;
    stage.addChild(this.lemming);
    this.stage = stage;
    this.height = 20;
    this.width = 12;
    this.move = 1;
    this.direction = "right";
    this.dig = false;
    this.lastStaticObject = lastStaticObject;
  }

  handleDigging(floor, timeOut) {
    this.dig = true;
    this.lemming.scaleY = 1.5;
    this.lemming.scaleX = 1.3;
    this.floor = floor;
    this.lemming.gotoAndPlay("digging");
    const floorBottom = floor.startY + floor.height;

    const digInterval = setInterval(() => {
      const lemmingBottom = this.lemming.y + this.height;
        if (lemmingBottom < floorBottom) {
          this.lemming.y += this.move;
          const hole = new createjs.Shape();
          hole.graphics.beginFill("black").drawRect(this.lemming.x, lemmingBottom, 12, 1 );
          this.stage.addChildAt(hole, this.lastStaticObject);

        } else {
          this.dig = false;
          this.lemming.scaleY = 2.0;
          this.lemming.scaleX = 2.0;
          clearInterval(digInterval);
        }

    }, timeOut);
  }

  moveLemming(floors, walls) {
    if (this.dig) {
    } else if (this.inHole) {
      this.handleHoleFalling();
    }
    else {
      this.checkFallingAnimation();
      this.handleFloors(floors);
      if (this.verticalDirection) {
        this.lemming.y += this.move;
      } else {
        this.handleWalls(walls);
      }
    }


  }

  handleHoleFalling(hole, floorStart, floor) {
    const lemmingBottom = this.lemming.y + this.height;
    if (hole) {
      this.inHole = true;
      this.checkFallingAnimation();
      this.floor = floor;
    }
    if (lemmingBottom >= this.floor.startY + this.floor.height) {
      this.inHole = false;
    }
    const holeDepth = this.floor.holes[this.lemming.x] + this.floor.startY;

    if (holeDepth > lemmingBottom ) {
      this.lemming.y += this.move;
    } else {
      this.checkFallingAnimation();
    }
  }

  handleFloors(floors) {
    this.verticalDirection = true;
    for (let i = 0; i < floors.length; i++) {
      const floor = floors[i];
      const floorBottom = floor.startY + floor.height;
      const lemmingBottom = this.lemming.y + this.height;
      const floorEdge = floor.startX + floor.width;
      let xPosition = this.lemming.x;
      if (this.direction === "left") xPosition += 12;
      if (this.direction === "right") xPosition += 12;

      if (lemmingBottom < floor.startY) continue;
      if (lemmingBottom >= floorBottom) continue;
      if (this.lemming.x > floorEdge) continue;
      if (xPosition < floor.startX) continue;

      const floorHole = floor.holes[this.lemming.x];
      if (floorHole) {
        this.handleHoleFalling(floorHole, floor.startY, floor);
      }
      this.verticalDirection = false;

      break;
    }
  }
  checkFallingAnimation() {
    if (this.verticalDirection & this.lemming.currentAnimation !== "falling") {
      this.lemming.gotoAndPlay("falling");
    } else if (this.verticalDirection === false & this.lemming.currentAnimation === "falling") {
      if (this.direction === "right") {
        this.lemming.gotoAndPlay("walkRight");
       } else {
         this.lemming.gotoAndPlay("walkLeft");
       }
    }
  }

  handleTurning(leftEdge, rightEdge) {
    if (this.lemming.x + this.width === leftEdge & this.direction === 'right') {
      this.lemming.gotoAndPlay("walkLeft");
      this.direction = "left";
    } else if (this.direction === 'left' & rightEdge === this.lemming.x) {
      this.direction = "right";
      this.lemming.gotoAndPlay("walkRight");
    }
  }

  handleWalls(walls) {
    if (this.inHole) {

    } else {
      for (let i = 0; i < walls.length; i++) {
        const wall = walls[i];
        const leftEdge = wall.startX;
        const rightEdge = wall.startX + wall.width;
        const wallBottom = wall.startY + wall.height;
        const wallTop = wall.startY;
        const lemmingBottom = this.lemming.y + this.height;

        if (this.lemming.y >= wallBottom || lemmingBottom < wallTop) {
           continue;
        }
        this.handleTurning(leftEdge, rightEdge);
      }
      if (this.direction === "right") {
        this.lemming.x += this.move;
      } else {
        this.lemming.x -= this.move;
      }
    }

  }

}



module.exports = Lemming;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Floor = __webpack_require__(0);
const Level = __webpack_require__(1);

class LevelFour extends Level {
  constructor(stage) {
    super(stage);
    this.maxLemmings = 14;
    this.exitXPosition = 285;
    this.exitYPosition = 250;
    this.entranceXPosition = 300;
    this.entranceYPosition = 40;
    this.diggers = 2;
    this.exitSpeed = 1000;
  }

  setupWalls() {
    const wallOneLeft = new Floor(175, 40, 25, 65, this.stage);
    const wallOneRight = new Floor(400, 40, 25, 65, this.stage);
    return [wallOneLeft, wallOneRight];
  }

  setupFloors() {
    const floorOne = new Floor(200, 80, 200, 25, this.stage);
    const floorTwo = new Floor(290, 130, 30, 10, this.stage);
    const floorThree = new Floor(290, 160, 30, 10, this.stage);
    const floorFourRight = new Floor(320, 200, 150, 10, this.stage);
    const floorFourLeft = new Floor(140, 200, 150, 10, this.stage);
    const floorFive = new Floor(250, 300, 100, 10, this.stage);

    return [floorOne, floorTwo, floorThree, floorFourLeft, floorFourRight, floorFive];
  }
}

module.exports = LevelFour;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Floor = __webpack_require__(0);
const Level = __webpack_require__(1);

class LevelOne extends Level {
  constructor(stage) {
    super(stage);
    this.maxLemmings = 10;
    this.exitXPosition = 540;
    this.exitYPosition = 225;
    this.entranceXPosition = 150;
    this.entranceYPosition = 60;
    this.diggers = 5;
  }

  setupWalls() {
    const LeftWall = new Floor(0, 0, 50, 325, this.stage);
    const MidWall = new Floor(400, 0, 50, 200, this.stage);
    const RightWall = new Floor(600, 0, 50, 325, this.stage);
    return [LeftWall, MidWall, RightWall];
  }

  setupFloors() {
    const midFloor = new Floor(50, 150, 350, 50, this.stage);
    const bottomFloor = new Floor(50, 275, 550, 50, this.stage);
    return [midFloor, bottomFloor];
  }

}

module.exports = LevelOne;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const Floor = __webpack_require__(0);
const Level = __webpack_require__(1);

class LevelThree extends Level {
  constructor(stage) {
    super(stage);
    this.maxLemmings = 1;
    this.exitXPosition = 390;
    this.exitYPosition = 260;
    this.entranceXPosition = 510;
    this.entranceYPosition = 20;
    this.diggers = 4;

  }

  setupWalls() {
    let options = [70, 120, 170, 220];
    const rand = options[Math.floor(Math.random() * options.length)];
    const wallOneLeft = new Floor(0, rand, 10, 30, this.stage);
    const wallOneRight = new Floor(650, rand, 20, 30, this.stage);
    return [wallOneLeft, wallOneRight];
  }

  setupFloors() {
    const floorOne = new Floor(150, 50, 100, 10, this.stage);
    const floorTwo = new Floor(500, 100, 150, 10, this.stage);
    const floorThree = new Floor(500, 150, 150, 10, this.stage);
    const floorFour = new Floor(500, 200, 150, 10, this.stage);
    const floorFive = new Floor(500, 250, 150, 10, this.stage);
    const floorSix = new Floor(400, 310, 100, 10, this.stage);

    return [floorTwo, floorThree, floorFour, floorFive, floorSix];
  }
}

module.exports = LevelThree;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const Floor = __webpack_require__(0);
const Level = __webpack_require__(1);

class LevelTwo extends Level {
  constructor(stage) {
    super(stage);
    this.maxLemmings = 2;
    this.exitXPosition = 90;
    this.exitYPosition = 260;
    this.entranceXPosition = 230;
    this.entranceYPosition = 20;
    this.diggers = 2;

  }

  setupWalls() {
    const wallOne = new Floor(350, 0, 25, 75, this.stage);
    return [wallOne];
  }

  setupFloors() {
    const floorOne = new Floor(150, 50, 200, 25, this.stage);
    const floorTwoLeft = new Floor(50, 125, 150, 25, this.stage);
    const floorTwoRight = new Floor(250, 125, 150, 25, this.stage);
    const floorThree = new Floor(50, 175, 250, 25, this.stage);
    const floorFour = new Floor(125, 225, 250, 25, this.stage);
    const floorFive = new Floor(100, 310, 20, 10, this.stage);
    return [floorOne, floorTwoLeft, floorTwoRight, floorThree, floorFour, floorFive];
  }
}

module.exports = LevelTwo;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

const Entrances = () => {
  let data = {
    images:["./assets/images/lemmings_various_sheet.png"],
    frames: [
      [385, 13, 43, 11],
      [385, 51, 43, 14],
      [385, 90, 43, 18],
      [385, 128, 43, 18],
      [385, 167, 43, 19],
      [385, 207, 43, 19],
      [385, 246, 43, 20],
      [385, 286, 43, 20],
      [385, 325, 43, 21],
      [385, 365, 43, 20],
    ],
    animations:{
      darkEntrance: {
                    frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                    next: false
                  },
    },
      framerate: 10
  };
  const spriteSheet = new createjs.SpriteSheet(data);
  return new createjs.Sprite(spriteSheet, "darkEntrance");
};


module.exports = Entrances;


/***/ }),
/* 9 */
/***/ (function(module, exports) {

const Exits = () => {
  let data = {
    images:["./assets/images/lemmings_various_sheet.png"],
    frames: [
      [6, 604, 44, 50],
      [58, 604, 44, 50],
      [110, 604, 44, 50],
      [162, 604, 44, 50],
      [214, 604, 44, 50],
      [266, 604, 44, 50],

      [385, 13, 43, 11],
      [385, 51, 43, 14],
      [385, 90, 43, 18],
      [385, 128, 43, 18],
      [385, 167, 43, 19],
      [385, 207, 43, 19],
      [385, 246, 43, 20],
      [385, 286, 43, 20],
      [385, 325, 43, 21],
      [385, 365, 43, 20],
      // 365
    ],
    animations:{
      darkExit: [0,5],
      darkEntrance: {
                    frames: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                    next: false
                  },

    },
      framerate: 3
  };
  const spriteSheet = new createjs.SpriteSheet(data);
  return new createjs.Sprite(spriteSheet, "darkExit");
};

// export default walkingLemmings;


module.exports = Exits;


/***/ }),
/* 10 */
/***/ (function(module, exports) {

const walkingLemmings = () => {
  let data = {
    images:["./assets/images/lemmings_sprites.png"],
    frames: [
      [20, 0, 6, 10],
      [36, 0, 6, 10],
      [52, 0, 6, 10],
      [68, 0, 6, 10],
      [84, 0, 6, 10],
      [100, 0, 6, 10],
      [116, 0, 6, 10],
      [131, 0, 6, 10],

      [20, 17, 13, 15],
      [37, 17, 13, 15],
      [53, 17, 13, 15],
      [69, 17, 13, 15],
      [85, 17, 13, 15],
      [100, 17, 13, 15],
      [116, 17, 13, 15],
      [131, 17, 13, 15],
      [146, 17, 13, 15],
      [161, 17, 13, 15],
      [178, 17, 13, 15],
      [192, 17, 14, 15],
      [210, 17, 13, 15],
      [227, 17, 13, 15],
      [244, 17, 13, 15],
      [260, 17, 13, 15],

      [161, 43, 8, 11],
      [177, 43, 8, 11],
      [193, 42, 8, 12],
      [209, 43, 8, 11],

      [281, 1, 6, 10],
      [265, 1, 6, 10],
      [250, 1, 6, 10],
      [234, 1, 6, 10],
      [217, 1, 6, 10],
      [201, 1, 6, 10],
      [185, 1, 6, 10],
      [169, 1, 6, 10]

    ],
    animations:{
      walkRight: [0,7],
      digging: [8,23],
      falling: [24,27],
      walkLeft: [28,35]
    },
    framerate: 5
  };
  const spriteSheet = new createjs.SpriteSheet(data);
  return new createjs.Sprite(spriteSheet, "falling");
};

// export default walkingLemmings;


module.exports = walkingLemmings;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(2);

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game();
  game.selectLevel();
});


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map