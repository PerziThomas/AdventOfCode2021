const fs = require("fs");
const readline = require("readline");

async function processSonarData() {
    const fileStream = fs.createReadStream('data.txt');
  
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    let height = -10;
    let count = 0;
  
    for await (const line of rl) {
      num = parseInt(line);
      if(num > height) {
          if(height > 0) {
              count++;
          }
      }
      height = num;
    }

    console.log(`Number of Increases: ${count}`);
  }
  
  processSonarData();