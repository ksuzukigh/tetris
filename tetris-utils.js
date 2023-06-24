const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;
const LINES_PER_LEVEL = 10;
const COLORS = [
  'none',
  'cyan',
  'blue',
  'orange',
  'yellow',
  'green',
  'purple',
  'red'
];
const SHAPES = [
  [],
  [[1, 1, 1, 1]], // I
  [[0, 2, 2],     // O
   [2, 2]],
  [[3, 3, 0],     // T
   [0, 3, 0]],
  [[4, 0, 0],     // L
   [4, 4, 4]],
  [[0, 0, 5],     // J
   [5, 5, 5]],
  [[6, 6, 0],     // S
   [0, 6, 6]],
  [[0, 7, 7],     // Z
   [7, 7]]
];

// Piece class
class Piece {
  x;
  y;
  color;
  shape;

  constructor(shape) {
    this.x = 0;
    this.y = 0;
    this.color = COLORS[shape[0][0]];
    this.shape = shape;
  }
}

function createBoard(cols, rows) {
  return Array.from({ length: rows }, () => Array(cols).fill(0));
}

function collides(board, piece) {
  for (let y = 0; y < piece.shape.length; ++y) {
    for (let x = 0; x < piece.shape[y].length; ++x) {
      if (piece.shape[y][x] &&
        (board[y + piece.y] &&
          board[y + piece.y][x + piece.x]) !== 0) {
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
        board[y + piece.y][x + piece.x] = value;
      }
    });
  });
}

function rotate(piece) {
  let p = JSON.parse(JSON.stringify(piece));
  // Transpose matrix
  for (let y = 0; y < p.shape.length; ++y) {
    for (let x = 0; x < y; ++x) {
      [p.shape[x][y], p.shape[y][x]] = [p.shape[y][x], p.shape[x][y]];
    }
  }
  // Reverse the order of the columns.
  p.shape.forEach(row => row.reverse());
  return p;
}

function getRandomPiece() {
  let index = Math.floor(Math.random() * 7) + 1;
  let shape = SHAPES[index];
  return createPiece(shape);
}

function createPiece(shape) {
  return new Piece(shape);
}
