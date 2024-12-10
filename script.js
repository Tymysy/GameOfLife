let rows = document.querySelector("#rows").value;
let cols = document.querySelector("#columns").value;
const btnStart = document.querySelector("#start")

function createTable() {
    let gameContainer = document.getElementById("containerOfGame");
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

window.onload = initialize;