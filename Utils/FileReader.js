const fs = require("fs");
const readline = require("readline");

async function readFileLineByLine(filename) {
    let dataArray = [];
    const fileStream = fs.createReadStream(filename);
  
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
  
    for await (const line of rl) {
      dataArray.push(line);
    }

    return Promise.resolve(dataArray);
}

exports.readFileLineByLine = readFileLineByLine;