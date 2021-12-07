const fileReader = require("../../Utils/FileReader.js");

fileReader.readFileLineByLine("data.txt").then(data => {
    let line = data[0];

    let numStr = line.split(",");

    let numbers = {
        "0": 0,
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 0,
        "8": 0,
    };

    numStr.forEach(num => {
        numbers[num]++;
    });

    console.log(numbers);

    for(let day = 0; day < 256; day++) {
        let initialValues = {...numbers};
        Object.keys(numbers).forEach(key => {
            if(key === "0") {
                numbers["6"] = numbers["0"];
                numbers["8"] = numbers["0"];
            } else {
                if(key === "7") {
                    numbers["6"] += numbers["7"];
                } else {
                    numbers[(parseInt(key)-1) + ""] = initialValues[key];
                }
            }
        });
    }

    console.log(numbers);

    let sum = 0;

    Object.keys(numbers).forEach(k => {
        sum += numbers[k];
    });

    console.log(sum);

});