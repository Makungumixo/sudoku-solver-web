function createGrid() {
  const grid = document.getElementById('sudoku-grid');
  for (let i = 0; i < 81; i++) {
    const input = document.createElement('input');
    input.type = 'number';
    input.min = 1;
    input.max = 9;
    input.id = 'cell-' + i;
    grid.appendChild(input);
  }
}

function getBoard() {
  const board = [];
  for (let row = 0; row < 9; row++) {
    board[row] = [];
    for (let col = 0; col < 9; col++) {
      const val = document.getElementById('cell-' + (row * 9 + col)).value;
      board[row][col] = val ? parseInt(val) : 0;
    }
  }
  return board;
}

function setBoard(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cell = document.getElementById('cell-' + (row * 9 + col));
      cell.value = board[row][col] !== 0 ? board[row][col] : '';
    }
  }
}

function isValid(board, row, col, num) {
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num || board[x][col] === num) return false;
    const boxRow = 3 * Math.floor(row / 3) + Math.floor(x / 3);
    const boxCol = 3 * Math.floor(col / 3) + x % 3;
    if (board[boxRow][boxCol] === num) return false;
  }
  return true;
}

function solveSudoku(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;
            if (solveSudoku(board)) return true;
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function solve() {
  const board = getBoard();
  if (solveSudoku(board)) {
    setBoard(board);
    alert("Solved!");
  } else {
    alert("No solution found.");
  }
}

function clearGrid() {
  for (let i = 0; i < 81; i++) {
    document.getElementById('cell-' + i).value = '';
  }
}

function examplePuzzle() {
  const puzzle = [
    [5,3,0,0,7,0,0,0,0],
    [6,0,0,1,9,5,0,0,0],
    [0,9,8,0,0,0,0,6,0],
    [8,0,0,0,6,0,0,0,3],
    [4,0,0,8,0,3,0,0,1],
    [7,0,0,0,2,0,0,0,6],
    [0,6,0,0,0,0,2,8,0],
    [0,0,0,4,1,9,0,0,5],
    [0,0,0,0,8,0,0,7,9]
  ];
  setBoard(puzzle);
}

createGrid();
