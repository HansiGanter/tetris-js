import Piece from "./Piece.js";

// set up canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// function to generate random number
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random RGB color value
function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

let delay = 1;
let level = 10;
let currentPiece = new Piece();
let pieces = [];

function loop() {
  if (delay === 0) {
    if (currentPiece.fixed) {
      let x = currentPiece;
      pieces.push(x);
      currentPiece = new Piece();
    }
    ctx.fillStyle = "rgba(0, 0, 0, 0.60)";
    ctx.fillRect(0, 0, 400, 800);
    pieces.forEach((p) => {
      p.draw(ctx);
    });
    currentPiece.draw(ctx);
    currentPiece.y += 40;
    let restPiece = false;

    if (currentPiece.y >= 760) restPiece = true;
    pieces.forEach((p) => {
      if (currentPiece.y + 40 >= p.y && currentPiece.x === p.x) {
        restPiece = true;
        return;
      }
    });
    if (restPiece) currentPiece.fixed = true;
    if (currentPiece.fixed && currentPiece.y === 40) {
      window.alert("FINISH");
      return;
    }

    delay = 1;
  } else {
    delay++;
  }

  requestAnimationFrame(loop);
}

loop();
