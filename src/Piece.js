// Pieces:
// 1: L-Piece
// 2: L-Reverse
// 3: T-Piece
// 4: S-Piece
// 5: S-Reverse
// 6: I-Piece
// 7: Square-Piece

function randomType() {
  return Math.floor(Math.random() * 7) + 1;
}

class Piece {
  pieceGrid;
  x;
  y;
  constructor(type = randomType()) {
    this.type = type;
    this.y = 0;
    switch (type) {
      case 1:
        this.x = 3;
        this.pieceGrid = [
          [0, 0, 2],
          [2, 2, 2],
          [0, 0, 0],
        ];
        break;
      case 2:
        this.x = 3;
        this.pieceGrid = [
          [2, 0, 0],
          [2, 2, 2],
          [0, 0, 0],
        ];
        break;
      case 3:
        this.x = 3;
        this.pieceGrid = [
          [0, 2, 0],
          [2, 2, 2],
          [0, 0, 0],
        ];
        break;
      case 4:
        this.x = 3;
        this.pieceGrid = [
          [2, 2, 0],
          [0, 2, 2],
          [0, 0, 0],
        ];
        break;
      case 5:
        this.x = 3;
        this.pieceGrid = [
          [0, 2, 2],
          [2, 2, 0],
          [0, 0, 0],
        ];
        break;
      case 6:
        this.x = 3;
        this.pieceGrid = [
          [0, 0, 0, 0],
          [2, 2, 2, 2],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ];
        break;
      case 7:
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
    ctx.fillStyle = color || colors[this.type];
    this.pieceGrid.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (this.pieceGrid[y][x] === 2) {
          ctx.fillRect(x + this.x, y + this.y, 1, 1);
        }
      });
    });
  }

  drawNextPiece(ctx, color) {
    ctx.fillStyle = color || colors[this.type];
    this.pieceGrid.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (this.pieceGrid[y][x] === 2) {
          ctx.fillRect(x + 1, y + 1, 1, 1);
        }
      });
    });
  }
}
