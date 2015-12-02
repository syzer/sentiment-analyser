var tests = require('tapes');
var lib = require('./index.js')();
var longSentence = 'Transform json to csv data. The difference to my other module json2csv is json2csv-stream uses streams for transforming the incoming data. The module is built with the new streaming API from Node.js v0.10.0 but maintains backwards compatibility to earlier Node.js versions. Listen for header and line events or pipe the data directly to a readable stream.';

tests('a set of some tests', function (t) {

    t.test('on Good', function (t) {
        var test = lib.classify('Good');
        t.same(test, 3, 'is true');
        t.end();
    });

    t.test('long string', function (t) {
        var test2 = lib.classify('Rainy day but still in a good mood');
        t.same(test2, 2, 'is true');
        t.end();
    });

    t.test('long string', function (t) {
        var test3 = lib.classify(longSentence);
        t.ok(test3 > -5 && test3 < 5, 'in range');
        t.end();
    });

    t.test('with dot.', function (t) {
        var test4 = lib.classify('Good.');
        var test5 = lib.classify('Good');
        t.same(test4, test5, 'dots dont bother us');
        t.end();
    });

    t.test('with dot.', function (t) {
        var test4 = lib.classify('Good.');
        var test5 = lib.classify('Good');
        t.same(test4, test5, 'dots dont bother us');
        var arr = new Array(40000)
            .join(',')
            .split(',');

        console.time('40000 requests/core in');
        //103ms delay for forEach:)
        arr.forEach(function () {
             lib.classify(longSentence);
        });
        console.timeEnd('40000 requests/core in');

        t.end();
    });

    t.end();
});
