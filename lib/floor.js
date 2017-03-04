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
      // s.graphics.setStrokeStyle(1);
      // s.graphics.beginStroke(createjs.Graphics.getRGB(220,220,220));
      s.graphics.drawRect(this.startX, this.startY, this.width, this.height);
    };
    img.src = "../assets/Floor_Texture2.png";
    this.stage.addChild(s);
  }

  Oldrender() {
    const floor = new createjs.Shape();
    var bitmap = new createjs.Bitmap("../assets/walls.png");
    // debugger
    const drawnFloor = new createjs.Shape();
    drawnFloor.beginBitmapFill();
    // sky = new createjs.Shape();
    // sky.graphics.beginBitmapFill(loader.getResult("sky")).drawRect(0, 0, w, h);
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
// var img = new Image();
// var img = newImage();
// img.onload = () => {
//   s.graphics.beginBitmapFill(img, 'repeat-x');
//   s.graphics.setStrokeStyle(1);
//   s.graphics.beginStroke(createjs.Graphics.getRGB(255,0,0));
//   s.graphics.drawRect(this.startX, this.startY, this.width, this.height);
// };
// img.src = "../assets/walls.png";
// img.onload = function(){
//      s.graphics.beginBitmapFill(img, 'repeat-x');
//      s.graphics.setStrokeStyle(1);
//      s.graphics.beginStroke(createjs.Graphics.getRGB(255,0,0));
//      s.graphics.drawRect(0,40,1000,1000);
// }
// img.src = 'http://upload.wikimedia.org/wikipedia/en/a/aa/Bart_Simpson_200px.png';



module.exports = Floor;
