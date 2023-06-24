const I = [
    [1, 1, 1, 1]
];

const J = [
    [1, 0, 0],
    [1, 1, 1]
];

const L = [
    [0, 0, 1],
    [1, 1, 1]
];

const O = [
    [1, 1],
    [1, 1]
];

const S = [
    [0, 1, 1],
    [1, 1, 0]
];

const T = [
    [0, 1, 0],
    [1, 1, 1]
];

const Z = [
    [1, 1, 0],
    [0, 1, 1]
];

function createPiece(type) {
    switch (type) {
        case 'I':
            return I;
        case 'J':
            return J;
        case 'L':
            return L;
        case 'O':
            return O;
        case 'S':
            return S;
        case 'T':
            return T;
        case 'Z':
            return Z;
    }
}

function drawPiece(piece, offset) {
    piece.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = COLORS[value];
                context.fillRect(x + offset.x,
                    y + offset.y,
                    1, 1);
            }
        });
    });
}

function draw() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    drawPiece(player.matrix, player.pos);
}

function merge(arena, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}

function collide(arena, player) {
    const [m, o] = [player.matrix, player.pos];
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 &&
                (arena[y + o.y] &&
                    arena[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

function rotate(matrix, dir) {
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < y; ++x) {
            [
                matrix[x][y],
                matrix[y][x],
            ] = [
                matrix[y][x],
                matrix[x][y],
            ];
        }
    }

    if (dir > 0) {
        matrix.forEach(row => row.reverse());
    } else {
        matrix.reverse();
    }
}
