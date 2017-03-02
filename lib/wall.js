class Wall {
  constructor(startX, startY, width, height, ctx) {
    this.startX = startX;
    this.startY = startY;
    this.height = height;
    this.ctx = ctx;
    this.width = width;
  }

  render() {
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.startX, this.startY, this.width, this.height);
  }

}



module.exports = Wall;