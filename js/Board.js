
class Board {
  constructor() {
    this.rows = 6;
    this.columns = 7;
    this.spaces = this.createSpaces();
  }

  /**
   * Generates 2D array of spaces
   * @returns {array}    An array of space objects
   */
  createSpaces() {
    const spaces = [];

    for (let x = 0; x < this.columns; x++) {
      const col = [];

      for (let y = 0; y < this.rows; y++) {
        const space = new Space(x,y);
        col.push(space);
      }

      spaces.push(col);
    }

    return spaces;
  }

  /**
   * A "render method" which draws the board in the dom
   */
  drawHTMLBoard() {
    // loop through each column
    for (let column of this.spaces) {
      // loop through each space
      for (let space of column) {
        space.drawSVGSpace();
      }
    }
  }
}
