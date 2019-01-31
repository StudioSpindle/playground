
const game = new Game();

/**
 * Listens for click on `#begin-game` and calls startGame() on game object
 */
document.getElementById('begin-game').addEventListener("click", function(){
  // hide button
  this.style.display = 'none';

  // show game area
  document.getElementById('play-area').style.opacity = '1';

  // Start the game
  game.startGame();
});
