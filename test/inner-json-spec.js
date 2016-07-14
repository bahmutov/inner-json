'use strict'

const join = require('path').join
const read = require('fs').readFileSync
const la = require('lazy-ass')
const is = require('check-more-types')

/* global describe, it */
describe('inner-json', () => {
  const innerJson = require('..')
  const filename = join(__dirname, 'example.json')
  const text = read(filename, 'utf8')
  la(is.unemptyString(text), 'missing text in', filename)

  it('returns text', () => {
    const jsonText = innerJson(text)
    la(is.unemptyString(jsonText), 'returned json text', jsonText)
  })

  it('trims returned text', () => {
    const jsonText = innerJson(text)
    la(jsonText.trim() === jsonText, 'returns trimmed text', jsonText)
  })

  it('returned text is valid json', () => {
    const jsonText = innerJson(text)
    const json = JSON.parse(jsonText)
    la(is.object(json), 'is an object', json)
    la(json.foo === 'bar', json)
  })

  it('throws an exception if json cannot be found', () => {
    la(is.raises(() => {
      const text = 'foo bar but no json'
      innerJson(text)
    }))
  })
})
