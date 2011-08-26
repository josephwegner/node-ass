var fs = require('fs');
var ass = require("../node-ass.js").Ass;

var bareCSS = fs.readFileSync("css/test.css", 'utf8');

var newCSS = ass.parseCSS(bareCSS);

console.log("\n\nNODE ASS OUTPUTS:");
console.log(newCSS);

