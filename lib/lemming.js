// import walkingLemmings from './sprites';
const walkingLemmings = require("./sprites/lemming_sprites");
class Lemming {
  constructor(startX, startY, stage, lastStaticObject, index) {
    this.index = index;
    
    this.setupLemmingVisual(startX, startY);
    stage.addChild(this.lemming);
    this.stage = stage;
    this.height = 20;
    this.width = 12;
    this.move = 1;
    this.direction = "right";
    this.dig = false;
    this.lastStaticObject = lastStaticObject;
    this.setLemmingPosition();
  }

  setupLemmingVisual(startX, startY) {
    this.lemming = walkingLemmings();
    this.lemming.x = startX;
    this.lemming.y = startY;
    this.lemming.scaleX = 2.0;
    this.lemming.scaleY = 2.0;
  }

  handleDigging(floor, timeOut) {
    this.dig = true;
    this.lemming.scaleY = 1.5;
    this.lemming.scaleX = 1.3;
    this.floor = floor;
    this.lemming.gotoAndPlay("digging");

    const digInterval = setInterval(() => {

        if (this.bottom < floor.bottom) {
          this.lemming.y += this.move;
          const hole = new createjs.Shape();
          hole.graphics.beginFill("black").drawRect(this.lemming.x, this.bottom, 12, 1 );
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
    this.setLemmingPosition();
  }

  setLemmingPosition() {
    this.leftSide = this.lemming.x;
    this.rightSide = this.lemming.x + this.width;
    this.top = this.lemming.y;
    this.bottom = this.lemming.y + this.height;
    this.x = this.lemming.x;
  }

  handleHoleFalling(hole, floorStart, floor) {
    if (hole) {
      this.inHole = true;
      this.checkFallingAnimation();
      this.floor = floor;
    }
    if (this.bottom >= this.floor.startY + this.floor.height) {
      this.inHole = false;
    }
    const holeDepth = this.floor.holes[this.lemming.x] + this.floor.startY;

    if (holeDepth > this.bottom ) {
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
      const floorEdge = floor.startX + floor.width;
      let xPosition = this.lemming.x;
      if (this.direction === "left") xPosition += 12;
      if (this.direction === "right") xPosition += 12;

      if (this.bottom < floor.startY) continue;
      if (this.bottom >= floorBottom) continue;
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
        if (this.lemming.y >= wall.bottom || this.bottom < wall.top) {
           continue;
        }
        this.handleTurning(wall.leftEdge, wall.rightEdge);
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
