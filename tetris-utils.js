// tetris-utils.js
// ゲームの設定
const rows = 20;
const columns = 10;
const squareSize = 20;

// ピースの定義
const pieces = [
  [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  [
    [2, 0, 0],
    [2, 2, 2],
    [0, 0, 0]
  ],
  [
    [0, 0, 3],
    [3, 3, 3],
    [0, 0, 0]
  ],
  [
    [4, 4],
    [4, 4]
  ],
  [
    [0, 5, 5],
    [5, 5, 0],
    [0, 0, 0]
  ],
  [
    [6, 6, 0],
    [0, 6, 6],
    [0, 0, 0]
  ],
  [
    [0, 7, 0],
    [7, 7, 7],
    [0, 0, 0]
  ]
];

// ゲームボードの作成
function createBoard(rows, columns) {
  let board = [];
  for (let row = 0; row < rows; row++) {
    board[row] = [];
    for (let column = 0; column < columns; column++) {
      board[row][column] = 0;
    }
  }
  return board;
}

// キャンバスの設定
let canvas = document.getElementById('game-board');
let context = canvas.getContext('2d');
context.scale(squareSize, squareSize);

// ピースの描画
function drawPiece(x, y, shape) {
  shape.forEach((row, dy) => {
    row.forEach((value, dx) => {
      if (value !== 0) {
        context.fillStyle = colors[value];
        context.fillRect(x + dx, y + dy, 1, 1);
      }
    });
  });
}

// ボードの描画
function drawBoard() {
  context.fillStyle = '#000';
  context.fillRect(0, 0, canvas.width, canvas.height);
  board.forEach((row, y) => {
    row.forEach((value, x) => {
      context.fillStyle = colors[value];
      context.fillRect(x, y, 1, 1);
    });
  });
  drawPiece(currentPiece.x, currentPiece.y, currentPiece.shape);
}

// ピースの生成
function generatePiece() {
  let index = Math.floor(Math.random() * pieces.length);
  let shape = pieces[index];
  currentPiece = {
    x: Math.floor(columns / 2) - Math.floor(shape[0].length / 2),
    y: 0,
    shape: shape
  };
}

// ピースの落下
function dropPiece() {
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

// 描画更新
function update() {
  drawBoard();
  dropPiece();
  requestAnimationFrame(update);
}

window.rows = rows;
window.columns = columns;
window.board = createBoard(rows, columns);
window.currentPiece = undefined;
window.colors = ['black', 'purple', 'yellow', 'orange', 'blue', 'aqua', 'green', 'red'];
window.createBoard = createBoard;
window.drawPiece = drawPiece;
window.drawBoard = drawBoard;
window.generatePiece = generatePiece;
window.dropPiece = dropPiece;
window.update = update;

update();
generatePiece();
