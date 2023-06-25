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
