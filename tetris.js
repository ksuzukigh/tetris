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

function movePiece(dir) {
  currentPiece.x += dir;
  if (collision()) {
    currentPiece.x -= dir;
  }
  draw();
}

function rotatePiece() {
  // ここに回転のロジックを追加
}

function dropPieceOne() {
  currentPiece.y++;
  if (collision()) {
    currentPiece.y--;
    mergePiece();
    generatePiece();
  }
  draw();
}

function startGame() {
  generatePiece();
  dropPiece();
  window.addEventListener("keydown", handleKeydown);
}

function handleKeydown(e) {
  if (e.key === "ArrowUp") rotatePiece();
  else if (e.key === "ArrowRight") movePiece(1);
  else if (e.key === "ArrowDown") dropPieceOne();
  else if (e.key === "ArrowLeft") movePiece(-1);
}

startGame();
