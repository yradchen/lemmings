const LevelOne = require("./levels/level_one");
const LevelTwo = require("./levels/level_two");
class Game {
  constructor() {
    // this.stage = stage;
    // this.levelOne = new LevelOne(stage);
    // this.levelTwo = new LevelTwo(stage);
    // this.currentLevel = this.levelOne;
  }

  setup() {
    let stage = new createjs.Stage("canvas");
    this.levelTwo = new LevelTwo(stage);
    stage = new createjs.Stage("canvas");
    this.levelOne = new LevelOne(stage);
    this.currentLevel = this.levelOne;
    this.play();
  }

  play() {
    this.bsod();
    // this.stage.removeAllChildren();
    // this.stage.removeAllEventListeners();
    this.currentLevel.stopGameTimer = this.stopTimer.bind(this);
    this.currentLevel.nextStage = this.nextStage.bind(this);
    this.currentLevel.start();
    this.setupBoard();
    this.startTimer(300);
  }


  setupBoard() {
    this.setupWins();
    this.setupDiggers();
  }

  nextStage() {
    if (this.currentLevel === this.levelOne) {
      this.currentLevel = this.levelTwo;
      this.play();
    } else {
      console.log("That's all");
    }

  }

  setupWins() {
    const maxLemmings = this.currentLevel.maxLemmings;
    const winCondition = Math.ceil(maxLemmings * 0.7);
    const condition = document.getElementById("win-conditions");
    condition.innerHTML = `Save ${winCondition} of ${maxLemmings} Lemmings`;
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

      if (minutes < 10) minutes = "0" + minutes;
      if (seconds < 10) seconds = "0" + seconds;

      duration -= 1;
      const timeLeft = document.getElementById("time-left");
      timeLeft.innerHTML = `${minutes}:${seconds}`;
      // return  minutes + ":" + seconds;
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.Timer);
  }

  bsod(e) {
    const x = document.getElementById("x");
    const bsod = document.getElementById("bsod");
    x.addEventListener("click", () => {
      bsod.classList.remove("hidden");
    });
  }
}

module.exports = Game;
