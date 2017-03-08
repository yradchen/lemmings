const walkingLemmings = () => {
  let data = {
    images:["./assets/images/lemmings_sprites.png"],
    frames: [
      [20, 0, 6, 10],
      [36, 0, 6, 10],
      [52, 0, 6, 10],
      [68, 0, 6, 10],
      [84, 0, 6, 10],
      [100, 0, 6, 10],
      [116, 0, 6, 10],
      [131, 0, 6, 10],

      [20, 17, 13, 15],
      [37, 17, 13, 15],
      [53, 17, 13, 15],
      [69, 17, 13, 15],
      [85, 17, 13, 15],
      [100, 17, 13, 15],
      [116, 17, 13, 15],
      [131, 17, 13, 15],
      [146, 17, 13, 15],
      [161, 17, 13, 15],
      [178, 17, 13, 15],
      [192, 17, 14, 15],
      [210, 17, 13, 15],
      [227, 17, 13, 15],
      [244, 17, 13, 15],
      [260, 17, 13, 15],

      [161, 43, 8, 11],
      [177, 43, 8, 11],
      [193, 42, 8, 12],
      [209, 43, 8, 11],

      [281, 1, 6, 10],
      [265, 1, 6, 10],
      [250, 1, 6, 10],
      [234, 1, 6, 10],
      [217, 1, 6, 10],
      [201, 1, 6, 10],
      [185, 1, 6, 10],
      [169, 1, 6, 10]

    ],
    animations:{
      walkRight: [0,7],
      digging: [8,23],
      falling: [24,27],
      walkLeft: [28,35]
    },
    framerate: 5
  };
  const spriteSheet = new createjs.SpriteSheet(data);
  return new createjs.Sprite(spriteSheet, "falling");
};

// export default walkingLemmings;


module.exports = walkingLemmings;
