const canvas = document.getElementById("board");
const context = canvas.getContext("2d");

const board = createBoard(10, 20);
let piece = getRandomPiece();

function update() {
    dropPiece(piece, board);
    draw(board, context);
    setTimeout(update, 1000);
}

function startGame(board, piece) {
    board.forEach(row => row.fill(0));
    piece = getRandomPiece();
    dropPiece(piece, board);
}

startGame(board, piece);
update();
