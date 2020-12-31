/**
Name: Shruti Sharma
CSE 154 - Section: AG
TA - Nicole Riley

This javascript file determines the behaviour of the fifteen puzzle game.
*/

"use strict";
(function () {
  let emptySquareRow = 3; //row number of emty tile
  let emptySquareColumn = 3; //column number of empty tile
  const TILE_WIDTH = 100; //width of puzle area
  const ROWS_IN_PUZZLE = 4; // number of rows (same as columns in the
  //puzzle )

  /**
   * Shortcut to get the document element by id
   * @param the string value of the ID of the DOM element you  are getting
   * @return the DOM element with that particular ID
  */
  function $(id) {
    return document.getElementById(id);
  }
  /**
   Shortcut to create DOM element.
   @param the tag to create.
   @return the DOM element created.
  */
  function createElement(tag) {
    return document.createElement(tag);
  }

  /**
   * Code that is executed as page loads.
  */
  window.onload = function() {
    let puzzle = $("puzzle-area");
    createPuzzle(puzzle);
    let citation = $("copyright-info");
    citation.innerHTML = "from <a href='https://commons.wikimedia.org/wiki/File:Gnome-face-monkey.svg'> GNOME-icon-theme</a>";
    $("shuffle-button").onclick = shuffle;
    let theTiles = document.querySelectorAll(".tile");
    for(let i = 0; i < theTiles.length; i++) {
      theTiles[i].onclick = move;
      theTiles[i].onmouseover = function () {
        if (isMovable(this)) {
          this.classList.add("neighbor");
        } else {
          this.classList.remove("neighbor");
        }
      };
    }
  };

 /**
  Creates tiles and places them in puzzle area
  @param the the DOM element with id puzzle-area.
 */
  function createPuzzle(puzzle) {
    let number = 1;
    for(let i = 0; i < ROWS_IN_PUZZLE; i++){
      for(let j = 0; j < ROWS_IN_PUZZLE; j++){
        if(!(i == emptySquareRow && j == emptySquareColumn )){
          let tile = createElement("div");
          tile.id = "square_" + parseInt(i) + "_" + parseInt(j);
          let span = createElement("span");
          tile.appendChild(span);
          tile.innerHTML = number;
          tile.classList.add("tile");
          tile.style.left = (TILE_WIDTH * j) + "px";
          tile.style.top = (TILE_WIDTH * i) + "px";
          number++;
          tile.style.backgroundPosition = (-TILE_WIDTH * j) + "px " +
          (-TILE_WIDTH * i) + "px";
          puzzle.appendChild(tile);
        }
      }
    }
  }

  /**
    Shuffles the tiles randomly inside puzzle area so that user can
    start playing.
  */
  function shuffle() {
    for(let i = 0; i < 1000; i++) {
      let neighbors = [
        returnSquare(emptySquareRow + 1, emptySquareColumn),
        returnSquare(emptySquareRow - 1, emptySquareColumn),
        returnSquare(emptySquareRow, emptySquareColumn + 1),
        returnSquare(emptySquareRow, emptySquareColumn - 1)
      ];
      let movables = [];
      for(let j = 0; j < neighbors.length; j++) {
        if (neighbors[j] !== null) {
          movables.push(neighbors[j]);
        }
      }
      let rand = Math.floor(Math.random() * movables.length);
      movables[rand].click();
    }
  }

  /**
   @return square object
   @param row and column number of square
  */
  function returnSquare(row, column) {
    return $("square_" + row + "_" + column);
  }

  /**
   Moves tile into empty space when clicked
  */
  function move() {
    let tileRow = (parseInt(this.style.top) / TILE_WIDTH);
    let tileColumn = (parseInt(this.style.left) /
    TILE_WIDTH);
    if(isMovable(this)) {
      this.id = "square_" + emptySquareRow + "_" + emptySquareColumn;
      this.style.left = emptySquareColumn * TILE_WIDTH + "px";
      emptySquareColumn = tileColumn;
      this.style.top = emptySquareRow * TILE_WIDTH + "px";
      emptySquareRow = tileRow;
    }
  }

  /**
   Verifies if tile is movable/whether it is a neighbor or not.
   @param the tile.
   @return true or false (true is movable).
  */
  function isMovable(square) {
    let tileRow = (parseInt(square.style.top) / TILE_WIDTH);
    let tileColumn = (parseInt(square.style.left) /
    TILE_WIDTH);

    return ((Math.abs(tileColumn - emptySquareColumn) === 1 &&
    Math.abs(tileRow - emptySquareRow) === 0) ||
     (Math.abs(tileColumn - emptySquareColumn) === 0 &&
       Math.abs(tileRow - emptySquareRow) === 1));
  }

})();
