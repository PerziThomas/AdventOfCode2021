const fileReader = require("../../Utils/FileReader.js");

fileReader.readFileLineByLine("data.txt").then(data => {
    data = data.filter(l => l !== "");
    let numbers = data.splice(0, 1);
    let nums = numbers[0].split(",");
    let drawnNumbers = [];
    nums.forEach(n => {
        drawnNumbers.push(n);
    });

    let bingoBoards = [];
    let rowCounter = 0;
    let board = {id: 0, numbers: {}};
    let boardCount = 1;

    for (let i = 0; i < data.length; i++) {
        let row = data[i];

        let rowStrings = row.split(" ");
        rowStrings = rowStrings.filter(r => r !== "");
        rowStrings.forEach((num, idx) => {
            board.numbers[num] = {
                ticked: false,
                row: rowCounter,
                column: idx
            };

        });
        rowCounter++;
        if (rowCounter === 5) {
            rowCounter = 0;
            bingoBoards.push({ ...board });
            board = {id: boardCount, numbers: {}};
            boardCount++;
        }
    }

    let stop = false;
    let winnerBoard = undefined;
    let number = 0;
    let lastWinner = undefined;

    for (let i = 0; i < drawnNumbers.length && bingoBoards.length > 0; i++) {
        number = drawnNumbers[i];

        bingoBoards.forEach(board => {
            if (number in board.numbers) {
                board.numbers[number] = {
                    ...board.numbers[number],
                    ticked: true
                };
            }
        });

        if (i >= 4) {
            winnerBoard = checkForWin(bingoBoards);
            while(winnerBoard !== undefined) {
                lastWinner = winnerBoard;
                bingoBoards = bingoBoards.filter(b => b.id !== winnerBoard.id);
                winnerBoard = checkForWin(bingoBoards);
            }
        }
    }

    let sum = 0;
    Object.keys(lastWinner.numbers).forEach(k => {
        if(!lastWinner.numbers[k].ticked) {
            sum += parseInt(k);
        }
    });

    number = parseInt(number);
    console.log(number * sum);
});

function checkForWin(boards) {
    let foundWinner = false;
    let board;

    for(let i = 0; i < boards.length && !foundWinner; i++) {
        board = boards[i];
        for(let r = 0; r < 5 && !foundWinner; r++) {
            let rowItemKeys = Object.keys(board.numbers).filter(key => board.numbers[key].row === r);
            let rowItems = [];
            rowItemKeys.forEach(k => rowItems.push(board.numbers[k]));

            if(rowItems.every(item => item.ticked === true)) foundWinner = true;
        }

        for(let c = 0; c < 5 && !foundWinner; c++) {
            let columnItemKeys = Object.keys(board.numbers).filter(key => board.numbers[key].column === c);
            let columnItems = [];
            columnItemKeys.forEach(k => columnItems.push(board.numbers[k]));

            if(columnItems.every(item => item.ticked === true)) foundWinner = true;
        }
    }

    if(!foundWinner) board = undefined;

    return board;
}