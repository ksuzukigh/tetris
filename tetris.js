function rotatePiece(piece) {
  for (let y = 0; y < piece.length; y++) {
    for (let x = 0; x < y; x++) {
      [piece[x][y], piece[y][x]] = [piece[y][x], piece[x][y]];
    }
  }
  piece.forEach(row => row.reverse());
  return piece;
}

window.addEventListener("keydown", event => {
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
      const originalShape = currentPiece.shape;
      currentPiece.shape = rotatePiece([...currentPiece.shape]);
      if (collision()) {
        currentPiece.shape = originalShape;
      }
      break;
  }
});
