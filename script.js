const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ARROW_WIDTH = 60;
const ARROW_HEIGHT = 10;
const ARROW_SPEED = 10;
let arrowAngle = 0;
let arrowPosition = { x: canvas.width / 2, y: canvas.height / 2 };
let arrowVelocity = { x: 0, y: 0 };
let arrowFlying = false;

function drawArrow(x, y, angle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle * Math.PI / 180);
    ctx.fillStyle = '#000000';
    ctx.fillRect(-ARROW_WIDTH / 2, -ARROW_HEIGHT / 2, ARROW_WIDTH, ARROW_HEIGHT);
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
        }
    }
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
        }
    }
});

gameLoop();
