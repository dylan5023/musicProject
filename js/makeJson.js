function csvToJSON(csv_string) {
  //   const rows = csv_string.split("\r\n");

  const rows = csv_string.split("\n");

  const jsonArray = [];

  const header = rows[0].split(",");

  for (let i = 1; i < rows.length; i++) {
    let obj = {};

    let row = rows[i].split(",");

    for (let j = 1; j < header.length; j++) {
      obj[header[j]] = row[j];
    }

    jsonArray.push(obj);
  }

  return jsonArray;

  // return JSON.stringify(jsonArray);
}

const fs = require("fs");

const file_csv = fs.readFileSync("../static/data/track.csv", "utf8");
const string_csv = file_csv.toString();
// console.log(string_csv);

const arr_json = csvToJSON(string_csv);
console.log(arr_json);
// const string_json = JSON.stringify(arr_json);

fs.writeFileSync("track.json", JSON.stringify(arr_json), "utf-8");
