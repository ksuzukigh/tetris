const rows = 40;
const columns = 10;
const squareColors = ['white', 'red', 'blue', 'yellow', 'green', 'purple', 'cyan', 'orange'];
const pieceColors = ['red', 'blue', 'yellow', 'green', 'purple', 'cyan', 'orange'];
let currentPiece;
let board = createBoard(rows, columns);

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

function mergePiece() {
  currentPiece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        board[y + currentPiece.y][x + currentPiece.x] = value;
      }
    });
  });
}

function rotatePiece(piece) {
  for (let y = 0; y < piece.length; y++) {
    for (let x = 0; x < y; x++) {
      [piece[x][y], piece[y][x]] = [piece[y][x], piece[x][y]];
    }
  }
  piece.forEach(row => row.reverse());
  return piece;
}

function handleKeyPress(event) {
  const { keyCode } = event;

  switch (keyCode) {
    case 37: // 左矢印キー
      erasePiece(currentPiece);
      currentPiece.x--;
      if (collision()) {
        currentPiece.x++;
      }
      drawPiece(currentPiece);
      break;

    case 39: // 右矢印キー
      erasePiece(currentPiece);
      currentPiece.x++;
      if (collision()) {
        currentPiece.x--;
      }
      drawPiece(currentPiece);
      break;

    case 40: // 下矢印キー
      erasePiece(currentPiece);
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
      drawPiece(currentPiece);
      break;
      
    case 38: // 上矢印キー
      erasePiece(currentPiece);
      const originalShape = currentPiece.shape;
      currentPiece.shape = rotatePiece([...currentPiece.shape]);
      if (collision()) {
        currentPiece.shape = originalShape;
      }
      drawPiece(currentPiece);
      break;
  }
}

function dropPiece() {
  erasePiece(currentPiece);
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
  drawPiece(currentPiece);
  drawBoard(board);
  setTimeout(dropPiece, 1000);
}

function startGame() {
  generatePiece();
  dropPiece();
}

window.addEventListener("keydown", handleKeyPress);
startGame();
