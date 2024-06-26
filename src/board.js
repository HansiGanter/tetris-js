// const sequence = [5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6];
// let pieceIndex = 0;

class Board {
  currentPiece;
  nextPiece;
  lastChance = true;
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
            this.lastChance = false;
            break;
          case " ":
            // Do something for "space" key press.
            while (!this.checkCollisionDown()) {
              this.currentPiece.y++;
            }
            time = 100;
            this.lastChance = false;
            break;
          case "ArrowUp":
            this.turn();
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

    this.drawBoard();
    // ceck if Game Over
    if (
      this.checkCollision(
        this.currentPiece.pieceGrid,
        this.currentPiece.x,
        this.currentPiece.y
      )
    ) {
      gameOver();
    }
  }

  drawBoard() {
    const { width, height } = ctx.canvas;
    this.ctx.clearRect(0, 0, width, height);
    this.ctx.fillStyle = backgroundcolors[level];
    this.ctx.fillRect(0, 0, width, height);
    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[0].length; x++) {
        if (this.grid[y][x] !== 0) {
          ctx.fillStyle = colors[this.grid[y][x]];
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
    this.drawCurrentPiece();
  }
  drawCurrentPiece() {
    this.currentPiece.draw(this.ctx);
  }

  movePiece() {
    if (this.checkCollisionDown()) {
      if (this.lastChance) {
        time = 1;
        this.lastChance = false;
      } else {
        for (let row = 0; row < this.currentPiece.pieceGrid.length; row++) {
          for (
            let col = 0;
            col < this.currentPiece.pieceGrid[0].length;
            col++
          ) {
            if (this.currentPiece.pieceGrid[row][col] === 2) {
              this.grid[this.currentPiece.y + row][this.currentPiece.x + col] =
                this.currentPiece.type;
            }
          }
        }
        this.removeRow();
        this.newPiece();
        this.lastChance = true;
      }
    } else {
      this.currentPiece.y++;
    }
  }

  removeRow() {
    let lineSequence = 0;
    for (let row = 0; row < this.grid.length; row++) {
      if (this.grid[row].every((p) => p !== 0)) {
        this.grid.splice(row, 1);
        this.grid.unshift(Array(COLS).fill(0));
        lineSequence++;
      }
    }
    lines += lineSequence;
    if (lineSequence > 0) updateScore(lineSequence);
    if (lines / (level + 1) >= 10 && level < 9) {
      level++;
    }

    scoreSpan.textContent = score;
    linesSpan.textContent = lines;
    levelSpan.textContent = level;
  }

  gameOver() {
    if (this.grid[0].some((p) => p !== 0)) {
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
            ] !== 0 ||
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
            ] !== 0 ||
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
            ] !== 0 ||
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

  checkCollision(pieceGrid, x, y) {
    for (let row = 0; row < pieceGrid.length; row++) {
      for (let col = 0; col < pieceGrid[0].length; col++) {
        if (pieceGrid[row][col] === 2) {
          if (this.grid[y + row]?.[x + col] !== 0) {
            return true;
          }
        }
      }
    }
  }

  turn() {
    const rows = this.currentPiece.pieceGrid.length;
    const cols = this.currentPiece.pieceGrid[0].length;

    // Create a new array with rotated dimensions
    const rotatedMatrix = new Array(cols).fill().map(() => []);

    // Iterate through the original matrix and fill the rotatedMatrix
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        rotatedMatrix[j].unshift(this.currentPiece.pieceGrid[i][j]);
      }
    }

    if (
      !this.checkCollision(
        rotatedMatrix,
        this.currentPiece.x,
        this.currentPiece.y
      )
    ) {
      this.currentPiece.draw(ctx, backgroundcolors[level]);
      this.currentPiece.pieceGrid = rotatedMatrix;
      this.currentPiece.draw(ctx);
    }
  }

  getEmptyBoard() {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  }
}
