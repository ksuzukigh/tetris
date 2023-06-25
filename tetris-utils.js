const canvas = document.getElementById("game-board");
const ctx = canvas.getContext('2d');

const scale = 40;

const rows = canvas.height / scale;
const columns = canvas.width / scale;

let score = 0;

const shapes = {
  I: [
    [1, 1, 1, 1],
  ],
  // ... (omitted for brevity)
};

// ... (omitted for brevity)

function updateScore() {
  document.getElementById('score').innerText = "Score: " + score;
}

function createBoard(rows, columns) {
  return Array.from({ length: rows }, () => Array(columns).fill(0));
}

function draw() {
  // ... (omitted for brevity)
}

function generatePiece() {
  // ... (omitted for brevity)
}

function dropPiece() {
  // ... (omitted for brevity)
}

function removeRow() {
  outer: for (let y = rows - 1; y >= 0; --y) {
    for (let x = 0; x < columns; ++x) {
      if (board[y][x] === 0) {
        continue outer;
      }
    }
    
    const row = board.splice(y, 1)[0].fill(0);
    board.unshift(row);
    ++y;

    score += 10;
    updateScore();
  }
}

// ... (omitted for brevity)

function startGame() {
  generatePiece();
  dropPiece();
}

startGame();
