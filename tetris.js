let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;

function update(time = 0) {
  const deltaTime = time - lastTime;
  lastTime = time;

  dropCounter += deltaTime;
  if (dropCounter > dropInterval) {
    dropPiece();
  }

  draw();
  requestAnimationFrame(update);
}

function dropPiece() {
  currentPiece.pos.y++;
  if (collide(board, currentPiece)) {
    currentPiece.pos.y--;
    merge(board, currentPiece);
    startGame();
  }
}

function startGame() {
  currentPiece = getRandomPiece();
  dropInterval = 1000;
}

startGame();
update();
