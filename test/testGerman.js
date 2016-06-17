'use strict'

const tap = require('tap').test
const main = require('./../src/index.js')
// js is horrible
const lib = main({lang: 'de'})
const _ = require('lodash-fp')
const longSentence = `Trans json zu CSV-Daten. Der Unterschied zu meinen anderen
Modul json2csv ist json2csv-Stream verwendet Ströme für die Umwandlung der eingehenden
Daten. Das Modul mit der neue Streaming API von Node.js v0.10.0 gebaut ist, aber
unterhält die Abwärtskompatibilität zu früheren Versionen Node.js. Hören Sie
Ereignisse oder Rohr Kopf- und die Daten direkt in einen lesbaren Stream.`

tap('a set of german tests', (t) => {
    t.test('on Good', (t) => {
        let test = lib.classify('Gut')
        t.same(test, 3, 'good is good :)')
        t.end()
    })

    t.test('long string', (t) => {
        let test2 = lib.classify('Regnerischen Tag , aber immer noch in einer guten Stimmung')
        t.same(test2, 2, 'is true')
        t.end()
    })

    t.test('long string', (t) => {
        let test3 = lib.classify(longSentence)
        t.ok(test3 > -5 && test3 < 5, 'in range')
        t.end()
    })

    t.test('with dot.', (t) => {
        let test4 = lib.classify('Gut.')
        let test5 = lib.classify('Gut')
        t.same(test4, test5, 'dots dont bother us')
        t.end()
    })

    t.test('extending library', (t) => {
        const lib2 = main({
            words: {
                hyper: 5,
                hipster: -4
            }
        })

        let test4 = lib2.classify('Gut hyper')
        let test5 = lib2.classify('Gut')
        let test6 = lib2.classify('Gut hipster')

        t.ok(test4 > test5 > test6, 'with custom words')
        t.end()
    })

    t.test('overwrite points', (t) => {
        let lib3 = main({
            words: {
                gut: 5
            },
            lang: 'de'
        })
        let test5 = lib3.classify('Gut')

        t.same(test5, 5, 'with good=5')
        t.end()
    })

    t.test('custom tokenizer', (t) => {
        let lib4 = main({
            tokenize: el => (el => el.replace(/\W /g, '')),
            lang: 'de'
        })
        let test = lib4.classify(`Es ist nicht so toll`)
        let test2 = lib4.classify('so toll')

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
        let test = lib.classify(`nicht toll`)
        let test2 = lib.classify(`toll`)
        t.ok(test === -test2, 'negate next word')
        t.ok(test !== 0, 'non zero value')
        t.end()
    })

    t.test('negation of negative words', (t) => {
        let test = lib.classify(`keine panik`)
        let test2 = lib.classify(`panik`)
        t.ok(test === -test2, 'negate next word')
        t.ok(test !== 0, 'non zero value')
        t.end()
    })

    // well done you have read all the tests! :)
    t.test('extending witch custom words', (t) => {
        let ml = main({
            words: {
                bienenzucht: 5,
                ':)': 5     // smiles do not work yet!
            },
            lang: 'de'
        })
        let test = ml.classify('Bienenzucht bist toll :)')
        let test2 = ml.classify('toll')
        t.same(test, test2 + 5, 'Beekeeping is very awesome')
        t.end()
    })

    t.end()
})
