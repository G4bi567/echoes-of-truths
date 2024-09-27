const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    // Game logic and rendering go here
    
    requestAnimationFrame(gameLoop);
}

gameLoop();
