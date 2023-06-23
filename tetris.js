let canvas;
let ctx;
let frames;
let grid;
let currentPos = { x: 0, y: 0 };
let currentPiece;
let pieces = [
    [[1, 1, 1, 1]], // I
    [[1, 1, 1, 0],  // L
     [1, 0, 0, 0]],
    [[1, 1, 1, 0],  // J
     [0, 0, 1, 0]],
    [[1, 1],        // O
     [1, 1]],
    [[1, 1, 0],     // S
     [0, 1, 1]],
    [[0, 1, 1],     // Z
     [1, 1, 0]],
    [[1, 1, 1],     // T
     [0, 1, 0]]
];

function resetGrid() {
    grid = Array.from({length: 20}, () => Array(10).fill(0));
}

function createPiece() {
    currentPiece = pieces[Math.floor(Math.random() * pieces.length)];
    currentPos = {x: 5 - Math.floor(currentPiece[0].length / 2), y: 0};
}

function drawPiece(piece, offset) {
    piece.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                ctx.fillRect((offset.x + x) * 30, (offset.y + y) * 30, 30, 30);
            }
        });
    });
}

function isValidMove(piece, offset) {
    for (let y = 0; y < piece.length; y++) {
        for (let x = 0; x < piece[y].length; x++) {
            if (piece[y][x] !== 0 &&
                (grid[y + offset.y] && grid[y + offset.y][x + offset.x]) !== 0) {
                return false;
            }
        }
    }
    return true;
}

function placePiece() {
    for (let y = 0; y < currentPiece.length; y++) {
        for (let x = 0; x < currentPiece[y].length; x++) {
            if (currentPiece[y][x]) {
                grid[currentPos.y + y][currentPos.x + x] = 1;
            }
        }
    }
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPiece(currentPiece, currentPos);
    frames++;

    if (frames % 30 === 0) {
        if (isValidMove(currentPiece, {x: currentPos.x, y: currentPos.y + 1})) {
            currentPos.y++;
        } else {
            placePiece();
            createPiece();
        }
    }
    
    requestAnimationFrame(update);
}

window.onkeydown = (e) => {
    if (e.key === "ArrowLeft" && isValidMove(currentPiece, {x: currentPos.x - 1, y: currentPos.y})) {
        currentPos.x--;
    } else if (e.key === "ArrowRight" && isValidMove(currentPiece, {x: currentPos.x + 1, y: currentPos.y})) {
        currentPos.x++;
    } else if (e.key === "ArrowUp") {
        rotatePiece();
    } else if (e.key === " ") {
        dropPiece();
    }
};

function startGame() {
    canvas = document.getElementById('board');
    ctx = canvas.getContext('2d');
    frames = 0;
    resetGrid();
    createPiece();
    update();
}
startGame();
window.onload = startGame;
