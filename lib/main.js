const Level = require("./levelone");

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext('2d');
  const level = new Level(ctx, canvas);
  level.start();
});

// import the map....

//
// document.addEventListener("DOMContentLoaded", function(){
//   const canvas = document.getElementById("canvas");
//   const c = canvas.getContext('2d');
//
//   // horizontal 'floor'
// const floorY = 270;
// const floor = () => {
//   c.fillStyle = "red";
//   c.fillRect(0,floorY,480,50);
// };
//
// // green rectangle
//
// let moveDown = 2;
// let moveRight = -2;
// let x = 20;
// let y = 40;
//
// const lemmingHeight = 30;
// const Drawlemming = () => {
//   c.beginPath();
//   c.rect(x, y, 10, lemmingHeight);
//   c.fillStyle = "green";
//   c.fill();
//   c.closePath();
// };
//
// const moveLemming = () => {
//   c.clearRect(0, 0, canvas.width, canvas.height);
//   floor();
//   Drawlemming();
//   if (y + moveDown > floorY - lemmingHeight) {
//     x -= moveRight;
//   } else {
//     y += moveDown;
//   }
// };
//
// setInterval(moveLemming, 20);
// });






// stop height for a lemming is the Y coord of floor - height of lemming


// c.fillRect(Distance from left(x cord), Distance from top(y cord), width, height)
//
// {/* <html>
// <body>
// <canvas width="800" height="600" id="canvas"></canvas>
// <script>
// var canvas = document.getElementById('canvas');
// var c = canvas.getContext('2d');
// c.fillStyle = "red";
// c.fillRect(100,100,400,300);
// </script>
// </body>
// </html>  */}
//
// {/* <html>
// <body>
// <canvas width="800" height="600" id="canvas"></canvas>
// <script>
// var canvas = document.getElementById('canvas');
// var c = canvas.getContext('2d');
// c.fillStyle = "red";
// c.fillRect(100,100,400,300);
// </script>
// </body>
// </html>  */}
//
// // Each level would be canvas with drawn images.
//
//
// // how to handle the floor disapearing???
// // Have it handled in the canvas drawing where I pass in an x and y coordinate? This updates every second How do I tell it to stop, when I get to the bottom of the ?
// // What happens when I dig through a floor and get to the air? Trigger a stop dig?
//
//
// // Handling the floor disappearing
