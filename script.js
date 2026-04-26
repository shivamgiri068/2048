const grid = document.getElementById("grid");
const scoreDisplay = document.getElementById("score");

let board = [];
let score = 0;

function initGame() {
  grid.innerHTML = "";
  board = Array(16).fill(0);
  score = 0;
  scoreDisplay.textContent = "Score: 0";

  for (let i = 0; i < 16; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    grid.appendChild(cell);
  }

  addNumber();
  addNumber();
  updateGrid();
}

function addNumber() {
  let empty = board.map((v, i) => v === 0 ? i : null).filter(v => v !== null);
  if (empty.length === 0) return;

  let index = empty[Math.floor(Math.random() * empty.length)];
  board[index] = Math.random() < 0.9 ? 2 : 4;
}

function updateGrid() {
  const cells = document.querySelectorAll(".cell");

  cells.forEach((cell, i) => {
    cell.textContent = board[i] !== 0 ? board[i] : "";
    cell.setAttribute("data-value", board[i]);
  });

  scoreDisplay.textContent = "Score: " + score;
}

function slide(row) {
  row = row.filter(v => v);
  for (let i = 0; i < row.length - 1; i++) {
    if (row[i] === row[i + 1]) {
      row[i] *= 2;
      score += row[i];
      row[i + 1] = 0;
    }
  }
  row = row.filter(v => v);
  while (row.length < 4) row.push(0);
  return row;
}

function moveLeft() {
  for (let i = 0; i < 4; i++) {
    let row = board.slice(i * 4, i * 4 + 4);
    row = slide(row);
    board.splice(i * 4, 4, ...row);
  }
}

function moveRight() {
  for (let i = 0; i < 4; i++) {
    let row = board.slice(i * 4, i * 4 + 4).reverse();
    row = slide(row).reverse();
    board.splice(i * 4, 4, ...row);
  }
}

function moveUp() {
  for (let i = 0; i < 4; i++) {
    let col = [board[i], board[i+4], board[i+8], board[i+12]];
    col = slide(col);
    [board[i], board[i+4], board[i+8], board[i+12]] = col;
  }
}

function moveDown() {
  for (let i = 0; i < 4; i++) {
    let col = [board[i], board[i+4], board[i+8], board[i+12]].reverse();
    col = slide(col).reverse();
    [board[i], board[i+4], board[i+8], board[i+12]] = col;
  }
}

document.addEventListener("keydown", (e) => {
  let prevBoard = [...board];

  if (e.key === "ArrowLeft") moveLeft();
  if (e.key === "ArrowRight") moveRight();
  if (e.key === "ArrowUp") moveUp();
  if (e.key === "ArrowDown") moveDown();

  if (JSON.stringify(prevBoard) !== JSON.stringify(board)) {
    addNumber();
    updateGrid();
  }
});

initGame();
