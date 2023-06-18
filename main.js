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

        window.addEventListener("keydown", (e) => {
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
        });
    }

    draw() {
        // Draw rectangle
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }

    update() {
        this.y += 40
    }
}

delay = 0
level = 100
x = new SimplePiece()

function loop() {

    x.draw()
    if (delay === level) {
        if (x.y <= 800) {
            x.update()
        }
        delay = 0
    } else {
        delay++
    }

    requestAnimationFrame(loop);
}

loop();