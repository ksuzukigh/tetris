const canvas = document.getElementById("game-board");
const context = canvas.getContext("2d");
const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;
const pieces = [
  [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    [2, 0, 0],
    [2, 2, 2],
    [0, 0, 0],
  ],
  [
    [0, 0, 3],
    [3, 3, 3],
    [0, 0, 0],
  ],
  [
    [4, 4],
    [4, 4],
  ],
  [
    [0, 5, 5],
    [5, 5, 0],
    [0, 0, 0],
  ],
  [
    [6, 6, 0],
    [0, 6, 6],
    [0, 0, 0],
  ],
  [
    [0, 7, 0],
    [7, 7, 7],
    [0, 0, 0],
  ],
];

function createBoard(rows, columns) {
  let board = [];
  for (let row = 0; row < rows; row++) {
    board[row] = [];
    for (let column = 0; column < columns; column++) {
      board[row][column] = 0;
    }
  }
  return board;
}

function drawBoard(board) {
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      drawSquare(x, y, board[y][x]);
    }
  }
}

function drawSquare(x, y, colorIndex) {
  context.fillStyle = ["#000000", "#FF0D72", "#0DC2FF", "#0DFF72", "#F538FF", "#FF8E0D", "#FFE138", "#3877FF"][colorIndex];
  context.fillRect(x * scale, y * scale, scale, scale);
}

function generatePiece() {
  currentPiece = {
    x: 0,
    y: 0,
    shape: pieces[Math.floor(Math.random() * pieces.length)],
  };
}

function drawPiece(piece) {
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x] !== 0) {
        drawSquare(x + piece.x, y + piece.y, piece.shape[y][x]);
      }
    }
  }
}

function dropPiece() {
  currentPiece.y++;
  if (collision()) {
    currentPiece.y--;
    mergePiece();
    generatePiece();
    if (collision()) {
      // game over
      board = createBoard(rows, columns);
    }
  }
}

function mergePiece() {
  currentPiece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        board[y + currentPiece.y][x + currentPiece.x] = value;
      }
    });
  });
}

function collision() {
  for (let y = 0; y < currentPiece.shape.length; y++) {
    for (let x = 0; x < currentPiece.shape[y].length; x++) {
      if (
        currentPiece.shape[y][x] !== 0 &&
        (board[y + currentPiece.y] && board[y + currentPiece.y][x + currentPiece.x]) !== 0
      ) {
        return true;
      }
    }
  }
  return false;
}

function startGame() {
  drawBoard(board);
  drawPiece(currentPiece);
  setTimeout(startGame, 1000);
}

startGame();
