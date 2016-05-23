module.exports = (opts) => {
    opts = opts || {}
    opts.words = opts.words || {}
    opts.tokenize = opts.tokenize || (el => el.replace(/\W/g, ''))

    var _ = require('lodash-fp')
    var dict = _.merge(opts.words, require('./AFINN-111.json'))
    var negate = new RegExp(/^(not|don't|dont|no|nope)$/)

    return {
        classify: (str) => (
            str.toLowerCase()
                .split(' ')
                //TODO move tokenize higher
                .map(opts.tokenize)
                .reduce((acc, word) => {
                    var score = negate.test(acc.prev) ? -dict[word] : dict[word];
                    return {
                        sum: acc.sum + (score || 0),
                        prev: word
                    }
                }, {sum: 0, prev: ''})
                .sum
        )
    }
}
