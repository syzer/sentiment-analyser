'use strict'

const tests = require('tapes')
const lib = require('./index.js')()
const _ = require('lodash-fp')
const longSentence = `Transform json to csv data. The difference to my other
module json2csv is json2csv-stream uses streams for transforming the incoming
data. The module is built with the new streaming API from Node.js v0.10.0 but
maintains backwards compatibility to earlier Node.js versions. Listen for
header and line events or pipe the data directly to a readable stream.`

tests('a set of some tests', (t) => {
    t.test('on Good', (t) => {
        let test = lib.classify('Good')
        t.same(test, 3, 'is true')
        t.end()
    })

    t.test('long string', (t) => {
        let test2 = lib.classify('Rainy day but still in a good mood')
        t.same(test2, 2, 'is true')
        t.end()
    })

    t.test('long string', (t) => {
        let test3 = lib.classify(longSentence)
        t.ok(test3 > -5 && test3 < 5, 'in range')
        t.end()
    })

    t.test('with dot.', (t) => {
        let test4 = lib.classify('Good.')
        let test5 = lib.classify('Good')
        t.same(test4, test5, 'dots dont bother us')
        t.end()
    })

    t.test('extending library', (t) => {
        const lib2 = require('./index.js')({
            words: {
                hyper: 5,
                hipster: -4
            }
        })

        let test4 = lib2.classify('Good hyper')
        let test5 = lib2.classify('Good')
        let test6 = lib2.classify('Good hipster')

        t.ok(test4 > test5 > test6, 'with custom words')
        t.end()
    })

    t.test('overwrite points', (t) => {
        let lib3 = require('./index.js')({
            words: {
                good: 5
            }
        })
        let test5 = lib3.classify('good')

        t.same(test5, 5, 'with good=5')
        t.end()
    })

    //TODO better test
    t.test('custom tokenizer', (t) => {
        let lib4 = require('./index.js')({
            tokenize: el => (el => el.replace(/\W /g, ''))
        })
        let test = lib4.classify(`It's not great`)
        let test2 = lib4.classify('not great')

        t.same(test, test2, 'with custom tokenizer')
        t.end()
    })

    t.test('performance test', (t) => {
        console.time('40000 requests/core in')

        _.times(() => lib.classify(longSentence), 40000)

        console.timeEnd('40000 requests/core in')
        t.end()
    })

    t.test('negation of positive words', (t) => {
        let ml = require('./index.js')()
        let test = ml.classify(`not great`)
        let test2 = ml.classify(`great`)
        t.ok(test === -test2, 'negate next word')
        t.end()
    })

    t.test('negation of negative words', (t) => {
        let ml = require('./index.js')()
        let test = ml.classify(`not awesome`)
        let test2 = ml.classify(`awesome`)
        t.ok(test === -test2, 'negate next word')
        t.end()
    })

    // well done you have read all the tests! :)
    t.test('extending witch custom words', (t) => {
        let ml = require('./index.js')({
            words: {
                beekeeping: 5,
                //':)': 5 //smiles do not work yet!
            }
        })
        let test = ml.classify('Beekeeping is awesome :)')
        let test2 = ml.classify('awesome')
        t.same(test, test2 + 5, 'beekeeping is very awesome')
        t.end()
    })

    t.end()
})
