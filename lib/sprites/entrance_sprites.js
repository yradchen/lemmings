const Entrances = () => {
  let data = {
    images:["./assets/images/lemmings_various_sheet.png"],
    frames: [
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
    ],
    animations:{
      darkEntrance: {
                    frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                    next: false
                  },
    },
      framerate: 5
  };
  const spriteSheet = new createjs.SpriteSheet(data);
  return new createjs.Sprite(spriteSheet, "darkEntrance");
};


module.exports = Entrances;
