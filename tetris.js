// グローバル変数の定義
let canvas, ctx, frames, currentPiece, currentPos;
let grid = Array.from({length: 20}, () => Array(10).fill(0));

// テトリミノの形状の定義
const pieces = [
    [[1, 1, 1, 1]],
    [[1, 1], [1, 1]],
    [[1, 1, 0], [0, 1, 1]],
    [[0, 1, 1], [1, 1]],
    [[1, 1, 1], [0, 1, 0]],
    [[1, 1, 1], [0, 0, 1]],
    [[1, 1, 1], [1, 0, 0]]
];

// テトリミノの新しいインスタンスを作成する
function createPiece() {
    currentPiece = [...pieces[Math.floor(Math.random() * pieces.length)]];
    currentPos = {x: 3, y: 0};
}

// 移動または回転が有効かどうかを確認する
function isValidMove(piece, pos) {
    for (let y = 0; y < piece.length; ++y) {
        for (let x = 0; x < piece[y].length; ++x) {
            if (piece[y][x] && 
                ((grid[y + pos.y] === undefined || grid[y + pos.y][x + pos.x] === undefined) ||
                grid[y + pos.y][x + pos.x])
            ) {
                return false;
            }
        }
    }
    return true;
}

// テトリミノを旋回させる
function rotatePiece() {
    const tempPiece = currentPiece.map((_, i) => currentPiece.map(col => col[i])).reverse();
    
    if (isValidMove(tempPiece, currentPos)) { // 回転が有効かどうかチェック
        currentPiece = tempPiece; // 有効なら回転を適用
    }
}

// テトリミノを即底に落とす
function dropPiece() {
    while (isValidMove(currentPiece, {x: currentPos.x, y: currentPos.y + 1})) { // ブロックが下に移動できる限り
        currentPos.y++; // ブロックを下に移動
    }
}

// フレームごとの更新を処理する
function update() {
    frames++;

    // 描画更新
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000";
    for (let y = 0; y < 20; ++y) {
        for (let x = 0; x < 10; ++x) {
            if (grid[y][x]) {
                ctx.fillRect(x*30, y*30, 30, 30);
            }
        }
    }

    // ピースの描画
    ctx.fillStyle = "#f00";
    for (let y = 0; y < currentPiece.length; ++y) {
        for (let x = 0; x < currentPiece[y].length; ++x) {
            if (currentPiece[y][x]) {
                ctx.fillRect((currentPos.x + x) * 30, (currentPos.y + y) * 30, 30, 30);
            }
        }
    }

    if (frames % 30 === 0) {
        if (isValidMove(currentPiece, {x: currentPos.x, y: currentPos.y + 1})) {
            currentPos.y++;
        }
    }
    
    requestAnimationFrame(update);
}

// キーボード入力を処理する
window.onkeydown = (e) => {
    if (e.key === "ArrowLeft" && isValidMove(currentPiece, {x: currentPos.x - 1, y: currentPos.y})) {
        currentPos.x--;
    } else if (e.key === "ArrowRight" && isValidMove(currentPiece, {x: currentPos.x + 1, y: currentPos.y})) {
        currentPos.x++;
    } else if (e.key === "ArrowUp") {
        rotatePiece();
    } else if (e.key === " ") {
        dropPiece();
    }
};

// ゲームの開始
function startGame() {
    canvas = document.getElementById("board");
    ctx = canvas.getContext("2d");
    frames = 0;
    createPiece();
    update();
}

startGame();
