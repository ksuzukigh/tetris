// tetris-utils.js

// ゲームの設定値
const rows = 20;
const columns = 10;
const squareSize = 20;
const colors = [null, 'red', 'blue', 'yellow', 'green', 'purple', 'orange', 'cyan'];

// canvasの設定
const canvas = document.getElementById('game-board');
const context = canvas.getContext('2d');

// ピースを作成する関数
function createPiece(type) {
  if (type === 'T') {
    return {
      shape: [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
      ],
      color: 'purple',
      x: 0,
      y: 0,
    };
  }
  // その他のタイプのピースの作成...
}

// ボードを作成する関数
function createBoard(rows, columns) {
  return new Array(rows).fill(0).map(row => new Array(columns).fill(0));
}

// ピースを描画する関数
function drawPiece(piece, context) {
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        context.fillStyle = colors[value];
        context.fillRect(x + piece.x, y + piece.y, 1, 1);
      }
    });
  });
}

// ボードを描画する関数
function drawBoard(board, context) {
  board.forEach((row, y) => {
    row.forEach((value, x) => {
      context.fillStyle = colors[value];
      context.fillRect(x, y, 1, 1);
    });
  });
}

// ピースを落とす関数
function dropPiece() {
  currentPiece.y++;
  if (collision()) {
    currentPiece.y--;
    mergePiece();
    removeRows(getCompletedRows());
    generatePiece();
    if (collision()) {
      // ゲームオーバー
      board = createBoard(rows, columns);
    }
  }
}

// 描画をアップデートする関数
function update() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.scale(squareSize, squareSize);
  drawBoard(board, context);
  drawPiece(currentPiece, context);
  context.scale(1/squareSize, 1/squareSize);
}

// 描画をアップデートする関数を一定間隔で呼び出す関数
function updateGame() {
  update();
  dropPiece();
  setTimeout(updateGame, 1000);
}

// 行が完全に埋まっているか確認する関数
function isRowComplete(row) {
  return row.every(value => value !== 0);
}

// 完全に埋まった行を取得する関数
function getCompletedRows() {
  return board.reduce((completedRows, row, y) => 
    isRowComplete(row) ? completedRows.concat(y) : completedRows
  , []);
}

// 行を削除する関数
function removeRows(rowNumbers) {
  rowNumbers.forEach(rowNumber => {
    board.splice(rowNumber, 1);
    board.unshift(new Array(columns).fill(0));
  });
}

// 新しいピースを生成する関数
function generatePiece() {
  const pieceType = 'T'; // 今回はすべて 'T' 型のピースとする
  currentPiece = createPiece(pieceType);
  currentPiece.x = Math.floor(columns / 2) - Math.ceil(currentPiece.shape[0] / 2);

  // 新しいピースがボードの上部で衝突する場合はゲームオーバー
  if (collision()) {
    board = createBoard(rows, columns); // ボードをクリア
  }
}

// ピースがボードの境界や他のピースと衝突するかを確認する関数
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

// ピースを回転させた時に衝突するかを確認する関数
function collisionWithNewShape(newShape) {
  for (let y = 0; y < newShape.length; y++) {
    for (let x = 0; x < newShape[y].length; x++) {
      if (
        newShape[y][x] !== 0 &&
        (board[y + currentPiece.y] && board[y + currentPiece.y][x + currentPiece.x]) !== 0
      ) {
        return true;
      }
    }
  }
  return false;
}
