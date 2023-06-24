// Block types
const I = [
    [
        [1, 1, 1, 1],
    ],
];

const O = [
    [
        [2, 2],
        [2, 2],
    ],
];

const T = [
    [
        [0, 3, 0],
        [3, 3, 3],
    ],
];

const S = [
    [
        [0, 4, 4],
        [4, 4, 0],
    ],
];

const Z = [
    [
        [5, 5, 0],
        [0, 5, 5],
    ],
];

const L = [
    [
        [6, 0],
        [6, 0],
        [6, 6],
    ],
];

const J = [
    [
        [0, 7],
        [0, 7],
        [7, 7],
    ],
];

const COLORS = [
    null,
    'cyan',
    'yellow',
    'purple',
    'green',
    'red',
    'blue',
    'orange',
];

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const BLOCK_SIZE = 30;
const BOARD_COLOR = '#000';
const BLOCK_COLOR = '#f00';
const LINES_COLOR = '#888';

let board = createBoard(BOARD_WIDTH, BOARD_HEIGHT);

function createBoard(width, height) {
    let board = [];
    for(let y = 0; y < height; y++) {
        board[y] = [];
        for(let x = 0; x < width; x++) {
            board[y][x] = 0;
        }
    }
    return board;
}

function drawBlock(context, x, y, color) {
    context.fillStyle = color;
    context.fillRect(x*BLOCK_SIZE, y*BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    context.strokeStyle = LINES_COLOR;
    context.strokeRect(x*BLOCK_SIZE, y*BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
}

// Pieces 
const pieces = [I, J, L, O, S, T, Z];

function createPiece(type)
{
    if (type === 'T') {
        return T;
    } else if (type === 'O') {
        return O;
    } else if (type === 'L') {
        return L;
    } else if (type === 'J') {
        return J;
    } else if (type === 'I') {
        return I;
    } else if (type === 'S') {
        return S;
    } else if (type === 'Z') {
        return Z;
    }
}

function getRandomPiece() {
    const typeId = Math.floor(Math.random() * pieces.length); // 0 ~ 6
    const type = pieces[typeId];
    const piece = { typeId: typeId, rotationId: 0, x: 0, y: 0, blocks: createPiece(type) };

    return piece;
}
