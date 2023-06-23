var table;
var rows;
var columns;
var textMoves;
var arrayForBoard = [];
var tableNum = 0
var tableBox

function start() {
    var button = document.getElementById("newGame");
    var addTb = document.getElementById("addTab");
    button.addEventListener("click", startNewGame, false);
    addTb.addEventListener("click", AddTable, false);
    table = document.getElementById("table0");
    tableBox = document.getElementById("tablePlus");
    rows = 4;
    columns = 4;
    startNewGame();
}

function startNewGame() {
    tableBox.innerHTML = ''
    var arrayOfNumbers = new Array();
    var arrayHasNumberBeenUsed;
    var randomNumber = 0;
    var count = 0;
    // moves = 0;
    rows = document.getElementById("rows").value;
    columns = document.getElementById("columns").value;
    // textMoves.innerHTML = moves;
    // Create the proper board size.
    arrayForBoard[0] = new Array(rows);
    for (var i = 0; i < rows; i++) {
        arrayForBoard[0][i] = new Array(columns);
    }
    // Set up a temporary array for
    // allocating unique numbers.
    arrayHasNumberBeenUsed = new Array(rows * columns);
    for (var i = 0; i < rows * columns; i++) {
        arrayHasNumberBeenUsed[i] = 0;
    }

    // Assign random numbers to the board.
    for (var i = 0; i < rows * columns; i++) {
        randomNumber = Math.floor(Math.random() * rows * columns);
        // If our random numer is unique, add it to the board.
        if (arrayHasNumberBeenUsed[randomNumber] == 0) {
            arrayHasNumberBeenUsed[randomNumber] = 1;
            arrayOfNumbers.push(randomNumber);
        }
        else // Our number is not unique. Try again.
        {
            i--;
        }
    }

    // Assign numbers to the game board.
    count = 0;
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
            arrayForBoard[0][i][j] = arrayOfNumbers[count];

            count++;
        }
    }
    showTable(0);
    // AddTable();
}

function showTable(num) {
    var outputString = "";
    for (var i = 0; i < rows; i++) {
        outputString += "<tr>";
        for (var j = 0; j < columns; j++) {
            if (arrayForBoard[num][i][j] == 0) {
                outputString += "<td class=\"blank\"> </td>";
            }
            else {
                outputString += "<td class=\"tile\" onclick=\"moveThisTile(" + i + ", " + j + "," + num + ")\">" + arrayForBoard[num][i][j] + "</td>";
            }
        } // end for (var j = 0; j < columns; j++)
        outputString += "</tr>";
    } // end for (var i = 0; i < rows; i++)

    table.innerHTML = outputString;

}
function showTableAgain(num) {
   var newtable = document.getElementById("table"+num);
    var outputString = "";
    for (var i = 0; i < rows; i++) {
        outputString += "<tr>";
        for (var j = 0; j < columns; j++) {
            if (arrayForBoard[num][i][j] == 0) {
                outputString += "<td class=\"blank\"> </td>";
            }
            else {
                outputString += "<td class=\"tile\" onclick=\"moveThisTile(" + i + ", " + j + "," + num + ")\">" + arrayForBoard[num][i][j] + "</td>";
            }
        } // end for (var j = 0; j < columns; j++)
        outputString += "</tr>";
    } // end for (var i = 0; i < rows; i++)

    newtable.innerHTML = outputString;

}
function AddTable() {

    ++tableNum
    var arrayOfNumbers = new Array();
    var arrayHasNumberBeenUsed;
    var randomNumber = 0;
    var count = 0;
    // moves = 0;
    rows = document.getElementById("rows").value;
    columns = document.getElementById("columns").value;
    // textMoves.innerHTML = moves;
    // Create the proper board size.
    arrayForBoard[tableNum] = new Array(rows);
    for (var i = 0; i < rows; i++) {
        arrayForBoard[tableNum][i] = new Array(columns);
    }
    // Set up a temporary array for
    // allocating unique numbers.
    arrayHasNumberBeenUsed = new Array(rows * columns);
    for (var i = 0; i < rows * columns; i++) {
        arrayHasNumberBeenUsed[i] = 0;
    }

    // Assign random numbers to the board.
    for (var i = 0; i < rows * columns; i++) {
        randomNumber = Math.floor(Math.random() * rows * columns);
        // If our random numer is unique, add it to the board.
        if (arrayHasNumberBeenUsed[randomNumber] == 0) {
            arrayHasNumberBeenUsed[randomNumber] = 1;
            arrayOfNumbers.push(randomNumber);
        }
        else // Our number is not unique. Try again.
        {
            i--;
        }
    }

    // Assign numbers to the game board.
    count = 0;
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
            arrayForBoard[tableNum][i][j] = arrayOfNumbers[count];

            count++;
        }
    }
    var outputString = '<table id="table' + tableNum + '">';
    for (var i = 0; i < rows; i++) {
        outputString += "<tr>";
        for (var j = 0; j < columns; j++) {
            if (arrayForBoard[tableNum][i][j] == 0) {
                outputString += "<td class=\"blank\"> </td>";
            }
            else {
                outputString += "<td class=\"tile\" onclick=\"moveThisTile(" + i + ", " + j + "," + tableNum + ")\">" + arrayForBoard[tableNum][i][j] + "</td>";
            }
        } // end for (var j = 0; j < columns; j++)
        outputString += "</tr>";
    } // end for (var i = 0; i <table rows; i++)
    outputString += "</table>"
    tableBox.innerHTML += outputString;

}

function moveThisTile(tableRow, tableColumn, id) {
    if (checkIfMoveable(tableRow, tableColumn, "up", id) ||
        checkIfMoveable(tableRow, tableColumn, "down", id) ||
        checkIfMoveable(tableRow, tableColumn, "left", id) ||
        checkIfMoveable(tableRow, tableColumn, "right", id)) {
        // incrementMoves();
    }
    else {
        alert("شما قادر به حرکت این فیلد نیستید");
    }

    if (checkIfWinner(id)) {
        alert("تبریک ، با موفقیت پازل رو حل کردید");
        startNewGame();
    }
}

function checkIfMoveable(rowCoordinate, columnCoordinate, direction, id) {
    rowOffset = 0;
    columnOffset = 0;
    if (direction == "up") {
        rowOffset = -1;
    }
    else if (direction == "down") {
        rowOffset = 1;
    }
    else if (direction == "left") {
        columnOffset = -1;
    }
    else if (direction == "right") {
        columnOffset = 1;
    }

    if (rowCoordinate + rowOffset >= 0 && columnCoordinate + columnOffset >= 0 &&
        rowCoordinate + rowOffset < rows && columnCoordinate + columnOffset < columns
    ) {
        if (arrayForBoard[id][rowCoordinate + rowOffset][columnCoordinate + columnOffset] == 0) {
            arrayForBoard[id][rowCoordinate + rowOffset][columnCoordinate + columnOffset] = arrayForBoard[id][rowCoordinate][columnCoordinate];
            arrayForBoard[id][rowCoordinate][columnCoordinate] = 0;
            showTableAgain(id);
            return true;
        }
    }
    return false;
}

function checkIfWinner(id) {
    var count = 1;
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
            if (arrayForBoard[id][i][j] != count) {
                if (!(count === rows * columns && arrayForBoard[id][i][j] === 0)) {
                    return false;
                }
            }
            count++;
        }
    }

    return true;
}


window.addEventListener("load", start, false);