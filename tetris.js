const canvas = document.getElementById('game-board');
const context = canvas.getContext('2d');
const grid = 20;
const columns = canvas.width / grid;
const rows = canvas.height / grid;
const colors = ['red', 'blue', 'purple', 'green', 'yellow', 'orange', 'cyan'];

let pieces = [
    [[1]],
    [[1, 1], [1, 1]],
    [[1, 1, 0], [0, 1, 1]],
    [[0, 1, 1], [1, 1]],
    [[1, 1, 1, 1]],
    [[1, 1, 1], [0, 0, 1]],
    [[1, 1, 1], [1]],
];

let currentPiece, nextPiece;
let time = {
    start: 0,
    elapsed: 0,
    level: 1000,
};

let board = Array.from({ length: rows }, () => Array(columns).fill(0));

function startGame() {
    currentPiece = new Piece();
    nextPiece = new Piece();
    board = Array.from({ length: rows }, () => Array(columns).fill(0));
    time.start = performance.now();
    animate();
}

function animate(now = 0) {
    time.elapsed = now - time.start;
    if (time.elapsed > time.level) {
        time.start = now;
        dropPiece();
    }
    drawBoard();
    drawPiece(currentPiece);
    requestAnimationFrame(animate);
}

function dropPiece() {
    currentPiece.y++;
    if (collides(board, currentPiece)) {
        currentPiece.y--;
        merge(board, currentPiece);
        currentPiece = nextPiece;
        nextPiece = new Piece();
    }
}

function rotate(piece) {
    for (let y = 0; y < piece.shape.length; ++y) {
        for (let x = 0; x < y; ++x) {
            [piece.shape[x][y], piece.shape[y][x]] =
                [piece.shape[y][x], piece.shape[x][y]];
        }
    }
    piece.shape.forEach(row => row.reverse());
}

document.addEventListener('keydown', event => {
    if (event.key === 'ArrowUp') dropPiece();
    if (event.key === ' ') rotate(currentPiece);
    if (event.key === 'ArrowRight') movePiece(1);
    if (event.key === 'ArrowLeft') movePiece(-1);
    if (event.key === 'ArrowDown') time.level = 50;
});

document.addEventListener('keyup', event => {
    if (event.key === 'ArrowDown') time.level = 1000;
});

function collides(board, piece) {
    for (let y = 0; y < piece.shape.length; y++) {
        for (let x = 0; x < piece.shape[y].length; x++) {
            if (
                piece.shape[y][x] &&
                (board[y + piece.y] &&
                    board[y + piece.y][x + piece.x]) !== 0
            ) {
                return true;
            }
        }
    }
    return false;
}

function merge(board, piece) {
    for (let y = 0; y < piece.shape.length; y++) {
        for (let x = 0; x < piece.shape[y].length; x++) {
            if (piece.shape[y][x]) {
                board[y + piece.y][x + piece.x] = piece.color;
            }
        }
    }
}

function movePiece(dir) {
    currentPiece.x += dir;
    if (collides(board, currentPiece)) {
        currentPiece.x -= dir;
    }
}

function drawBoard() {
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
            if (board[y][x]) {
                context.fillStyle = colors[board[y][x]];
                context.fillRect(x * grid, y * grid, grid, grid);
            }
        }
    }
}

function drawPiece(piece) {
    context.fillStyle = colors[piece.color];
    piece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value > 0) {
                context.fillRect(
                    (piece.x + x) * grid,
                    (piece.y + y) * grid,
                    grid,
                    grid,
                );
            }
        });
    });
}

class Piece {
    constructor() {
        this.color = 'purple';
        this.shape = [[1, 1, 1, 1]];
        this.x = 3;
        this.y = 0;
    }
}

startGame();
