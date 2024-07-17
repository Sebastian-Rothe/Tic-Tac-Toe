let fields = [null, null, null, null, null, null, null, null, null];

let currentPlayer = 'cross'; // Startspieler ist 'cross'

function init() {
  render();
}

// Funktion zur Erzeugung des Kreises mit Animation (als String)
function createCircle() {
    return `
        <svg class="circle" width="80" height="80" viewBox="0 0 50 50">
            <circle cx="25" cy="25" r="20" stroke="#1E90FF" stroke-width="5" fill="transparent">
                <animate attributeName="stroke-dasharray" dur="1s" values="0,100;100,100" repeatCount="1" />
            </circle>
        </svg>
    `;
}

// Funktion zur Erzeugung des Kreuzes mit Animation (als String)
function createCross() {
    return `
        <svg class="cross" width="90" height="90" viewBox="0 0 50 50">
            <line x1="10" y1="10" x2="40" y2="40" stroke="#FFD700" stroke-width="5">
                <animate attributeName="stroke-dashoffset" dur="1s" values="0;25" repeatCount="1" />
            </line>
            <line x1="40" y1="10" x2="10" y2="40" stroke="#FFD700" stroke-width="5">
                <animate attributeName="stroke-dashoffset" dur="1s" values="0;25" repeatCount="1" />
            </line>
        </svg>
    `;
}

// Render-Funktion zur Erzeugung des Spielfelds
render();
function render() {
  let contentDiv = document.getElementById("content");
  let tableHTML = "<table>";

  for (let i = 0; i < 3; i++) {
    tableHTML += "<tr>";
    for (let j = 0; j < 3; j++) {
      let index = i * 3 + j;
      let symbol = '';
      if (fields[index] === "circle") {
        symbol = createCircle();
      } else if (fields[index] === "cross") {
        symbol = createCross();
      }
      tableHTML += `<td onclick="handleClick(${index})">${symbol}</td>`;
    }
    tableHTML += "</tr>";
  }

  tableHTML += "</table>";
  contentDiv.innerHTML = tableHTML;
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontale Reihen
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertikale Reihen
        [0, 4, 8], [2, 4, 6]             // Diagonale Reihen
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            drawWinningLine(a, c);
            return fields[a];
        }
    }
    return null;
}


function drawWinningLine(a, c) {
    let contentDiv = document.getElementById("content");
    let lineHTML = `
        <svg class="winning-line" width="300" height="300" viewBox="0 0 300 300">
            <line x1="${getXCoordinate(a)}" y1="${getYCoordinate(a)}" x2="${getXCoordinate(c)}" y2="${getYCoordinate(c)}" stroke="white" stroke-width="5">
                <animate attributeName="stroke-dasharray" from="0,300" to="300,300" dur="1s" fill="freeze" />
            </line>
        </svg>
    `;
    contentDiv.innerHTML += lineHTML;
}

function getXCoordinate(index) {
    return 100 * (index % 3) + 50;
}

function getYCoordinate(index) {
    return 100 * Math.floor(index / 3) + 50;
}



function handleClick(index) {
    if (fields[index] !== null) return; // Wenn das Feld bereits belegt ist, nichts tun
  
    fields[index] = currentPlayer; // Setze das aktuelle Symbol ins Feld
  
    currentPlayer = currentPlayer === 'cross' ? 'circle' : 'cross'; // Wechsel den Spieler
  
    render(); // Aktualisiere das Spielfeld

    checkWinner(); // Überprüfe, ob es einen Gewinner gibt
}


// Funktion zum Neustarten des Spiels
function restartGame() {
    // Setze alle Felder zurück
    fields = [null, null, null, null, null, null, null, null, null];
  
    // Rendere das Spielfeld neu
    render();
    // Lösche alle Gewinnlinien
    let winningLines = document.getElementsByClassName('winning-line');
    while (winningLines.length > 0) {
        winningLines[0].parentNode.removeChild(winningLines[0]);
    }
}
  
