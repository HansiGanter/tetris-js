// set up canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// function to generate random number

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random RGB color value

function randomRGB() {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class SimplePiece {

    constructor() {
        this.x = 160;
        this.y = 0;
        this.size = 40;
        this.color = 'blue';
        this.fixed = false

        window.addEventListener("keydown", (e) => {
            if (this.y < 760) {
                switch (e.key) {
                    case "ArrowLeft":
                        if (this.x > 0) {
                            this.x -= 40
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

    draw() {
        // Draw rectangle
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }

    update() {
        if (this.y < 760) {
            this.y += 40
        } else { this.fixed = true }
    }
}

delay = 0;
level = 10;
currentPiece = new SimplePiece();
pieces = [];

function loop() {
    if (currentPiece.fixed) {
        x = currentPiece;
        pieces.push(x);
        currentPiece = new SimplePiece()
    }
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, 400, 800);
    pieces.forEach(p => {
        p.draw()
    });
    currentPiece.draw()
    if (delay === level) {

        currentPiece.update()
        delay = 0
    } else {
        delay++
    }

    requestAnimationFrame(loop);
}

loop();