## Sample JS Project Proposal: Lemmings

### Background

Lemmings is a puzzle-platformer game released in 1991. The goal of the game is to guide a group of lemmings to an endpoint. To achieve this goal the user would have to give the lemmings certain abilities, ranging from digging to building a bridge on the map.

### Functionality & MVP  

With this Lemmings simulator, users will be able to:

- [ ] Start, pause, and reset the game board
- [ ] Select lemmings to change their state to be diggers
- [ ] Lose the game via running out of time.
- [ ] Lose the game via losing all the lemmings
- [ ] Beat the stage via getting a percentage of lemmings to the goal

In addition, this project will include:

- [ ] An About modal describing the background and rules of the game
- [ ] A production README

### Wireframes

This app will consist of a single screen with game board. The game will be interactive via mouse clicks. The very bottom of the screen will  display the amount of lemmings with a type bar (most likely just starting with a digger lemming) The user will be able to select the type of lemming they want to use and then click on a lemming to change their state. From the bottom left to the bottom right will be, a goal for amount of lemmings to save, how many lemmings are left, and the amount of time left in the game. Above this will be an info bar that will prompt the user for actions and will give the user general information, such as what the selected lemming will do.


[wireframes](./wireframes/lemmings.png)

### Architecture and Technologies

This project will be implemented with the following technologies:

- Vanilla JavaScript and `jQuery` for overall structure and game logic,
- `Easel.js` with `HTML5 Canvas` for DOM manipulation and rendering,
- Webpack to bundle and serve up the various scripts.

In addition to the webpack entry file, there will be three scripts involved in this project:

`levelN.js:` this script will handle the rendering of the map, where N represents the level number.

`lemmings.js:` this script will handle the logic of the different types of lemmings and their logic

`game.js:` this script will store the game's current state, amount of time left, lemmings left, etc.

`board.js:` this script will setup the overall appearance of the board, taking an argument of (level), where level is the current board.


### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running and `Easel.js` installed.  Create `webpack.config.js` as well as `package.json`. Learn the basics of `Easel.js` and `Canvas`.  Goals for the day:

- Learn enough `Easel.js` to render an object to the `Canvas` element
- Render a single map outline on the canvas element
- Learn how to have the `Canvas` actively (to see how I would implement changing a lemmings state and having it "dig" through the canvas)

**Day 2**: Dedicate the day to putting an object on the outlined canvas, having it handle collision with map borders properly. Additionally, have it handle the object leaving the board (this would mean it no longer exists).

Goals for the day:

- Complete a single lemming animation that moves on the board.
- Have the lemming hit borders appropriately (if I change the area of the border how will this effect the lemming?)
- Implement lemmings disappearing when hitting a target point.
- Work on dig logic for lemmings.

**Day 3**: Work on the backend logic for my lemmings, changing their state

- Complete lemmings that successfully digs.
- Create a second map that requires lemming dig logic.
- Implement mouse clicks to change lemmings state.


### Bonus features

There are many directions this cellular automata engine could eventually go.  Some anticipated updates are:

- [ ] Add additional lemming types to fill in the current placeholders
- [ ] Add additional levels
- [ ] Add logic such as speeding up the game and setting difficulty
