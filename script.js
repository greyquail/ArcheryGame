const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ARROW_WIDTH = 60;
const ARROW_HEIGHT = 10;
const ARROW_SPEED = 5;
let arrowAngle = 0;
let arrowPosition = { x: canvas.width / 2, y: canvas.height / 2 };
let arrowVelocity = { x: 0, y: 0 };
let arrowFlying = false;

let score = 0;

function drawArrow(x, y, angle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle * Math.PI / 180);

    // Draw the arrow
    ctx.fillStyle = '#FF0000'; // Red arrow
    ctx.beginPath();
    ctx.moveTo(-ARROW_WIDTH / 2, -ARROW_HEIGHT / 2);
    ctx.lineTo(ARROW_WIDTH / 2, 0);
    ctx.lineTo(-ARROW_WIDTH / 2, ARROW_HEIGHT / 2);
    ctx.closePath();
    ctx.fill();

    // Draw the arrowhead
    ctx.fillStyle = '#000000'; // Black arrowhead
    ctx.beginPath();
    ctx.moveTo(ARROW_WIDTH / 2, 0);
    ctx.lineTo(ARROW_WIDTH / 2 + 15, -5);
    ctx.lineTo(ARROW_WIDTH / 2 + 15, 5);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
}

function updateArrow() {
    if (arrowFlying) {
        arrowPosition.x += arrowVelocity.x;
        arrowPosition.y += arrowVelocity.y;

        if (arrowPosition.x < 0 || arrowPosition.x > canvas.width ||
            arrowPosition.y < 0 || arrowPosition.y > canvas.height) {
            arrowFlying = false;
            arrowPosition = { x: canvas.width / 2, y: canvas.height / 2 };
            updateScore(-1); // Penalize for missing target
        }
    }
}

function updateScore(amount) {
    score += amount;
    document.getElementById('score').textContent = `Score: ${score}`;
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawArrow(arrowPosition.x, arrowPosition.y, arrowAngle);

    updateArrow();

    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        arrowAngle -= 5;
    }
    if (e.key === 'ArrowRight') {
        arrowAngle += 5;
    }
    if (e.key === ' ') {
        if (!arrowFlying) {
            arrowFlying = true;
            arrowVelocity.x = ARROW_SPEED * Math.cos(arrowAngle * Math.PI / 180);
            arrowVelocity.y = -ARROW_SPEED * Math.sin(arrowAngle * Math.PI / 180);
            updateScore(1); // Increment score for a valid shot
        }
    }
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    arrowPosition = { x: canvas.width / 2, y: canvas.height / 2 }; // Reset position
});

gameLoop();
