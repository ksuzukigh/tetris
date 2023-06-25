const canvas = document.getElementById('game-board');
const context = canvas.getContext('2d');
const scale = 20;

const tetriminos = [
  [
    [1, 1, 1, 1]
  ],
  [
    [1, 1, 1, 0],
    [0, 0, 1, 0]
  ],
  [
    [0, 0, 1, 0],
    [1, 1, 1, 0]
  ],
  [
    [0, 1, 1],
    [1, 1]
  ],
  [
    [1, 1],
    [1, 1]
  ],
  [
    [1, 1, 0],
    [0, 1, 1]
  ],
  [
    [1, 1, 1],
    [0, 1, 0]
  ]
];

function generatePiece() {
  const id = Math.floor(Math.random() * tetriminos.length);
  const shape = tetriminos[id];

  return {
    id: id,
    shape: shape,
    x: Math.floor(columns / 2) - Math.floor(shape[0].length / 2),
    y: 0
  };
}

function drawSquare(x, y, color) {
  context.fillStyle = color;
  context.fillRect(x * scale, y * scale, scale, scale);

  context.strokeStyle = 'black';
  context.strokeRect(x * scale, y * scale, scale, scale);
}

function drawPiece(piece) {
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x] === 1) {
        drawSquare(piece.x + x, piece.y + y, pieceColors[piece.id]);
      }
    }
  }
}

function drawBoard(board) {
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      drawSquare(x, y, squareColors[board[y][x]]);
    }
  }
}

function erasePiece(piece) {
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x] === 1) {
        drawSquare(piece.x + x, piece.y + y, squareColors[0]);
      }
    }
  }
}

function createBoard(rows, columns) {
  let board = [];
  for (let y = 0; y < rows; y++) {
    board[y] = [];
    for (let x = 0; x < columns; x++) {
      board[y][x] = 0;
    }
  }
  return board;
}
