module.exports = function (opts) {
    opts = opts || {};
    opts.extraWords = opts.extraWords || {};

    var _ = require('lodash-fp');
    var dict = _.merge(require('./AFINN-111.json'), opts.extraWords);

    return {
        classify: function (str) {
            return str
                .toLowerCase()
                .split(' ')
                //TODO move regex higher
                .map(function(el) {
                    return el.replace(/\W/g, '')
                })
                .reduce(function (sum, word) {
                    return sum + (dict[word] || 0);
                }, 0);
        }
    }
};
