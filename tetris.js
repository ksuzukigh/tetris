const gameBoard = document.querySelector('#game-board');

// ブロックの定義
const blocks = [
  {
    color: 'cyan',
    shape: [[1, 1, 1, 1]]
  },
  // 他のブロックをここに定義
];

let currentBlock = null;
let currentX = 0;
let currentY = 0;

function startGame() {
  // ランダムなブロックを選択
  currentBlock = blocks[Math.floor(Math.random() * blocks.length)];
  currentX = Math.floor(gameBoard.clientWidth / 30 / 2);
  currentY = 0;
  drawBlock();
  // ゲーム開始時にブロックの落下を開始
  dropBlock();
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
        gameBoard.appendChild(blockElement);
      }
    });
  });
}

function dropBlock() {
  currentY++;
  drawBlock();
  // 1秒ごとにブロックを下に移動
  setTimeout(dropBlock, 1000);
}

startGame();
