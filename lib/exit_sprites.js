
// var lemmings = newcreatejs.Sprite("./assets/lemmings_sprites.png");
// xposition on png, yposition, width, height
const Exits = () => {
  let data = {
    images:["../assets/lemmings_various_sheet.png"],
    frames: [
      [6, 604, 44, 54],
      [58, 604, 44, 54],
      [110, 604, 44, 54],
      [162, 604, 44, 54],
      [214, 604, 44, 54],
      [266, 604, 44, 54],


    ],
    animations:{
      darkExit: [0,5]
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
