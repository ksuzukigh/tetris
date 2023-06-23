const gameBoardElement = document.querySelector('#game-board');

// ブロックの定義
const blocks = [
  {
    color: 'cyan',
    shape: [[1, 1, 1, 1]]
  },
  // 他のブロックをここに定義
];

let gameBoard = [];
let currentBlock = null;
let currentX = 0;
let currentY = 0;

function startGame() {
  // ゲームボードの状態を初期化
  gameBoard = Array.from({ length: 20 }, () => Array(10).fill(0));
  startNewBlock();
  dropBlock();
}

function startNewBlock() {
  // ランダムなブロックを選択
  currentBlock = blocks[Math.floor(Math.random() * blocks.length)];
  currentX = Math.floor(gameBoardElement.clientWidth / 30 / 2);
  currentY = 0;
  drawBlock();
}

function drawBlock() {
  // すでに存在するブロックを削除
  document.querySelectorAll('.block').forEach(block => block.remove());

  currentBlock.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        const blockElement = document.createElement('div');
        blockElement.classList.add('block');
        blockElement.style.backgroundColor = currentBlock.color;
        blockElement.style.left = `${(currentX + x) * 30}px`;
        blockElement.style.top = `${(currentY + y) * 30}px`;
        gameBoardElement.appendChild(blockElement);
      }
    });
  });
}

function dropBlock() {
  currentY++;
  drawBlock();
  // ブロックが底に到達したときの処理
  if (hasReachedBottom()) {
    copyBlockToGameBoard();
    startNewBlock();
  }
  setTimeout(dropBlock, 1000);
}

function hasReachedBottom() {
  for (let y = 0; y < currentBlock.shape.length; y++) {
    for (let x = 0; x < currentBlock.shape[y].length; x++) {
      if (currentBlock.shape[y][x] === 1) {
        if (currentY + y + 1 >= 20 || gameBoard[currentY + y + 1][currentX + x] !== 0) {
          return true;
        }
      }
    }
  }
  return false;
}

function copyBlockToGameBoard() {
  for (let y = 0; y < currentBlock.shape.length; y++) {
    for (let x = 0; x < currentBlock.shape[y].length; x++) {
      if (currentBlock.shape[y][x] === 1) {
        gameBoard[currentY + y][currentX + x] = 1;
      }
    }
  }
}

startGame();
