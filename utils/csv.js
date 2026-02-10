const { Parser } = require("json2csv");

function toCsv(rows) {
  const parser = new Parser();
  return parser.parse(rows);
}

module.exports = { toCsv };
