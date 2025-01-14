const rows = 24;
const cols = 24;

let playing = false;

let grid = new Array(rows);
let nextGrid = new Array(rows);

let timer;
let reproductionTime = 200;

let liveCellCount = 0;

function initializeGrids() {
  for (let i = 0; i < rows; i++) {
    grid[i] = new Array(cols).fill(0);
    nextGrid[i] = new Array(cols).fill(0);
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
  let [row, col] = this.id.split('_').map(Number);
  let classes = this.getAttribute('class');
  if (classes.includes('live')) {
    this.setAttribute('class', 'dead');
    grid[row][col] = 0;
  } else {
    this.setAttribute('class', 'live');
    grid[row][col] = 1;
  }
  updateStats();
}

function createTable() {
  let gridContainer = document.getElementById('gridContainer');
  if (!gridContainer) {
    console.error('Problem: no div for the grid table!');
    return;
  }
  let table = document.createElement('table');
  for (let i = 0; i < rows; i++) {
    let tr = document.createElement('tr');
    for (let j = 0; j < cols; j++) {
      let cell = document.createElement('td');
      cell.setAttribute('id', `${i}_${j}`);
      cell.setAttribute('class', 'dead');
      cell.onclick = cellClickHandler;
      tr.appendChild(cell);
    }
    table.appendChild(tr);
  }
  gridContainer.appendChild(table);
}

function setupControlButtons() {
  document.getElementById('start').onclick = startButtonHandler;
  document.getElementById('clear').onclick = clearButtonHandler;
  document.getElementById('random').onclick = randomButtonHandler;
}

function randomButtonHandler() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j] = Math.random() > 0.5 ? 1 : 0;
      let cell = document.getElementById(`${i}_${j}`);
      cell.setAttribute('class', grid[i][j] ? 'live' : 'dead');
    }
  }
  updateStats();
}

function clearButtonHandler() {
  playing = false;
  document.getElementById('start').innerHTML = 'start';
  clearTimeout(timer);
  let cells = document.querySelectorAll('.live, .old-live');
  cells.forEach(cell => cell.setAttribute('class', 'dead'));
  resetGrids();
  updateStats();
}

function startButtonHandler() {
  if (playing) {
    playing = false;
    this.innerHTML = 'continue';
    clearTimeout(timer);
  } else {
    playing = true;
    this.innerHTML = 'pause';
    play();
  }
}

function play() {
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
  updateStats();
}

function applyRules(row, col) {
  let numNeighbors = countNeighbors(row, col);
  if (grid[row][col] === 1) {
    nextGrid[row][col] = numNeighbors === 2 || numNeighbors === 3 ? 1 : 0;
  } else {
    nextGrid[row][col] = numNeighbors === 3 ? 1 : 0;
  }
}

function countNeighbors(row, col) {
  let directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1], [1, 0], [1, 1]
  ];
  return directions.reduce((count, [dx, dy]) => {
    let newRow = row + dx, newCol = col + dy;
    if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
      return count + grid[newRow][newCol];
    }
    return count;
  }, 0);
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
      let cell = document.getElementById(`${i}_${j}`);
      if (grid[i][j] === 0) {
        cell.setAttribute('class', 'dead');
      } else {
        let classes = cell.getAttribute('class');
        if (classes.includes('live')) {
          cell.setAttribute('class', 'old-live');
        } else {
          cell.setAttribute('class', 'live');
        }
      }
    }
  }
}

function updateStats() {
  liveCellCount = grid.flat().filter(cell => cell === 1).length;
  let deadCellCount = rows * cols - liveCellCount;
  document.getElementById('liveCount').innerHTML = `Live: ${liveCellCount}`;
  document.getElementById('deadCount').innerHTML = `Dead: ${deadCellCount}`;
}

function initialize() {
  createTable();
  initializeGrids();
  resetGrids();
  setupControlButtons();
  updateStats();
}

window.onload = initialize;