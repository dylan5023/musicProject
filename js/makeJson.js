function csvToJSON(csv_string) {
  //   const rows = csv_string.split("\r\n");

  const rows = csv_string.split("\n");

  const jsonArray = [];

  const header = rows[0].split(",");

  for (let i = 1; i < rows.length; i++) {
    let obj = {};

    let row = rows[i].split(",");

    for (let j = 1; j < header.length; j++) {
      if (j == 1 || j == 2 || j == 3 || j == 4 || j == 6 || j == 7 || j == 20) {
        obj[header[j]] = row[j];
      }
    }

    jsonArray.push(obj);
  }

  return jsonArray;

  // return JSON.stringify(jsonArray);
}

const fs = require("fs");

const file_csv = fs.readFileSync("../static/data/dataset 3.csv", "utf8");
const string_csv = file_csv.toString();
// console.log(string_csv);

const arr_json = csvToJSON(string_csv);
console.log(arr_json);
// const string_json = JSON.stringify(arr_json);

fs.writeFileSync("tracks.json", JSON.stringify(arr_json), "utf-8");
