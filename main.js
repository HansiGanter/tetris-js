// TODO:
// ✅ Fix collision bug when turning Piece
// ✅ Fix collision bug when creating new Piece
// ✅ Add Levels
// ✅ Add point system
// ✅ Create next piece preview
// ✅ Let rotate for one more cycle before fixing piece
// ✅ Add colors to pieces
// ✅ KeyDown Feature
// ✅ Change background color depending on level
// ✅ Store personal highscore
// ✅ Store global highscore
// ✅ Reload on "Game Over"- and "Play"-Button
// ✅ Add "Pause"-Button
// - Fix double "game over" alert
// ✅ Host application

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
let time = 1;
let lines = 0;
let level = 0;
let score = 0;

let scoreTable = [40, 100, 300, 1200];

const scoreSpan = document.getElementById("score");
const linesSpan = document.getElementById("lines");
const levelSpan = document.getElementById("level");

// HIGH SCORES
// Personal High Score
if (
  !localStorage.getItem("high-score") ||
  isNaN(localStorage.getItem("high-score"))
) {
  localStorage.setItem("high-score", 0);
}

let personalhighscore = localStorage.getItem("high-score");

function updateScore(lineSequence) {
  score += scoreTable[lineSequence - 1] * (level + 1);
}

function updateHighScore(newhighscore) {
  personalhighscore = newhighscore;
  localStorage.setItem("high-score", personalhighscore);
  personalhighscoreSpan.textContent = personalhighscore;
}

const personalhighscoreSpan = document.getElementById("personal-high-score");
personalhighscoreSpan.textContent = personalhighscore;

// Global High Score
let globalhighscore = 0;
getGlobalHighscore();

const globalhighscoreSpan = document.getElementById("global-high-score");
globalhighscoreSpan.textContent = globalhighscore;

// Fetch the current high score from the backend server
function getGlobalHighscore() {
  fetch("http://127.0.0.1:3000/highscore")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      globalhighscore = data.highScore;
      globalhighscoreSpan.textContent = globalhighscore;
      console.log(data);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

// Try to update the current high score in the database
function updateGlobalHighscore() {
  fetch("http://127.0.0.1:3000/highscore", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ score: score }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

// Refresh page when starting new game
const urlParams = new URLSearchParams(window.location.search);
const clickedPlay = urlParams.get("clickedPlay");
if (clickedPlay === "yes") {
  startGame();
}

function play() {
  window.location.href =
    window.location.href.split("?")[0] + "?clickedPlay=yes";
}

function pause() {
  window.alert("PASUE");
}

function startGame() {
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
      gameOver();
      return;
    }

    time = 1;
  } else {
    time++;
  }

  requestAnimationFrame(loop);
}

function gameOver() {
  board.drawCurrentPiece();
  if (score > personalhighscore) {
    updateHighScore(score);
  }
  updateGlobalHighscore();
  getGlobalHighscore();

  // 0.5 second delay to draw board
  setTimeout(function () {
    window.alert("GAME OVER");
    window.location.href = window.location.href.split("?")[0];
  }, 500);
}
