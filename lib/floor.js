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
    img.src = "../assets/images/Floor_Texture.png";
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
