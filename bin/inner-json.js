#!/usr/bin/env node

'use strict'

const la = require('lazy-ass')
const is = require('check-more-types')
const fs = require('fs')

const args = process.argv.slice(2)
if (!args.length) {
  console.error('missing filename')
  process.exit(-1)
}

const filename = args[0]
la(fs.existsSync(filename), 'cannot find file', filename)
const text = fs.readFileSync(filename, 'utf8')

const findJsonIn = require('..')
const jsonText = findJsonIn(text)
la(is.string(jsonText),
  'did not return json string from original file', text)

console.log(jsonText)
