// This file contains codes that handle game logic

let currentPiece;
let board = createBoard(rows, columns);

// ピースをボードに結合する関数
function mergePiece() {
  currentPiece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        board[y + currentPiece.y][x + currentPiece.x] = value;
      }
    });
  });
}

// ピースが衝突するかどうかを判定する関数
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

// ゲームを開始する関数
function startGame() {
  generatePiece();
  dropPiece();
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
      // ピースの回転処理はここに追加する
      break;
  }
}

// キーボードの操作を監視する
window.addEventListener('keydown', handleKeyPress);

startGame();
