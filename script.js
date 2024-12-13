const btnStart = document.querySelector("#start")
const btnClear = document.querySelector('#clear')
const btnCreate = document.querySelector('#create')

btnCreate.addEventListener('click', createTable);
btnClear.addEventListener('click', clearTable);

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
            tr.appendChild(cell);
        }
        table.appendChild(tr);
    }
    gameContainer.appendChild(table);
}

function clearTable() {
    let gameContainer = document.querySelector("#containerOfGame");
    if (gameContainer) {
        gameContainer.innerHTML = ""}
}