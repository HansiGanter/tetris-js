// const sequence = [5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6];
// let pieceIndex = 0;

class Board {
  currentPiece;
  nextPiece;
  constructor(ctx, ctxNextPiece) {
    this.ctx = ctx;
    this.ctxNextPiece = ctxNextPiece;
    this.grid = this.getEmptyBoard();
    this.nextPiece = new Piece();

    window.addEventListener(
      "keydown",
      (event) => {
        if (event.defaultPrevented) {
          return; // Do nothing if the event was already processed
        }

        switch (event.key) {
          case "ArrowDown":
            // Do something for "down arrow" key press.
            if (!this.checkCollisionDown()) {
              this.currentPiece.y++;
              this.drawBoard();
            }
            break;
          case "Enter":
            // Do something for "enter" or "return" key press.
            while (!this.checkCollisionDown()) {
              this.currentPiece.y++;
            }
            time = 100;
            break;
          case " ":
            // Do something for "space" key press.
            while (!this.checkCollisionDown()) {
              this.currentPiece.y++;
            }
            time = 100;
            break;
          case "ArrowUp":
            this.currentPiece.turn();
            break;
          case "ArrowLeft":
            if (!this.checkCollisionLeft()) {
              this.currentPiece.x--;
              this.drawBoard();
            }
            break;
          case "ArrowRight":
            if (!this.checkCollisionRight()) {
              this.currentPiece.x++;
              this.drawBoard();
            }
            break;
          default:
            return; // Quit when this doesn't handle the key event.
        }

        // Cancel the default action to avoid it being handled twice
        event.preventDefault();
      },
      true
    );
  }

  newPiece() {
    // this.currentPiece = new Piece(sequence[pieceIndex]);
    // pieceIndex++;
    this.currentPiece = this.nextPiece;
    this.nextPiece = new Piece();

    // Draw nextPiece
    const { width, height } = ctxNextPiece.canvas;
    this.ctxNextPiece.clearRect(0, 0, width, height);
    this.nextPiece.drawNextPiece(this.ctxNextPiece);
  }

  drawBoard() {
    const { width, height } = ctx.canvas;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "blue";
    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[0].length; x++) {
        if (this.grid[y][x] === 1) {
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
    this.currentPiece.draw(this.ctx);
  }

  movePiece() {
    if (this.checkCollisionDown()) {
      for (let row = 0; row < this.currentPiece.pieceGrid.length; row++) {
        for (let col = 0; col < this.currentPiece.pieceGrid[0].length; col++) {
          if (this.currentPiece.pieceGrid[row][col] === 2) {
            this.grid[this.currentPiece.y + row][this.currentPiece.x + col] = 1;
          }
        }
      }
      this.removeRow();
      this.newPiece();
    } else {
      this.currentPiece.y++;
    }
  }

  removeRow() {
    let lineSequence = 0;
    for (let row = 0; row < this.grid.length; row++) {
      if (this.grid[row].every((p) => p === 1)) {
        this.grid.splice(row, 1);
        this.grid.unshift(Array(COLS).fill(0));
        lineSequence++;
      }
    }
    lines += lineSequence;
    if (lines / (level + 1) >= 10 && level < 9) {
      level++;
    }

    scoreSpan.textContent = score;
    linesSpan.textContent = lines;
    levelSpan.textContent = level;
  }

  gameOver() {
    if (this.grid[0].some((p) => p === 1)) {
      return true;
    }
  }

  checkCollisionDown() {
    // for each col of Piece get "lowest" cell and check collition with bottom or fixed piece
    for (let row = this.currentPiece.pieceGrid.length - 1; row >= 0; row--) {
      for (let col = 0; col < this.currentPiece.pieceGrid[0].length; col++) {
        if (this.currentPiece.pieceGrid[row][col] === 2) {
          if (
            this.grid[this.currentPiece.y + row + 1]?.[
              this.currentPiece.x + col
            ] === 1 ||
            this.currentPiece.y + row + 1 > ROWS - 1
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }
  checkCollisionLeft() {
    // for each row of Piece get "leftest" cell and check collition with border or fixed piece
    for (let row = 0; row < this.currentPiece.pieceGrid.length; row++) {
      for (let col = 0; col < this.currentPiece.pieceGrid[0].length; col++) {
        if (this.currentPiece.pieceGrid[row][col] === 2) {
          if (
            this.grid[this.currentPiece.y + row]?.[
              this.currentPiece.x + col - 1
            ] === 1 ||
            this.currentPiece.x + col - 1 < 0
          ) {
            return true;
          }
          break;
        }
      }
    }
    return false;
  }
  checkCollisionRight() {
    // for each row of Piece get "rightest" cell and check collition with border or fixed piece
    for (let row = 0; row < this.currentPiece.pieceGrid.length; row++) {
      for (
        let col = this.currentPiece.pieceGrid[0].length - 1;
        col >= 0;
        col--
      ) {
        if (this.currentPiece.pieceGrid[row][col] === 2) {
          if (
            this.grid[this.currentPiece.y + row]?.[
              this.currentPiece.x + col + 1
            ] === 1 ||
            this.currentPiece.x + col + 1 > COLS - 1
          ) {
            return true;
          }
          break;
        }
      }
    }
    return false;
  }

  getEmptyBoard() {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  }
}
