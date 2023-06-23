const canvas = document.getElementById('game-board');
const context = canvas.getContext('2d');
const scale = 20;
const cols = canvas.width / scale;
const rows = canvas.height / scale;
let board = Array.from({length: rows}, () => Array(cols).fill(0));
let currentPiece = null;

const pieces = [
    [[1, 1, 1, 1]],
    [[1, 1], [1, 1]],
    [[1, 1, 0], [0, 1, 1]],
    [[0, 1, 1], [1, 1]],
    [[1, 1, 1], [0, 1, 0]],
    [[1, 1, 1], [1, 0, 0]],
    [[1, 1, 1], [0, 0, 1]]
];

function startGame() {
    currentPiece = createPiece();
    dropPiece();
}

function createPiece() {
    const id = Math.floor(Math.random() * pieces.length);
    const piece = pieces[id];
    return {
        id: id,
        x: Math.floor(cols / 2) - Math.floor(piece[0].length / 2),
        y: 0,
        blocks: piece
    };
}

function dropPiece() {
    let collision = false;

    currentPiece.y++;

    currentPiece.blocks.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                if (currentPiece.y + y === rows || board[currentPiece.y + y + 1][currentPiece.x + x] !== 0) {
                    collision = true;
                }
            }
        });
    });

    if (collision) {
        currentPiece.y--;
        placePiece();
        currentPiece = createPiece();
    }

    setTimeout(dropPiece, 500);
}

function placePiece() {
    currentPiece.blocks.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                board[currentPiece.y + y][currentPiece.x + x] = currentPiece.id + 1;
            }
        });
    });

    drawBoard();
}

function drawBoard() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    board.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = ['cyan', 'yellow', 'red', 'green', 'blue', 'orange', 'purple'][value - 1];
                context.fillRect(x * scale, y * scale, scale, scale);
            }
        });
    });
}

startGame();
