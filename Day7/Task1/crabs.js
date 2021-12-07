const fileReader = require("../../Utils/FileReader.js");

fileReader.readFileLineByLine("data.txt").then(dataLine => {
    let line = dataLine[0].split(",");
    let positions = [];

    line.forEach(num => {
        positions.push(parseInt(num));
    });

    let max = Math.max(...positions);

    let maxFuel = Number.MAX_SAFE_INTEGER;
    let currentFuel = 0;

    for(let i = 0; i <= max; i++) {
        for(let j = 0; j < positions.length; j++) {
            currentFuel += Math.abs(positions[j] - i);
        }

        if(currentFuel < maxFuel) {
            maxFuel = currentFuel;
        }

        currentFuel = 0;
    }

    console.log(`Min fuel required: ${maxFuel}`);
});