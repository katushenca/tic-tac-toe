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


function checkWin(array){
    for (const arr of array) {
        if(arr.every((c) => c)){
            return true;
        }
    }

    for (let i = 0; i < 3; i++) {
        let c = 0;
        for (let j = 0; j < 3; j++) {
            if (array[j][i]){
                c++;
            }
        }
        if (c === 3){
            return true;
        }
    }

    let count = 0;
    for (let i = 0; i < 3; i++) {
        if (array[i][i]){
            count++;
        }
    }

    return count === 3;
}


function cellClickHandler (row, col) {
    // Пиши код тут
    console.log(`Clicked on cell: ${row}, ${col}`);
    console.log(isFilled)

    if (!isFilled[col][row]) {
        const symbol = isCrossMove ? CROSS : ZERO;
        renderSymbolInCell(symbol, row, col);


        isFilled[col][row] = true;
        if (isCrossMove){
            crosses[col][row] = true;
            if (checkWin(crosses)){
                setTimeout(() => alert('CROSS WON!'), 0);

            }
        }
        else{
            zeros[col][row] = true;
            if (checkWin(zeros)){
                setTimeout(() => alert('ZERO WON!'), 0);
            }
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
        }
    }


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
