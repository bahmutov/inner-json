'use strict'

const la = require('lazy-ass')
const is = require('check-more-types')

// returns just the text
function findJsonIn (text) {
  la(is.unemptyString(text), 'empty input text', text)
  const sep = '\n====\n'
  const openingBrace = text.indexOf('{')
  if (is.not.found(openingBrace)) {
    const msg = 'could not find opening brace in' + sep + text + sep
    throw new Error(msg)
  }

  const closingBrace = text.lastIndexOf('}')
  if (is.not.found(closingBrace)) {
    const msg = 'could not find closing brace in' + sep + text + sep
    throw new Error(msg)
  }

  text = text.substr(openingBrace, closingBrace - openingBrace + 1)
  return text.trim()
}

module.exports = findJsonIn
