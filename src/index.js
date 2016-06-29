#!/usr/bin/env node

'use strict'

const la = require('lazy-ass')
const is = require('check-more-types')

const args = process.argv.slice(2)
if (!args.length) {
  console.error('missing filename')
  process.exit(-1)
}

const filename = args[0]

function findJsonIn (text) {
  la(is.unemptyString(text), 'empty input text', text)
  const openingBrace = text.indexOf('{')
  la(openingBrace !== -1, 'could not find opening brace in', text)

  const closingBrace = text.lastIndexOf('}')
  la(closingBrace !== -1, 'could not find closing brace in', text)

  text = text.substr(openingBrace, closingBrace - openingBrace + 1)
  return text
}

const fs = require('fs')
la(fs.existsSync(filename), 'cannot find file', filename)
const text = fs.readFileSync(filename, 'utf8')
const jsonText = findJsonIn(text)
console.log(jsonText)
