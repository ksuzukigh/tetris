const canvas = document.getElementById('game-board');
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
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0]
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0]
  ],
  O: [
    [1, 1],
    [1, 1]
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0]
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0]
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0]
  ]
};

const colors = [
  null,
  'red',
  'blue',
  'yellow',
  'green',
  'purple',
  'cyan',
  'orange',
];

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  board.forEach((row, y) => {
    row.forEach((value, x) => {
      ctx.fillStyle = colors[value];
      ctx.fillRect(x * scale, y * scale, scale, scale);
    });
  });

  currentPiece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        ctx.fillStyle = colors[value];
        ctx.fillRect((x + currentPiece.x) * scale, (y + currentPiece.y) * scale, scale, scale);
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
      if (currentPiece.shape[y][x] !== 0 &&
          (board[y + currentPiece.y] && board[y + currentPiece.y][x + currentPiece.x]) !== 0) {
        return true;
      }
    }
  }
}

function generatePiece() {
  const pieces = 'IJLOSTZ';
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
