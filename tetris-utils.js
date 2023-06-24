const canvas = document.getElementById("game-board");
const ctx = canvas.getContext('2d');

const scale = 40;

const rows = canvas.height / scale;
const columns = canvas.width / scale;

const shapes = {
  I: [
    [1, 1, 1, 1],
  ],
  L: [
    [0, 2],
    [0, 2],
    [2, 2],
  ],
  J: [
    [3, 0],
    [3, 0],
    [3, 3],
  ],
  O: [
    [4, 4],
    [4, 4],
  ],
  T: [
    [0, 5, 0],
    [5, 5, 5],
  ],
  S: [
    [0, 6, 6],
    [6, 6, 0],
  ],
  Z: [
    [7, 7, 0],
    [0, 7, 7],
  ]
};


const colors = [
  null,
  'cyan',    // I
  'blue',    // J
  'orange',  // L
  'yellow',  // O
  'purple',  // T
  'green',   // S
  'red'      // Z
];

function createBoard(rows, columns) {
  return Array.from({ length: rows }, () => Array(columns).fill(0));
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the game board
  board.forEach((row, y) => {
    row.forEach((value, x) => {
      // Fill in the cell if it is not empty
      if (value !== 0) {
        ctx.fillStyle = colors[value];
        ctx.fillRect(x * scale, y * scale, scale, scale);
      }

      // Draw grid lines
      ctx.strokeStyle = '#DDD';
      ctx.strokeRect(x * scale, y * scale, scale, scale);
    });
  });

  // Draw the current piece
  if (currentPiece) {
    currentPiece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          ctx.fillStyle = colors[value];
          ctx.fillRect((x + currentPiece.x) * scale, (y + currentPiece.y) * scale, scale, scale);
        }
      });
    });
  }
}

function generatePiece() {
  const pieces = 'ILJOTSZ';
  const piece = pieces[Math.floor(Math.random() * pieces.length)];
  currentPiece = { x: 5, y: 0, shape: shapes[piece] };
}

function movePiece(dir, y = 0) {
  currentPiece.x += dir;
  currentPiece.y += y;
  if (collision()) {
    currentPiece.x -= dir;
    currentPiece.y -= y;
  }
}

function dropPiece(toBottom = false) {
  if (toBottom) {
    while (!collision()) {
      currentPiece.y++;
    }
    currentPiece.y--;
    mergePiece();
    generatePiece();
    if (collision()) {
      // Game over
      board = createBoard(rows, columns);
    }
  } else {
    currentPiece.y++;
    if (collision()) {
      currentPiece.y--;
      mergePiece();
      generatePiece();
      if (collision()) {
        // Game over
        board = createBoard(rows, columns);
      }
    }
  }
  draw();
}

document.addEventListener('keydown', event => {
  if (event.key === 'ArrowUp') {
    // Rotate piece clockwise
    // TO-DO: Implement piece rotation
  } else if (event.key === 'ArrowRight') {
    movePiece(1);
  } else if (event.key === 'ArrowDown') {
    // Note: This will only move the piece one cell down
    movePiece(0, 1);
  } else if (event.key === 'ArrowLeft') {
    movePiece(-1);
  } else if (event.key === ' ') {
    // Hard drop piece (move piece to bottom instantly)
    dropPiece(true);
  }
});

function startGame() {
  generatePiece();
  dropPiece();
}

startGame();
