class Floor {
  constructor(startX, startY, width, height, stage) {
    this.startX = startX;
    this.startY = startY;
    this.height = height;
    this.width = width;
    this.stage = stage;
    this.holes = [];
  }

  render() {
    const floor = new createjs.Shape();
    
    floor.graphics.beginFill("DeepSkyBlue").drawRect(this.startX, this.startY, this.width, this.height );
    this.stage.addChild(floor);
  }

}



module.exports = Floor;
