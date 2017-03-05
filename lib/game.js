const LevelOne = require("./levelone");

class Game {
  constructor(stage) {
    this.stage = stage;
    this.levelOne = new LevelOne(stage, this.reStart.bind(this));
    this.currentLevel = this.levelOne;
    this.start2 = this.start2.bind(this);
  }

  start2() {
    this.stage.removeAllChildren();
    this.currentLevel.stopGameTimer = this.stopTimer.bind(this);
    this.currentLevel.start();
    this.setupBoard();
    this.startTimer(300);
  }

  reStart() {
    this.start2();
  }

  setupBoard() {
    this.setupWins();
    this.setupDiggers();
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
}


// function startTimer(duration, display) {
//     var timer = duration, minutes, seconds;
//     setInterval(function () {
//         minutes = parseInt(timer / 60, 10);
//         seconds = parseInt(timer % 60, 10);
//
//         minutes = minutes < 10 ? "0" + minutes : minutes;
//         seconds = seconds < 10 ? "0" + seconds : seconds;
//
//         display.textContent = minutes + ":" + seconds;
//
//         if (--timer < 0) {
//             timer = duration;
//         }
//     }, 1000);
// }
//
// window.onload = function () {
//     var fiveMinutes = 60 * 5,
//         display = document.querySelector('#time');
//     startTimer(fiveMinutes, display);
// };

module.exports = Game;
