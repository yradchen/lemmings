const Lemming = require("./lemming");
const Floor = require("./floor");
const Exits = require("./sprites/exit_sprites");
const Entrances = require("./sprites/entrance_sprites");

class LevelOne {
  constructor(stage, reStart) {
    this.stage = stage;
    this.lemmings = [];
    this.maxLemmings = 1;
    this.floors = this.setupFloors();
    this.walls = this.setupWalls();
    this.exitXPosition = 540;
    this.exitYPosition = 225;
    this.entranceXPosition = 150;
    this.entranceYPosition = 60;
    this.savedLemmings = 0;
    this.diggers = 2;
    this.lostLemmings = 0;
    this.reStart = reStart;
  }

  addLemming() {
    const startX = 150;
    const startY = 60;
    const lemmingIndex = this.lemmings.length;
    this.lemmings.push(new Lemming(startX, startY, this.stage, this.lastStaticObject, lemmingIndex));
  }

  setupWalls() {
    const LeftWall = new Floor(0, 0, 50, 325, this.stage);
    const MidWall = new Floor(400, 0, 50, 200, this.stage);
    const RightWall = new Floor(600, 0, 50, 325, this.stage);
    return [LeftWall, MidWall, RightWall];
  }
// c.fillRect(Distance from left(x cord), Distance from top(y cord), width, height)
    // <canvas id="canvas" width="480" height="320"></canvas>
  setupFloors() {
    const midFloor = new Floor(50, 150, 350, 50, this.stage);
    const bottomFloor = new Floor(50, 275, 550, 50, this.stage);
    return [midFloor, bottomFloor];
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
    createjs.Ticker.removeEventListener('tick', handleTick);
    // createjs.Ticker.removeAllEventListeners();
    setInterval(() => {
      if (this.lemmings.length < this.maxLemmings) {
        this.addLemming();
      }
    }, 2000);
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
    // const diggers = this.diggers;
    const diggersLeft = document.getElementById("diggers-left");
    diggersLeft.innerHTML = `Diggers left: ${this.diggers}`;
  }

  checkDeath(lemming) {
    const rightEdge = this.stage.canvas.width;
    const bottomEdge = this.stage.canvas.height;
    const lemmingBottom = lemming.lemming.y + lemming.height;

    if (lemmingBottom >= bottomEdge) {
      this.stage.removeChild(lemming.lemming);
      this.lostLemmings += 1;
      delete this.lemmings[lemming.index];
      this.updateLostCount();
    }
  }

  checkExit(lemming) {
    if (lemming.lemming.x === this.exitXPosition & (lemming.lemming.y + lemming.height) === this.exitYPosition) {
      this.stage.removeChild(lemming.lemming);
      delete this.lemmings[lemming.index];
      this.savedLemmings += 1;
      this.updateWinCount();
    }

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
    // createjs.Ticker.removeAllEventListeners();
    if (this.lostLemmings + this.savedLemmings === this.maxLemmings) {
      this.stopGameTimer();
      // this.reStart();
    }
    // some kind of callback?
  }

}

module.exports = LevelOne;
