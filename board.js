class Board {
  currentPiece;
  constructor(ctx) {
    this.ctx = ctx;
    this.grid = this.getEmptyBoard();

    window.addEventListener(
      "keydown",
      (event) => {
        if (event.defaultPrevented) {
          return; // Do nothing if the event was already processed
        }

        switch (event.key) {
          case "ArrowDown":
            // Do something for "down arrow" key press.
            break;
          case "Enter":
            // Do something for "enter" or "return" key press.
            break;
          case " ":
            // Do something for "space" key press.
            break;
          case "ArrowUp":
            // Do something for "up arrow" key press.
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
    this.currentPiece = { y: 0, x: 4 };
  }

  drawBoard(gameover = false) {
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
    ctx.fillStyle = "green";
    ctx.fillRect(this.currentPiece.x, this.currentPiece.y, 1, 1);
  }

  movePiece() {
    if (this.checkCollisionDown()) {
      this.grid[this.currentPiece.y][this.currentPiece.x] = 1;
      if (this.grid[this.currentPiece.y].every((p) => p === 1)) {
        this.removeRow(this.currentPiece.y);
      }
      this.newPiece();
    } else {
      this.currentPiece.y++;
    }
  }

  removeRow(y) {
    this.grid.splice(y, 1);
    this.grid.unshift(Array(COLS).fill(0));
  }

  gameOver() {
    if (this.grid[0].some((p) => p === 1)) {
      return true;
    }
  }

  checkCollisionDown() {
    return (
      this.grid[this.currentPiece.y + 1]?.[this.currentPiece.x] === 1 ||
      this.currentPiece.y + 1 >= this.grid.length
    );
  }
  checkCollisionLeft() {
    return (
      this.grid[this.currentPiece.y]?.[this.currentPiece.x - 1] === 1 ||
      this.currentPiece.x - 1 < 0
    );
  }
  checkCollisionRight() {
    return (
      this.grid[this.currentPiece.y]?.[this.currentPiece.x + 1] === 1 ||
      this.currentPiece.x + 1 > this.grid[0].length - 1
    );
  }

  getEmptyBoard() {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  }
}
