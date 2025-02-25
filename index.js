const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame () {
    renderGrid(3);
}

function renderGrid (dimension) {
    container.innerHTML = '';


    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

let isCrossMove = true;
let isWin = false;
let isFilled = [
    [false, false, false],
    [false, false, false],
    [false, false, false]
];

let crosses = [
    [false, false, false],
    [false, false, false],
    [false, false, false]
];

let zeros = [
    [false, false, false],
    [false, false, false],
    [false, false, false]
];

let wonCells = [
    [false, false, false],
    [false, false, false],
    [false, false, false]
];

function checkWin(array){


    for (let i = 0; i < 3; i++) {
        let c = 0;
        wonCells.forEach((f) => f.forEach(() => false));
        for (let j = 0; j < 3; j++) {
            if (array[i][j]){
                c++;
            }
        }
        if (c === 3){
            for (let j = 0; j < 3; j++) {
                wonCells[i][j] = true;
            }
            return true;
        }
    }

    for (let i = 0; i < 3; i++) {
        let c = 0;
        wonCells.forEach((f) => f.forEach(() => false));
        for (let j = 0; j < 3; j++) {
            if (array[j][i]){
                c++;
            }
        }
        if (c === 3){
            for (let j = 0; j < 3; j++) {
                wonCells[j][i] = true;
            }
            return true;
        }
    }

    let count = 0;
    for (let i = 0; i < 3; i++) {
        if (array[i][i]){
            count++;
        }
    }
    if (count === 3){
        for (let i = 0; i < 3; i++) {
            wonCells[i][i] = true;
        }
        return true;
    }

    count = 0;
    for (let i = 2; i > -1; i--) {
        if (array[i][2 - i]){
            count++;
        }
    }
    if (count === 3){
        for (let i = 2; i > -1; i--) {
            wonCells[i][2 - i] = true;
        }
        return true;
    }

    return false;
}



function colorizeWinner(winner){
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (wonCells[j][i]){
                renderSymbolInCell(winner, i, j, '#FF0000')
            }
        }
    }
}

function cellClickHandler (row, col) {
    if (!isFilled[col][row] && !isWin) {
        const symbol = isCrossMove ? CROSS : ZERO;
        renderSymbolInCell(symbol, row, col);


        isFilled[col][row] = true;
        if (isCrossMove){
            crosses[col][row] = true;
            if (checkWin(crosses)){
                isWin = true;
                colorizeWinner(CROSS);
                setTimeout(() => alert('CROSS WON!'), 0);
            }
        }
        else{
            zeros[col][row] = true;
            if (checkWin(zeros)){
                isWin = true;
                colorizeWinner(ZERO);
                setTimeout(() => alert('ZERO WON!'), 0);
            }
        }
        if (!isWin && isFilled.every((c) => c.every((k) => k))){
            setTimeout(() => alert('Победила дружба'), 0);
        }
        isCrossMove = !isCrossMove;
    }
}

function renderSymbolInCell (symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell (row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener () {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler () {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            renderSymbolInCell('', i, j);
            isFilled[i][j] = false;
            crosses[i][j] = false;
            zeros[i][j] = false;
            wonCells[i][j] = false;
        }
    }

    isWin = false;
    isCrossMove = true;
}


/* Test Function */
/* Победа первого игрока */
function testWin () {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw () {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell (row, col) {
    findCell(row, col).click();
}
