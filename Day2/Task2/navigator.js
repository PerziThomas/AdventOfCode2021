const fs = require("fs");
const readline = require("readline");

let dataArray = [];

let horizontal = 0;
let depth = 0;
let aim = 0;

async function processData() {
    const fileStream = fs.createReadStream('data.txt');
  
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
  
    for await (const line of rl) {
      dataArray.push(line);
    }

    return Promise.resolve();
  }
  

function handleInput(input) {
    let splitInput = input.split(" ");
    let num = parseInt(splitInput[1]);
    switch(splitInput[0]) {
        case "forward":
            horizontal += num;
            let depthAdd = num * aim;
            depth += depthAdd;
            break;
        case "down":
            aim += num;
            break;
        case "up":
            aim -= num;
            break;
    }
}

async function main() {
  await processData();

  for(let i = 0; i < dataArray.length; i++) {
      handleInput(dataArray[i]);
  }

  console.log(`Calculated final number: ${horizontal*depth}`);
}

main();
