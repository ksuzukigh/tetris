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

let currentPiece;
let board = createBoard(rows, columns);

function createBoard(rows, columns) {
  return Array.from({ length: rows }, () => Array(columns).fill(0));
}

function clearRows() {
  outer: for (let y = board.length -1; y >= 0; --y) {
    for (let x = 0; x < board[y].length; ++x) {
      if (board[y][x] === 0) {
        continue outer;
      }
    }

    const row = board.splice(y, 1)[0].fill(0);
    board.unshift(row);
    console.log("Clearing row: ", y); // ログステートメントを追加
  }
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

function dropPiece() {
  currentPiece.y++;
  if (collision()) {
    currentPiece.y--;
    mergePiece();
    clearRows();  // Add this to clear rows whenever a piece is dropped and merged
    generatePiece();
    if (collision()) {
      // Game over
      board = createBoard(rows, columns);
    }
  }
  draw();
  setTimeout(dropPiece, 1000);
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
        console.log("Collision at: ", x + currentPiece.x, y + currentPiece.y);  // ログステートメントを追加
        return true;
      }
    }
  }
  return false;
}

// ピースを反時計回りに90度回転させる関数
function rotatePiece(piece) {
  const newPiece = piece[0].map((val, index) => piece.map(row => row[index])).reverse();
  return newPiece;
}

// キーボードの操作を処理する関数
function handleKeyPress(event) {
  const { keyCode } = event;

  switch (keyCode) {
    case 37: // 左矢印キー
      currentPiece.x--;
      if (collision()) {
        currentPiece.x++;
      }
      break;

    case 39: // 右矢印キー
      currentPiece.x++;
      if (collision()) {
        currentPiece.x--;
      }
      break;

    case 40: // 下矢印キー
      currentPiece.y++;
      if (collision()) {
        currentPiece.y--;
        mergePiece();
        clearRows();  // Add this to clear rows whenever a piece is dropped and merged
        generatePiece();
        if (collision()) {
          // ゲームオーバー
          board = createBoard(rows, columns);
        }
      }
      break;

    case 38: // 上矢印キー
      const originalShape = currentPiece.shape;
      currentPiece.shape = rotatePiece([...currentPiece.shape]);
      if (collision()) {
        currentPiece.shape = originalShape;
      }
      break;
  }
}

window.addEventListener("keydown", handleKeyPress);

function startGame() {
  generatePiece();
  dropPiece();
}

startGame();
