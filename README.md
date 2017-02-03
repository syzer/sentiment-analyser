[![npm version](https://badge.fury.io/js/ml-sentiment.svg)](https://badge.fury.io/js/ml-sentiment)
[![build status](http://img.shields.io/travis/syzer/sentiment-analyser.svg?style=flat)](http://travis-ci.org/syzer/sentiment-analyser)
[![Dependency Status](https://david-dm.org/syzer/sentiment-analyser.svg)](https://david-dm.org/syzer/sentiment-analyser)
[![devDependency Status](https://david-dm.org/syzer/sentiment-analyser/dev-status.svg)](https://david-dm.org/syzer/sentiment-analyser#info=devDependencies)
[![Code Coverage](https://img.shields.io/codecov/c/github/syzer/sentiment-analyser/master.svg)](https://codecov.io/github/syzer/sentiment-analyser?branch=master)
[![Downloads Today](https://img.shields.io/npm/dt/ml-sentiment.svg)](https://badge.fury.io/js/ml-sentiment)
[![Downloads Month](https://img.shields.io/npm/dm/ml-sentiment.svg)](https://badge.fury.io/js/ml-sentiment)

# Wat

Simple text sentiment analyser.


# Install

```sh
npm install ml-sentiment
```

### Usage

```js
var ml = require('ml-sentiment')
ml.classify('Rainy day but still in a good mood')
//=> 2 ... (overall positive sentiment)
```


# How

Returns a positive number for positive sentiment association
and negative number for negative sentiment association.

#### Basics

```js
var longSentence = `Transform json to csv data. The difference to my other
module json2csv is json2csv-stream uses streams for transforming the incoming
data. The module is built with the new streaming API from Node.js v0.10.0 but
maintains backwards compatibility to earlier Node.js versions. Listen for
header and line events or pipe the data directly to a readable stream.`

var ml = require('ml-sentiment')()
ml.classify(longSentence)
//=> 0 ... (very boring encyclopedia like text)

ml.classify('Rainy day but still in a good mood')
//=> 2 ... (overall positive sentiment)
```

#### Negations

```js
var ml = require('ml-sentiment')()
ml.classify(`not awesome`)
//=> -3 (negative)

ml.classify(`awesome`)
//=> 3 (positive)
```

#### German

```js
var ml = require('ml-sentiment')({lang: 'de'})
ml.classify(`Es ist nicht so toll`)
//=> (negative)
```

# Credits

Original model and data:
Finn Årup Nielsen, "A new ANEW: Evaluation of a word list for
sentiment analysis in microblogs", http://arxiv.org/abs/1103.2903

For german model:
R. Remus, U. Quasthoff & G. Heyer: SentiWS - a Publicly Available German-language Resource for Sentiment Analysis.
In: Proceedings of the 7th International Language Ressources and Evaluation (LREC'10), 2010
