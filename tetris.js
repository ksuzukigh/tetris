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
      moveLeft();
      break;

    case 39: // 右矢印キー
      moveRight();
      break;

    case 40: // 下矢印キー
      moveDown();
      break;

    case 38: // 上矢印キー
      rotate();
      break;
  }
}

function moveLeft() {
  currentPiece.x--;
  if (collision()) {
    currentPiece.x++;
  }
}

function moveRight() {
  currentPiece.x++;
  if (collision()) {
    currentPiece.x--;
  }
}

function moveDown() {
  currentPiece.y++;
  if (collision()) {
    currentPiece.y--;
    mergePiece();
    generatePiece();
    if (collision()) {
      // ゲームオーバー
      board = createBoard(rows, columns);
    }
  }
}

function rotate() {
  const originalShape = currentPiece.shape;
  currentPiece.shape = rotatePiece([...currentPiece.shape]);
  if (collision()) {
    currentPiece.shape = originalShape;
  }
}

window.addEventListener("keydown", handleKeyPress);

// Add click event listener for buttons
document.getElementById("left-button").addEventListener("click", moveLeft);
document.getElementById("right-button").addEventListener("click", moveRight);
document.getElementById("down-button").addEventListener("click", moveDown);
document.getElementById("up-button").addEventListener("click", rotate);

function startGame() {
  generatePiece();
  dropPiece();
}

startGame();
