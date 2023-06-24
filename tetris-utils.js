const scale = 20;
const canvas = document.getElementById("game-board");
const ctx = canvas.getContext('2d');

const rows = canvas.height / scale;
const columns = canvas.width / scale;

const shapes = {
  I: [
    [1, 1, 1, 1]
  ],
  L: [
    [1, 0],
    [1, 0],
    [1, 1]
  ],
  J: [
    [0, 1],
    [0, 1],
    [1, 1]
  ],
  O: [
    [1, 1],
    [1, 1]
  ],
  T: [
    [1, 1, 1],
    [0, 1, 0]
  ],
  S: [
    [0, 1, 1],
    [1, 1]
  ],
  Z: [
    [1, 1],
    [0, 1, 1]
  ]
};

const colors = [
  null,
  '#D32F2F', // red
  '#C2185B', // pink
  '#7B1FA2', // purple
  '#512DA8', // deep purple
  '#303F9F', // indigo
  '#1976D2', // blue
  '#0288D1', // light blue
  '#0097A7', // cyan
  '#00796B', // teal
  '#388E3C', // green
  '#689F38', // light green
  '#AFB42B', // lime
  '#FBC02D', // yellow
  '#FFA000', // amber
  '#F57C00', // orange
  '#E64A19'  // deep orange
];

function createBoard(rows, columns) {
  return Array.from({ length: rows }, () => Array(columns).fill(0));
}

function getRandomPiece() {
  const pieces = 'ILJOTSZ';
  const piece = pieces[Math.floor(Math.random() * pieces.length)];
  return shapes[piece];
}

function createPiece() {
  return { x: 3, y: 0, shape: getRandomPiece() };
}
