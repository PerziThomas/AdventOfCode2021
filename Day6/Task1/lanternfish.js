const fileReader = require("../../Utils/FileReader.js");

fileReader.readFileLineByLine("data.txt").then(data => {
    let line = data[0];

    let numStr = line.split(",");

    let numbers = [];

    numStr.forEach(num => numbers.push(parseInt(num)));

    for(let day = 0; day < 80; day++) {
        let length = numbers.length;
        for(let i = 0; i < length; i++) {
            let number = numbers[i];

            if(number === 0) {
                number = 6;
                numbers.push(8);
            } else {
                number--;
            }

            numbers[i] = number;
        }
    }

    console.log(numbers.length);
});