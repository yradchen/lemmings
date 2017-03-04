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
    const floor = new createjs.Shape();
    // var bitmap = new createjs.Bitmap("../.jpg");
    floor.graphics.beginFill("DeepSkyBlue").drawRect(this.startX, this.startY, this.width, this.height );
    this.stage.addChild(floor);
  }

  handleHole(xPosition, timeOut) {
    // points to a depth
    this.holes[xPosition] = 1;
    const createHole = setInterval(() => {
      if (this.holes[xPosition] < this.height) {
        // debugger
        this.holes[xPosition] += 1;
      } else {
        clearInterval(createHole);
      }
    }, timeOut);
  }

}



module.exports = Floor;
