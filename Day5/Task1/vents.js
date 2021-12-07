const fileReader = require("../../Utils/FileReader.js");

fileReader.readFileLineByLine("data.txt").then(data => {

    let processedData = [];

    data.forEach(d => {
        let splitData = d.split("->");
        splitData = splitData.map(str => {
            return str.replace(" ", "");
        });

        let coordinates = [];

        splitData.forEach(d => {
            let numbers = d.split(",");
            coordinates.push({
                x: parseInt(numbers[0]),
                y: parseInt(numbers[1])
            });
        });

        processedData.push(coordinates);
    });

    processedData = processedData.filter(coordinateArray => {
        return coordinateArray[0].x === coordinateArray[1].x || coordinateArray[0].y === coordinateArray[1].y;
    });

    let maxX = 0;
    let maxY = 0;

    processedData.forEach(coordinateArray => {
        if(coordinateArray[0].x > maxX) {
            maxX = coordinateArray[0].x;
        }

        if(coordinateArray[1].x > maxX) {
            maxX = coordinateArray[1].x;
        }

        if(coordinateArray[0].y > maxY) {
            maxY = coordinateArray[0].y;
        }

        if(coordinateArray[1].y > maxY) {
            maxY = coordinateArray[1].y;
        }
    });

    let grid = [...Array(maxX+1)].map(x=>Array(maxY+1).fill(0));

    processedData.forEach(vector => {
        console.log(vector);
        if(vector[0].y === vector[1].y) {
            if(vector[0].x > vector[1].x) {
                let temp = vector[1].x;
                vector[1].x = vector[0].x;
                vector[0].x = temp;
            }

            let y = vector[0].y;

            for(let i = vector[0].x; i <= vector[1].x; i++) {
                grid[i][y]++;
            }
        } else {
            if(vector[0].y > vector[1].y) {
                let temp = vector[1].y;
                vector[1].y = vector[0].y;
                vector[0].y = temp;
            }

            let x = vector[0].x;

            for(let i = vector[0].y; i <= vector[1].y; i++) {
                grid[x][i]++;
            }
        }
    });

    let sum = 0;

    grid.forEach(row => {
        row.forEach(number => {
            if (number > 1) {
                sum++;
            }
        });
    });

    console.log(sum);
});