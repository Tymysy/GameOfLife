const rows = 24;
const cols = 24;

let playing = false;

let grid = new Array(rows);
let nextGrid = new Array(rows);

let timer;
let reproductionTime = 200;

function initializeGrids() {
  for (let i = 0; i < rows; i++) {
    grid[i] = new Array(cols);
    nextGrid[i] = new Array(cols);
  }
}

function resetGrids() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j] = 0;
      nextGrid[i][j] = 0;
    }
  }
}

function cellClickHandler() {
  let rowcol = this.id.split('_');
  let row = rowcol[0];
  let col = rowcol[1];
  let classes = this.getAttribute('class');
  if (classes.indexOf('live') > -1) {
    this.setAttribute('class', 'dead');
    grid[row][col] = 0;
  } else {
    this.setAttribute('class', 'live');
    grid[row][col] = 1;
  }
}

// lay out the board
function createTable() {
  let gridContainer = document.getElementById('gridContainer');
  if (!gridContainer) {
    // throw error
    console.error('Problem: no div for the grid table!');
  }
  let table = document.createElement('table');

  for (let i = 0; i < rows; i++) {
    let tr = document.createElement('tr');
    for (let j = 0; j < cols; j++) {
      let cell = document.createElement('td');
      cell.setAttribute('id', i + '_' + j);
      cell.setAttribute('class', 'dead');
      cell.onclick = cellClickHandler;
      tr.appendChild(cell);
    }
    table.appendChild(tr);
  }
  gridContainer.appendChild(table);
}

function setupControlButtons() {
  let startButton = document.getElementById('start');
  startButton.onclick = startButtonHandler;
  let clearButton = document.getElementById('clear');
  clearButton.onclick = clearButtonHandler;

  let randomButton = document.getElementById('random');
  randomButton.onclick = randomButtonHandler;
}

function randomButtonHandler() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j] = Math.floor(Math.random() * 2);
      let cell = document.getElementById(i + '_' + j);
      if (grid[i][j] == 1) cell.setAttribute('class', 'live');
    }
  }
}

function clearButtonHandler() {
  playing = false;
  let startButton = document.getElementById('start');
  startButton.innerHTML = 'start';
  clearTimeout(timer);
  let cellList = document.getElementsByClassName('live');
  for (let i = 0; i < cellList.length; i++) {
    cellList[i].setAttribute('class', 'dead');
  }
  resetGrids();
}

function startButtonHandler() {
  if (playing) {
    console.log('Pause the Game');
    playing = false;
    this.innerHTML = 'continue';
    clearTimeout(timer);
  } else {
    console.log('Cont the game');
    playing = true;
    this.innerHTML = 'pause';
    play();
  }
}

function play() {
  console.log('Play the game');
  computeNextGen();

  if (playing) {
    timer = setTimeout(play, reproductionTime);
  }
}

function computeNextGen() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      applyRules(i, j);
    }
  }
  copyAndResetGrid();
  updateView();
}

function applyRules(row, col) {
  let numNeighbors = countNeighbors(row, col);
  if (grid[row][col] == 1) {
    if (numNeighbors < 2) {
      nextGrid[row][col] = 0;
    } else if (numNeighbors == 2 || numNeighbors == 3) {
      nextGrid[row][col] = 1;
    } else if (numNeighbors > 3) {
      nextGrid[row][col] = 0;
    }
  } else if (grid[row][col] == 0) {
    if (numNeighbors == 3) {
      nextGrid[row][col] = 1;
    }
  }
}

function countNeighbors(row, col) {
  let count = 0;
  if (row - 1 >= 0) {
    if (grid[row - 1][col] == 1) count++;
  }
  if (row - 1 >= 0 && col - 1 >= 0) {
    if (grid[row - 1][col - 1] == 1) count++;
  }
  if (row - 1 >= 0 && col + 1 < cols) {
    if (grid[row - 1][col + 1] == 1) count++;
  }
  if (col - 1 >= 0) {
    if (grid[row][col - 1] == 1) count++;
  }
  if (col + 1 < cols) {
    if (grid[row][col + 1] == 1) count++;
  }
  if (row + 1 < rows) {
    if (grid[row + 1][col] == 1) count++;
  }
  if (row + 1 < rows && col - 1 >= 0) {
    if (grid[row + 1][col - 1] == 1) count++;
  }
  if (row + 1 < rows && col + 1 < cols) {
    if (grid[row + 1][col + 1] == 1) count++;
  }
  return count;
}

function copyAndResetGrid() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j] = nextGrid[i][j];
      nextGrid[i][j] = 0;
    }
  }
}

function updateView() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let cell = document.getElementById(i + '_' + j);
      if (grid[i][j] == 0) {
        cell.setAttribute('class', 'dead');
      } else {
        cell.setAttribute('class', 'live');
      }
    }
  }
}

function initialize() {
  createTable();
  initializeGrids();
  resetGrids();
  setupControlButtons();
}

window.onload = initialize();