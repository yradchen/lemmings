
// var lemmings = newcreatejs.Sprite("./assets/lemmings_sprites.png");
// xposition on png, yposition, width, height
const Exits = () => {
  let data = {
    images:["../assets/lemmings_various_sheet.png"],
    frames: [
      [6, 604, 44, 50],
      [58, 604, 44, 50],
      [110, 604, 44, 50],
      [162, 604, 44, 50],
      [214, 604, 44, 50],
      [266, 604, 44, 50],

      [385, 13, 43, 11],
      [385, 51, 43, 14],
      [385, 90, 43, 18],
      [385, 128, 43, 18],
      [385, 167, 43, 19],
      [385, 207, 43, 19],
      [385, 246, 43, 20],
      [385, 286, 43, 20],
      [385, 325, 43, 21],
      [385, 365, 43, 20],
      // 365
    ],
    animations:{
      darkExit: [0,5]
      // 6 - 15.
      // digging: [8,23],
      // falling: [24,27],
      // walkLeft: [28,35]
    },
    framerate: 3
  };
  // debugger
  const spriteSheet = new createjs.SpriteSheet(data);
  return new createjs.Sprite(spriteSheet, "darkExit");
};

// export default walkingLemmings;


module.exports = Exits;
