module.exports = (opts) => {
    opts = opts || {};
    opts.words = opts.words || {};
    opts.tokenize = opts.tokenize || (el => el.replace(/\W/g, ''));

    var _ = require('lodash-fp');
    var dict = _.merge(opts.words, require('./AFINN-111.json'));

    return {
        classify: (str) => (
            str
                .toLowerCase()
                .split(' ')
                //TODO move regex higher
                .map(opts.tokenize)
                .reduce((sum, word) => sum + (dict[word] || 0), 0)
        )
    }
};
