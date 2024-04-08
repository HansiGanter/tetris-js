class Piece {
  constructor() {
    this.x = 160;
    this.y = 0;
    this.size = 40;
    this.color = "blue";
    this.fixed = false;

    window.addEventListener("keydown", (e) => {
      if (!this.fixed) {
        switch (e.key) {
          case "ArrowLeft":
            if (this.x > 0) {
              this.x -= 40;
            }
            break;
          case "ArrowRight":
            if (this.x < 360) {
              this.x += 40;
            }
            break;
        }
      }
    });
  }

  draw(ctx) {
    // Draw rectangle
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}
export default Piece; // Use default export
