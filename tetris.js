// tetris.js
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

// ピースを反時計回りに90度回転させる関数
function rotatePiece(piece) {
  let newPiece = JSON.parse(JSON.stringify(piece));
  for (let y = 0; y < newPiece.length; y++) {
    for (let x = 0; x < y; x++) {
      [newPiece[x][y], newPiece[y][x]] = [newPiece[y][x], newPiece[x][y]];
    }
  }
  newPiece.forEach(row => row.reverse());
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
      dropPiece();
      break;
      
    case 38: // 上矢印キー
      const newShape = rotatePiece(currentPiece.shape);
      if (!collisionWithNewShape(newShape)) {
        currentPiece.shape = newShape;
      }
      break;
  }
}

window.addEventListener("keydown", handleKeyPress);

function startGame() {
  generatePiece();
  updateGame();
}

startGame();
