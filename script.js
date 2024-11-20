// Email Popup Logic
document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('emailPopup');
    const closePopup = document.getElementById('closePopup');

    setTimeout(() => {
        popup.style.display = 'block';
    }, 1000);

    closePopup.addEventListener('click', () => {
        popup.style.display = 'none';
    });
});

// Game Logic
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 600;

let coneX = canvas.width / 2;
const coneWidth = 50;
const coneHeight = 30;

let scoops = [];
let score = 0;

// Generate a new scoop
function generateScoop() {
    const x = Math.random() * (canvas.width - 20);
    scoops.push({ x, y: 0 });
}

// Draw cone and scoops
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw cone
    ctx.fillRect(coneX, canvas.height - coneHeight, coneWidth, coneHeight);

    // Draw scoops
    scoops.forEach((scoop) => {
        ctx.beginPath();
        ctx.arc(scoop.x, scoop.y, 10, 0, Math.PI * 2);
        ctx.fill();
    });
}

// Update game state
function update() {
    scoops.forEach((scoop) => {
        scoop.y += 2;

        // Check collision with cone
        if (
            scoop.y >= canvas.height - coneHeight &&
            scoop.x > coneX &&
            scoop.x < coneX + coneWidth
        ) {
            score++;
            scoop.y = -100; // Remove scoop
        }

        // Check if scoop missed
        if (scoop.y > canvas.height) {
            alert('You lose!');
            location.reload();
        }
    });
}

// Game loop
function gameLoop() {
    draw();
    update();
    requestAnimationFrame(gameLoop);
}

// Start game
setInterval(generateScoop, 2000);
gameLoop();

// Move cone
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') coneX -= 20;
    if (e.key === 'ArrowRight') coneX += 20;
});
