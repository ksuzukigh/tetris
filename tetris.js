let board = createBoard(rows, columns);
let currentPiece = null;

function draw() {
  // Draw game board
  board.forEach((row, y) => {
    row.forEach((value, x) => {
      ctx.fillStyle = colors[value];
      ctx.fillRect(x, y, 1, 1);
    });
  });

  // Draw current piece
  if (currentPiece) {
    currentPiece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          ctx.fillStyle = colors[value];
          ctx.fillRect(x + currentPiece.x, y + currentPiece.y, 1, 1);
        }
      });
    });
  }
}

function startGame() {
  currentPiece = createPiece();
  draw();
}

startGame();
