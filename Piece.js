// Pieces:
// 0: L-Piece
// 1: L-Reverse
// 2: T-Piece
// 3: S-Piece
// 4: S-Reverse
// 5: I-Piece
// 6: Square-Piece

function randomType() {
  return Math.floor(Math.random() * 7);
}

class Piece {
  pieceGrid;
  x;
  y;
  constructor(type = randomType()) {
    this.type = type;
    this.y = 0;
    switch (type) {
      case 0:
        this.x = 3;
        this.pieceGrid = [
          [0, 2, 0],
          [0, 2, 0],
          [0, 2, 2],
        ];
        break;
      case 1:
        this.x = 3;
        this.pieceGrid = [
          [0, 2, 0],
          [0, 2, 0],
          [2, 2, 0],
        ];
        break;
      case 2:
        this.x = 3;
        this.pieceGrid = [
          [0, 2, 0],
          [2, 2, 2],
          [0, 0, 0],
        ];
        break;
      case 3:
        this.x = 3;
        this.pieceGrid = [
          [2, 2, 0],
          [0, 2, 2],
          [0, 0, 0],
        ];
        break;
      case 4:
        this.x = 3;
        this.pieceGrid = [
          [0, 2, 2],
          [2, 2, 0],
          [0, 0, 0],
        ];
        break;
      case 5:
        this.x = 3;
        this.pieceGrid = [
          [0, 2, 0, 0],
          [0, 2, 0, 0],
          [0, 2, 0, 0],
          [0, 2, 0, 0],
        ];
        break;
      case 6:
        this.x = 4;
        this.pieceGrid = [
          [2, 2],
          [2, 2],
        ];
        break;
      default:
        break;
    }
  }

  draw(ctx, color) {
    ctx.fillStyle = color || "green";
    this.pieceGrid.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (this.pieceGrid[y][x] === 2) {
          ctx.fillRect(x + this.x, y + this.y, 1, 1);
        }
      });
    });
  }

  drawNextPiece(ctx, color) {
    ctx.fillStyle = color || "green";
    this.pieceGrid.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (this.pieceGrid[y][x] === 2) {
          ctx.fillRect(x + 1, y + 1, 1, 1);
        }
      });
    });
  }

  turn() {
    this.draw(ctx, "white");

    const rows = this.pieceGrid.length;
    const cols = this.pieceGrid[0].length;

    // Create a new array with rotated dimensions
    const rotatedMatrix = new Array(cols).fill().map(() => []);

    // Iterate through the original matrix and fill the rotatedMatrix
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        rotatedMatrix[j].unshift(this.pieceGrid[i][j]);
      }
    }

    this.pieceGrid = rotatedMatrix;
    this.draw(ctx);
  }
}
