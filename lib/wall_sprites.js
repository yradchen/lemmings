
// var lemmings = newcreatejs.Sprite("./assets/lemmings_sprites.png");
// xposition on png, yposition, width, height
const walls = () => {
  let data = {
    images:["../assets/walls.png"],
    frames: [
      [15, 22, 30, 30]
      // [21, 153, 30, 50],
    ],
  };
  // debugger
  const spriteSheet = new createjs.SpriteSheet(data);
  return new createjs.Sprite(spriteSheet);
};

// export default walkingLemmings;


module.exports = walls;
