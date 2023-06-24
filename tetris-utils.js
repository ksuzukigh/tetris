class Piece {
    constructor(matrix, color) {
        this.matrix = matrix;
        this.color = color;
        this.pos = { y: 0, x: Math.floor(createBoard[0].length / 2) };
    }
}

const pieces = [
    [Z, "red"],
    [S, "green"],
    [T, "yellow"],
    [O, "blue"],
    [L, "pink"],
    [I, "cyan"],
    [J, "orange"]
];

function createBoard(w, h) {
    let matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

function getRandomPiece() {
    let [p, c] = pieces[pieces.length * Math.random() | 0];
    return new Piece(p, c);
}

function draw(board, context) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = 'white';
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            if (board[y][x]) {
                context.fillRect(x, y, 1, 1);
            }
        }
    }
}

function collide(piece, board) {
    const m = piece.matrix;
    const o = piece.pos;
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 && (board[y + o.y] && board[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

function merge(piece, board) {
    piece.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                board[y + piece.pos.y][x + piece.pos.x] = value;
            }
        });
    });
}

function rotate(matrix, dir) {
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < y; ++x) {
            [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
        }
    }
    if (dir > 0) {
        matrix.forEach(row => row.reverse());
    } else {
        matrix.reverse();
    }
}

function dropPiece(piece, board) {
    piece.pos.y++;
    if (collide(piece, board)) {
        piece.pos.y--;
        merge(piece, board);
        piece = getRandomPiece();
        board.fill(0);
        if (collide(piece, board)) {
            // game over
            board.forEach(row => row.fill(0));
        }
    }
}

function move(dir, piece, board) {
    piece.pos.x += dir;
    if (collide(piece, board)) {
        piece.pos.x -= dir;
    }
}

function rotatePiece(dir, piece, board) {
    const pos = piece.pos.x;
    let offset = 1;
    rotate(piece.matrix, dir);
    while (collide(piece, board)) {
        piece.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > piece.matrix[0].length) {
            rotate(piece.matrix, -dir);
            piece.pos.x = pos;
            return;
        }
    }
}
