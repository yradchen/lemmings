const Lemming = require("../lemming");
const Floor = require("../floor");
const Exits = require("../sprites/exit_sprites");
const Entrances = require("../sprites/entrance_sprites");

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
      this.stopGameTimer();
      this.stage.removeAllChildren();
      createjs.Ticker.removeAllEventListeners();
      this.stage.removeAllEventListeners();
      this.stage.clear();
      this.nextStage(this.savedLemmings);
    }
  }

}

module.exports = Level;
