// import walkingLemmings from './sprites';
const walkingLemmings = require("./sprites");
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

  render() {
    // this.stage.addChild(this.lemming);
  }

  handleDigging(floor, timeOut) {
    this.dig = true;
    this.lemming.scaleY = 1.5;
    this.lemming.scaleX = 1.2;
    this.floor = floor;
    this.lemming.gotoAndPlay("digging");
    const floorBottom = floor.startY + floor.height;

    const digInterval = setInterval(() => {
      const lemmingBottom = this.lemming.y + this.height;
        if (lemmingBottom < floorBottom) {
          this.lemming.y += 1;
          const hole = new createjs.Shape();
          hole.graphics.beginFill("black").drawRect(this.lemming.x, lemmingBottom, 12, 1 );
          // debugger
          //  container.addChildAt(myShape, container.getChildIndex(otherShape));
          this.stage.addChildAt(hole, this.lastStaticObject);
          // this.stage.addChild(hole);

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
        // this.handleAnimation();
        this.handleWalls(walls);
      }
    }


  }

  handleHoleFalling(holeDepth, floorStart, floor) {
    const lemmingBottom = this.lemming.y + this.height;
    if (holeDepth) {
      this.inHole = true;
      this.floor = floor;
      this.hole = holeDepth + floorStart;
      this.verticalDirection = true;
      this.checkFallingAnimation();
    } else if (lemmingBottom < (this.floor.holes[this.lemming.x] + this.floor.startY)) {
      this.verticalDirection = true;
      this.checkFallingAnimation();
      this.lemming.y += this.move;

    } else if (lemmingBottom >= this.floor.startY + this.floor.height) {
      this.inHole = false;
    } else {
      this.verticalDirection = false;
      this.checkFallingAnimation();
    }

  }

  handleFloors(floors) {
    this.verticalDirection = false;
    for (let i = 0; i < floors.length; i++) {
      const floor = floors[i];
      const floorBottom = floor.startY + floor.height;
      const lemmingBottom = this.lemming.y + this.height;

      if (this.lemming.y >= floorBottom ) {
         continue;
      }
      const floorHoleDepth = floor.holes[this.lemming.x];
      if (floorHoleDepth) {
        this.handleHoleFalling(floorHoleDepth, floor.startY, floor);
      }
      const floorEdge = floor.startX + floor.width;

      if (this.lemming.x + this.width <= floor.startX) {
        this.verticalDirection = true;
        this.dig = false;
      } else if (this.lemming.x > floorEdge) {
        this.verticalDirection = true;
        this.dig = false;
      } else if (lemmingBottom !== floor.startY) {
        this.verticalDirection = true;
        this.dig = false;
      }

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
    for (let i = 0; i < walls.length; i++) {
      const wall = walls[i];
      const leftEdge = wall.startX;
      const rightEdge = wall.startX + wall.width;
      const wallBottom = wall.startY + wall.height;
      const wallTop = wall.startY;
      const lemmingBottom = this.lemming.y + this.height;
      // debugger
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
// when do I move down?
// Move right if the lemmings startY + the direction it's moving > the floors start Y - the lemmings height.
// Move down if the lemmings Position X is > the floors position




module.exports = Lemming;
