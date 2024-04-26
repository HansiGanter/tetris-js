// TODO:
// - Fix collision bug when turning Piece
// ✅ Add Levels
// - Add point system
// ✅ Create next piece preview
// - Let rotate for one more cycle before fixing piece
// - Add solved lines animation
// - Add colors to pieces
// ✅ KeyDown Feature

const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

const nextPieceCanvas = document.getElementById("nextPiece");
const ctxNextPiece = nextPieceCanvas.getContext("2d");

// Calculate size of canvas from constants.
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

ctxNextPiece.canvas.width = 5 * BLOCK_SIZE;
ctxNextPiece.canvas.height = 5 * BLOCK_SIZE;

// Scale blocks
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
ctxNextPiece.scale(BLOCK_SIZE, BLOCK_SIZE);

// Set loop time depending on level
time = 1;
lines = 0;
level = 0;
score = 0;

const scoreSpan = document.getElementById("score");
const linesSpan = document.getElementById("lines");
const levelSpan = document.getElementById("level");

function play() {
  board = new Board(ctx, ctxNextPiece);
  board.newPiece();
  loop();
}
function loop() {
  // Beginning of loop
  if (time === 1) {
    board.drawBoard();
  }
  // End of loop
  if (time + level * 10 >= 100) {
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
