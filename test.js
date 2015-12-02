var lib = require('./index.js')();
var test = lib.classify('Good');
console.log(test === 3);

var test2 = lib.classify('Rainy day but still in a good mood');
console.log(test2 === 2);
console.log(test2);
