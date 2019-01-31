
class Game {
  constructor() {
    this.board = new Board();
    this.players = this.createPlayers();
    this.ready = false;
  }

  /**
   * Get the active player
   * @returns {object}    The player which turn it is
   */
  get activePlayer() {
    return this.players.find(player => player.active);
  }

  /**
   * Creates two player objects
   * @returns {Array}     An array of two Player objects.
   */
  createPlayers() {
    const players = [new Player('Player 1', 1, '#e15285', true),
                     new Player('Player 2', 2, '#e59a13')];
    return players;
  }

  /**
   * Initializes game.
   */
  startGame() {
    this.board.drawHTMLBoard();
    this.activePlayer.activeToken.drawHTMLToken();
    this.ready = true;
  }
}
