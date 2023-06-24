const canvas = document.getElementById('board');
const context = canvas.getContext('2d');
context.scale(BLOCK_SIZE, BLOCK_SIZE);

let dropCounter = 0;
let dropInterval = 1000;

let lastTime = 0;

function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;

    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        piece.pos.y++;
        dropCounter = 0;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);

    piece.draw(context);

    requestAnimationFrame(update);
}

const piece = getRandomPiece();

piece.pos.y = 0;
piece.pos.x = (BOARD_WIDTH / 2) | 0;

update();
