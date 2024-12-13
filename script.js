const btnStart = document.querySelector("#start")
const btnDelete = document.querySelector('#delete')
const btnCreate = document.querySelector('#create')
const btnClear = document.querySelector('#clear')
const playing = false;

btnCreate.addEventListener('click', createTable);
btnDelete.addEventListener('click', deleteTable);
btnStart.addEventListener('click', startButtonHandler);
btnClear.addEventListener('click', clearButtonHandler);

function cellClickHandler() {
    let classes = this.getAttribute('class');
    if (classes.indexOf('live') > -1) {
      this.setAttribute('class', 'dead');
    } else {
      this.setAttribute('class', 'live');
    }
  }

function createTable() {
    let rows = document.querySelector("#rows").value;
    let cols = document.querySelector("#columns").value;
    let gameContainer = document.querySelector("#containerOfGame");
    if (!gameContainer) {
        console.error("Problem: no div for the grid table!");
    }
    let table = document.createElement("table");

    for (let i = 0; i < rows; i++) {
        let tr = document.createElement("tr");
        for (let j = 0; j < cols; j++) {
            let cell = document.createElement("td");
            cell.setAttribute("id", i + "_" + j);
            cell.setAttribute("class", "dead");
            cell.onclick = cellClickHandler;
            tr.appendChild(cell);
        }
        table.appendChild(tr);
    }
    gameContainer.appendChild(table);
}

function deleteTable() {
    let gameContainer = document.querySelector("#containerOfGame");
    if (gameContainer) {
        gameContainer.innerHTML = ""}
}

function clearButtonHandler() {
    playing = false;
    btnStart.innerHTML = "start"
}

function startButtonHandler() {
    if (playing) {
      console.log('Pause the Game');
      playing = false;
      btnStart.innerHTML = 'continue';
    } else {
      console.log('Cont the game');
      playing = true;
      btnStart.innerHTML = 'pause';
      play();
    }
  }
  
  function play() {
      console.log("Play the game")
  }