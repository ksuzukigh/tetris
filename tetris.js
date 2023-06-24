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
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  L: [
    [2, 0, 0],
    [2, 2, 2],
    [0, 0, 0]
  ],
  J: [
    [0, 0, 3],
    [3, 3, 3],
    [0, 0, 0]
  ],
  O: [
    [4, 4],
    [4, 4]
  ],
  T: [
    [0, 5, 0],
    [5, 5, 5],
    [0, 0, 0]
  ],
  S: [
    [0, 6, 6],
    [6, 6, 0],
    [0, 0, 0]
  ],
  Z: [
    [7, 7, 0],
    [0, 7, 7],
    [0, 0, 0]
  ]
};

const colors = [
  null,
  'white',  // I
  'white',  // L
  'white',  // J
  'white',  // O
  'white',  // T
  'white',  // S
  'white'   // Z
];

function draw() {
  board.forEach((row, y) => {
    row.forEach((value, x) => {
      ctx.fillStyle = colors[value];
      ctx.fillRect(x, y, 1, 1);
    });
  });

  currentPiece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        ctx.fillStyle = colors[value];
        ctx.fillRect(x + currentPiece.x, y + currentPiece.y, 1, 1);
      }
    });
  });
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
}

function generatePiece() {
  const pieces = 'ILJOTSZ';
  const piece = pieces[Math.floor(Math.random() * pieces.length)];
  currentPiece = { x: 3, y: 0, shape: shapes[piece] };
}

function dropPiece() {
  currentPiece.y++;
  if (collision()) {
    currentPiece.y--;
    mergePiece();
    generatePiece();
    if (collision()) {
      // Game over
      board = board.map(row => row.fill(0));
    }
  }
  draw();
  setTimeout(dropPiece, 1000);
}

function startGame() {
  generatePiece();
  dropPiece();
}

startGame();
