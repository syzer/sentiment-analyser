module.exports = (opts) => {
    opts = opts || {}
    opts.words = opts.words || {}
    opts.tokenize = opts.tokenize || (el => el.replace(/\W/g, ''))
    opts.lang = opts.lang || 'en'

    var _ = require('lodash-fp')

    const classifyEn = (dict, negate) => (str) =>
        str.toLowerCase()
            .split(' ')
            .map(opts.tokenize)
            .reduce((acc, word) => {
                var score = negate.test(acc.prev) ? -dict[word] : dict[word]
                return {
                    sum: acc.sum + (score || 0),
                    prev: word
                }
            }, {sum: 0, prev: ''})
            .sum

    const classifyDe = (dict, negate) => (str) =>
        str.toLowerCase()
            .split(' ')
            .map(opts.tokenize)
            .reduce((acc, word) => {
                var score = negate.test(acc.prev) ? -dict[word] : dict[word]
                return {
                    sum: acc.sum + (score || 0),
                    prev: word
                }
            }, {sum: 0, prev: ''})
            .sum

    if ('en' === opts.lang) {
        return {
            classify: function() {
                var dict = _.merge(opts.words, require('./../AFINN-111.json'))
                var negate = new RegExp(/^(not|don't|dont|no|nope)$/)
                return classifyEn(dict, negate)
            }()
        }
    } else {
        return {
            classify: function() {
                var dict = _.merge(opts.words, require('./../german.json'))
                var negate = new RegExp(/^(nein|nicht|keine)$/)
                return classifyDe(dict, negate)
            }()
        }
    }
}
