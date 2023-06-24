const canvas = document.getElementById("game-board");
const ctx = canvas.getContext('2d');

const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let currentPiece;
let board = createBoard(rows, columns);

function createBoard(rows, columns) {
  return Array.from({ length: rows }, () => Array(columns).fill(0));
}

const shapes = {
  I: [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  ],
  J: [
    [0, 2, 0],
    [0, 2, 0],
    [2, 2, 0]
  ],
  L: [
    [0, 3, 0],
    [0, 3, 0],
    [0, 3, 3]
  ],
  O: [
    [4, 4],
    [4, 4]
  ],
  S: [
    [0, 5, 5],
    [5, 5, 0],
    [0, 0, 0]
  ],
  Z: [
    [6, 6, 0],
    [0, 6, 6],
    [0, 0, 0]
  ],
  T: [
    [7, 7, 7],
    [0, 7, 0],
    [0, 0, 0]
  ]
};

const colors = [
  'none',
  'cyan',
  'blue',
  'orange',
  'yellow',
  'green',
  'purple',
  'red'
];

function collide(board, piece) {
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x] !== 0 &&
        (board[y + piece.pos.y] &&
        board[y + piece.pos.y][x + piece.pos.x]) !== 0) {
        return true;
      }
    }
  }

  return false;
}

function merge(board, piece) {
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        board[y + piece.pos.y][x + piece.pos.x] = value;
      }
    });
  });
}

function draw() {
  board.forEach((row, y) => {
    row.forEach((value, x) => {
      ctx.fillStyle = colors[value];
      ctx.fillRect(x, y, 1, 1);
    });
  });

  if (currentPiece) {
    currentPiece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          ctx.fillStyle = colors[value];
          ctx.fillRect(x + currentPiece.pos.x, y + currentPiece.pos.y, 1, 1);
        }
      });
    });
  }
}

function resetBoard() {
  board = getEmptyBoard();
  dropCounter = 0;
  dropInterval = 1000;
  lastDropTime = 0;
  gameOver = false;
}

function getRandomPiece() {
  const pieces = 'ILJOTSZ';
  return createPiece(pieces[pieces.length * Math.random() | 0]);
}

function getEmptyBoard() {
  return Array.from({length: ROWS}, () => Array(COLUMNS).fill(0));
}

function createPiece(type) {
  if (type === 'I') {
    return new Piece(SHAPES_I, 'cyan');
  } else if (type === 'J') {
    return new Piece(SHAPES_J, 'blue');
  } else if (type === 'L') {
    return new Piece(SHAPES_L, 'orange');
  } else if (type === 'O') {
    return new Piece(SHAPES_O, 'yellow');
  } else if (type === 'S') {
    return new Piece(SHAPES_S, 'green');
  } else if (type === 'T') {
    return new Piece(SHAPES_T, 'purple');
  } else if (type === 'Z') {
    return new Piece(SHAPES_Z, 'red');
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBoard();
  drawPiece();
}
