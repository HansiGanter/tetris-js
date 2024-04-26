// TODO:
// - Fix collision bug when turning Piece
// - Add Levels
// - Add point system
// - Create next piece preview
// - Let rotate for one more cycle before fixing piece
// - Add solved lines animation
// - Add colors to pieces

const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

// Calculate size of canvas from constants.
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

// Scale blocks
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

// Set loop time depending on level
level = 90;
time = 1;

function play() {
  board = new Board(ctx);
  board.newPiece();
  loop();
}
function loop() {
  // Beginning of loop
  if (time === 1) {
    board.drawBoard();
  }
  // End of loop
  if (time + level === 100) {
    board.movePiece();
    if (board.gameOver()) {
      window.alert("GAME OVER");
      return;
    }

    time = 1;
  } else {
    time++;
  }

  requestAnimationFrame(loop);
}
