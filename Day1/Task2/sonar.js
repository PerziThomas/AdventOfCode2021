const fs = require("fs");
const readline = require("readline");

let dataArray = [];

async function processSonarData() {
    const fileStream = fs.createReadStream('data.txt');
  
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
  
    for await (const line of rl) {
      num = parseInt(line);
      dataArray.push(num);
    }

    return Promise.resolve();
  }
  

async function main() {
  await processSonarData();

  let sum = 0;
  let first = true;
  let count = 0;
  let num = -10;

  for(let i = 2; i < dataArray.length; i++) {
    sum = dataArray[i-2] + dataArray[i-1] + dataArray[i];
    if(sum > num) {
      if(first) {
        first = false;
      } else {
        count++;
      }
    }
    num = sum;
  }
  
  console.log(`Number of increases: ${count}`);
}

main();
