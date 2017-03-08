const LevelOne = require("./levels/level_one");
const LevelTwo = require("./levels/level_two");
const LevelThree = require("./levels/level_three");

class Game {
  constructor() {
    this.levels = [LevelOne, LevelTwo, LevelThree];
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

    removeLevelSelectionScreen() {
      const levelSelectionScreen = document.getElementById("options");
      levelSelectionScreen.classList.add("hidden");
    }

    addLevelSelectionScreen() {
      const levelSelectionScreen = document.getElementById("options");
      levelSelectionScreen.classList.remove("hidden");
    }

    bsod(e) {
      const x = document.getElementById("x");
      const bsod = document.getElementById("bsod");
      x.addEventListener("click", () => {
        bsod.classList.remove("hidden");
      });
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
    this.startTimer(300);
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
    this.winCondition = Math.ceil(maxLemmings * 0.7);
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
