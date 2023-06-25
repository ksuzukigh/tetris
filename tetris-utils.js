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
  // ... omitted for brevity ...
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

// ... omitted for brevity ...

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
  // ... omitted for brevity ...
  removeFullRows();
  draw();
  setTimeout(dropPiece, 1000);
}

// ... omitted for brevity ...

function startGame() {
  generatePiece();
  dropPiece();
  score = 0;
  updateScore();
}

startGame();
