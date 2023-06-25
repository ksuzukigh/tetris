const canvas = document.getElementById("game-board");
const ctx = canvas.getContext('2d');

const scale = 40;

const rows = canvas.height / scale;
const columns = canvas.width / scale;

let score = 0;
const scoreElement = document.getElementById("score");

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

  board.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        ctx.fillStyle = colors[value];
        ctx.fillRect(x * scale, y * scale, scale, scale);
      }

      ctx.strokeStyle = '#DDD';
      ctx.strokeRect(x * scale, y * scale, scale, scale);
    });
  });

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

let currentPiece;
let board = createBoard(rows, columns);

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

function removeFullRows() {
  for (let y = rows - 1; y >= 0; y--) {
    if (board[y].every(value => value !== 0)) {
      board.splice(y, 1);
      board.unshift(Array(columns).fill(0));
      score += 10;
      updateScore();
    }
  }
}

function updateScore() {
  scoreElement.innerText = `Score: ${score}`;
}

function dropPiece() {
  currentPiece.y++;
  if (collision()) {
    currentPiece.y--;
    mergePiece();
    removeFullRows();
    generatePiece();
  }
  draw();
  setTimeout(dropPiece, 1000);
}

function handleKeyPress(event) {
  switch (event.key) {
    case 'ArrowUp':
      currentPiece.shape = rotate(currentPiece.shape);
      break;
    case 'ArrowDown':
      currentPiece.y++;
      break;
    case 'ArrowRight':
      currentPiece.x++;
      break;
    case 'ArrowLeft':
      currentPiece.x--;
      break;
  }
  draw();
}

document.addEventListener('keydown', handleKeyPress);

function startGame() {
  generatePiece();
  dropPiece();
  score = 0;
  updateScore();
}

startGame();
