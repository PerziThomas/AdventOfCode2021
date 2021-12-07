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
}


fileReader.readFileLineByLine("data.txt").then(dataArray => {
    handleBinaryInput(dataArray);
});