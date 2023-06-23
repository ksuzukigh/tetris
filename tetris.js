let canvas = document.getElementById('game-board');
let ctx = canvas.getContext('2d');

let scale = 20;
let columns = 10;
let rows = 20;

canvas.width = columns * scale;
canvas.height = rows * scale;

let board = new Array(rows).fill(new Array(columns).fill(0));

let shapes = [
    [[1]],
    [[1, 1], [1, 1]],
    [[1, 0], [1, 0], [1, 1]],
    [[1, 1, 1, 1]],
    [[1, 1, 0], [0, 1, 1]],
    [[0, 1, 1], [1, 1]]
];

let currentPiece;

function startGame() {
    drawBoard();
    generatePiece();
}

function drawBoard() {
    for(let y = 0; y < rows; y++) {
        for(let x = 0; x < columns; x++) {
            let value = board[y][x];
            ctx.fillStyle = value ? 'red' : 'white';
            ctx.strokeStyle = 'black';
            ctx.fillRect(x * scale, y * scale, scale, scale);
            ctx.strokeRect(x * scale, y * scale, scale, scale);
        }
    }
}

function generatePiece() {
    let id = Math.floor(Math.random() * shapes.length);
    let shape = shapes[id];

    currentPiece = { id, x: Math.floor(columns / 2) - 1, y: 0, shape };

    if(isColliding()) {
        resetGame();
    }
}

function resetGame() {
    board = new Array(rows).fill(new Array(columns).fill(0));
}

function isColliding() {
    for(let y = 0; y < currentPiece.shape.length; y++) {
        for(let x = 0; x < currentPiece.shape[y].length; x++) {
            if(currentPiece.shape[y][x] && (board[y + currentPiece.y] && board[y + currentPiece.y][x + currentPiece.x]) !== 0) {
                return true;
            }
        }
    }

    return false;
}

function dropPiece() {
    currentPiece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                if (currentPiece.y + y + 1 >= rows || (currentPiece.y + y + 1 < rows && board[currentPiece.y + y + 1][currentPiece.x + x] !== 0)) {
                    currentPiece.shape.forEach((_row, _y) => {
                        _row.forEach((_value, _x) => {
                            if (_value !== 0) {
                                board[currentPiece.y + _y][currentPiece.x + _x] = currentPiece.id + 1;
                            }
                        });
                    });

                    generatePiece();
                    return;
                }
            }
        });
    });

    currentPiece.y++;
}

startGame();
setInterval(dropPiece, 1000);
