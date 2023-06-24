document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('board');
    const context = canvas.getContext('2d');

    let piece;

    function update() {
        draw(context, board);
        piece.draw(context);
    }

    function draw(context, board) {
        for(let y = 0; y < BOARD_HEIGHT; y++) {
            for(let x = 0; x < BOARD_WIDTH; x++) {
                if(board[y][x] !== 0) {
                    drawBlock(context, x, y, COLORS[board[y][x]]);
                }
            }
        }
    }

    function startGame() {
        board = createBoard(BOARD_WIDTH, BOARD_HEIGHT);
        piece = getRandomPiece();
        update();
    }

    startGame();
});
