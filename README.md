# WAT

Simple text sentiment analyser.

# HOW

Returns a positive number for positive sentiment association
and negative number for negative sentiment association.

```js
var longSentence = `Transform json to csv data. The difference to my other
module json2csv is json2csv-stream uses streams for transforming the incoming
data. The module is built with the new streaming API from Node.js v0.10.0 but
maintains backwards compatibility to earlier Node.js versions. Listen for
header and line events or pipe the data directly to a readable stream.`

const ml = require('ml-sentiment')()
ml.classify(longSentence)
//=> 0 ... (very boring encyclopedia like text)

ml.classify('Rainy day but still in a good mood')
//=> 2 ... (overall positive sentiment)
```

# INSTALL

```js
npm install ml-sentiment
var ml = require('ml-sentiment')
```


# TODO
[ ] describe this stuff
[ ] normalize
[ ] no.: ex: 'don't awesome'
[ ] stemmer better (test with utf-8)
[ ] how we got the data, and licence.. give credits
