var dict = require('./AFINN-111.json');

module.exports = function (opts) {
    return {
        classify: function (str) {
            return str
                .toLowerCase()
                .split(' ')
                .map(function(el) {
                    return el.replace(/\W/g, '')
                })
                .reduce(function (sum, word) {
                    return sum + (dict[word] || 0);
                }, 0);
        }
    }
};
