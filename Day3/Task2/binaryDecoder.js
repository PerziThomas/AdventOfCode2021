const fileReader = require("../../Utils/FileReader.js");

function handleBinaryInput(dataArray) {
    let referenceNumber = dataArray[0];
    let gamma = "";
    let epsilon = "";

    let countZero = 0;
    let countOne = 0;

    for(let i = 0; i < referenceNumber.length; i++) {
        countOne = 0;
        countZero = 0;
        for(let j = 0; j < dataArray.length; j++) {
            if(dataArray[j].charAt(i) === "0") {
                countZero++;
            } else {
                countOne++;
            }
        }
        if(countZero > countOne) {
            gamma += "0";
            epsilon += "1";
        } else {
            gamma += "1";
            epsilon += "0";
        }
    }

    let gammaDec = parseInt(gamma, 2);
    let epsilonDec = parseInt(epsilon, 2);
    console.log(`Gamma: ${gammaDec}, Epsilon: ${epsilonDec}, multiplied: ${gammaDec * epsilonDec}`);

    let oxygen = oxygenValue(dataArray);
    let coTwo = coTwoValue(dataArray);

    console.log(oxygen * coTwo);
}

function oxygenValue(dataArray) {
    let arrayCopy = [...dataArray];
    let referenceNumber = arrayCopy[0];

    let countZero = 0;
    let countOne = 0;

    for(let i = 0; i < referenceNumber.length && arrayCopy.length > 1; i++) {
        let countZero = 0;
        let countOne = 0;
        for(let j = 0; j < arrayCopy.length; j++) {
            if(arrayCopy[j].charAt(i) === "0") {
                countZero++;
            } else {
                countOne++;
            }
        }

        if(countZero > countOne) {
            arrayCopy = arrayCopy.filter(x => x.charAt(i) === "1");
        } else {
            arrayCopy = arrayCopy.filter(x => x.charAt(i) === "0");
        }
        
    }

    return parseInt(arrayCopy[0], 2);
}

function coTwoValue(dataArray) {
    let arrayCopy = [...dataArray];
    let referenceNumber = arrayCopy[0];

    let countZero = 0;
    let countOne = 0;

    for(let i = 0; i < referenceNumber.length && arrayCopy.length > 1; i++) {
        let countZero = 0;
        let countOne = 0;
        for(let j = 0; j < arrayCopy.length; j++) {
            if(arrayCopy[j].charAt(i) === "0") {
                countZero++;
            } else {
                countOne++;
            }
        }

        if(countZero > countOne) {
            arrayCopy = arrayCopy.filter(x => x.charAt(i) === "0");
        } else {
            arrayCopy = arrayCopy.filter(x => x.charAt(i) === "1");
        }
        
    }

    return parseInt(arrayCopy[0], 2);
}


fileReader.readFileLineByLine("data.txt").then(dataArray => {
    handleBinaryInput(dataArray);
});