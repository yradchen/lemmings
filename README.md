# Lemmings

[Live version][live]

[live]: https://yradchen.github.io/lemmings/

Lemmings is puzzle platformer video gamer inspired by the 1991 classic of the same name. The objective of the game is to is to get all the lemmings from a designated start point to the exit. The player does this by altering the landscape via the dig function. As a platformer-puzzler the game requires a bit of timing, patience, and strategy to complete


#How To Play

As a level starts lemmings start entering the stage via a spawn point. The lemmings walk around the stage automatically, turning as they hit walls or falling as they reach the end of platforms. The goal of the game is to get a percentage of the lemmings to the exit using only the dig function, accessed by clicking on a lemming.

#Technologies

* JavaScript
* HTML 5
* Easel JS
* Native HTML DOM Methods



#Technology Implementation


## Sprites

Sprite animation is implemented using Easel JS, where each sprite is an image on a page which must be found using x and y coordinates. Each image is then counted as a frame, and when these frames are run through they create an animated image (like a flip book). The lemming animations, walking, and falling run through the frames on a continuous loop, while the entrance is only runs each frame once.

```javascript
  let data = {
    images:["./assets/images/lemmings_sprites.png"],
    frames: [
      // each position is determined by [xPosition on image, Y position on image, height, width]
      [20, 0, 6, 10],
      [36, 0, 6, 10],
      [52, 0, 6, 10],
      [68, 0, 6, 10],
      [84, 0, 6, 10],
      [100, 0, 6, 10],
      [116, 0, 6, 10],
      [131, 0, 6, 10],
    ],
    animations:{
      // set to run a continous loop. Listing each individual frame and having next: false here would only make the animation run once.
      walkRight: [0,7],
    },
  };
```

One of the most difficult parts of this was handling Lemmings walking in different directions. At first I implemented this by changing the scaleX of the animation (essentially using a mirror image of the same animation). However, this caused an unnatural look as lemmings hit walls since as as soon as the lemmings right edge would touch a wall the image would become mirrored and there'd be a gap in the visual where the lemming was supposed to be shown against a wall and facing the opposite direction.

To counteract this I had to find separate images for lemmings facing in different directions. However, since a lemmings X axis was determined by it's left side, this introduced the problem of lemmings falling improperly. If a lemming is facing left and he walks off a cliff's left edge, visually the right side of his body would be inside of the cliff. To deal with this I had to implement an offset to my lemmings visual dependent on which way they were facing and the lemmings width.

```javascript
  let xAxisOffset = this.lemming.x;
  if (this.direction === "left") xAxisOffSet += this.width;
  if (this.direction === "right") xAxisOffSet += this.width;
```

## Future Features

* A pause feature
* Reset feature
* More functionality for lemmings, such as climbing and digging through walls
* More levels
