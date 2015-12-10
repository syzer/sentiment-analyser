var tests = require('tapes');
const lib = require('./index.js')();
var longSentence = `Transform json to csv data. The difference to my other
module json2csv is json2csv-stream uses streams for transforming the incoming
data. The module is built with the new streaming API from Node.js v0.10.0 but
maintains backwards compatibility to earlier Node.js versions. Listen for
header and line events or pipe the data directly to a readable stream.`;

tests('a set of some tests', (t) => {
    t.test('on Good', (t) => {
        var test = lib.classify('Good');
        t.same(test, 3, 'is true');
        t.end();
    });

    t.test('long string', (t) => {
        var test2 = lib.classify('Rainy day but still in a good mood');
        t.same(test2, 2, 'is true');
        t.end();
    });

    t.test('long string', (t) => {
        var test3 = lib.classify(longSentence);
        t.ok(test3 > -5 && test3 < 5, 'in range');
        t.end();
    });

    t.test('with dot.', (t) => {
        var test4 = lib.classify('Good.');
        var test5 = lib.classify('Good');
        t.same(test4, test5, 'dots dont bother us');
        t.end();
    });

    t.test('extending library', (t) => {
        var lib2 = require('./index.js')({
            words: {
                hyper: 5,
                hipster: -4
            }
        });

        var test4 = lib2.classify('Good hyper');
        var test5 = lib2.classify('Good');
        var test6 = lib2.classify('Good hipster');

        t.ok(test4 > test5 > test6, 'with custom words');
        t.end();
    });

    t.test('overwrite points', (t) => {
        var lib3 = require('./index.js')({
            words: {
                good: 5
            }
        });
        var test5 = lib3.classify('good');

        t.same(test5, 5, 'with good=5');
        t.end();
    });

    //TODO better test
    t.test('custom tokenizer', (t) => {
        var lib4 = require('./index.js')({
            tokenize: el => (el => el.replace(/\W /g, ''))
        });
        var test = lib4.classify(`It's not great`);
        var test2 = lib4.classify('not great');

        t.same(test, test2, 'with custom tokenizer');
        t.end();
    });

    //extra 103ms delay for forEach:)
    t.test('performance test', (t) => {
        var arr = new Array(40000)
            .join(',')
            .split(',');

        console.time('40000 requests/core in');

        arr.forEach(() => {
            lib.classify(longSentence);
        });

        console.timeEnd('40000 requests/core in');
        t.end();
    });

    t.test('negation of positive words', (t) => {
        var ml = require('./index.js')();
        var test = ml.classify(`not great`);
        var test2 = ml.classify(`great`);
        t.ok(test === -test2, 'negate next word');
        t.end();
    });

    t.test('negation of negative words', (t) => {
        var ml = require('./index.js')();
        var test = ml.classify(`not awesome`);
        var test2 = ml.classify(`awesome`);
        t.ok(test === -test2, 'negate next word');
        t.end();
    });

    // well done you have read all the tests! :)
    t.test('extending witch custom words', (t) => {
        var ml = require('./index.js')({
            words: {
                beekeeping: 5,
                //':)': 5 //smiles do not work yet!
            }
        });
        var test = ml.classify('Beekeeping is awesome :)');
        var test2 = ml.classify('awesome');
        t.same(test, test2+5, 'beekeeping is very awesome');
        t.end();
    });

    t.end();
});
