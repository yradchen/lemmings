// import walkingLemmings from './sprites';
const walkingLemmings = require("./sprites/lemming_sprites");
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
