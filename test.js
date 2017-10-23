'use strict'

const test = require('tape')
const lexint = require('.')

test('basic hex', function (t) {
  const enc = lexint('hex')

  t.is(enc.buffer, false, 'decode does not take a buffer')

  for (let kv of sample()) {
    const n = kv[0]
    const packed = kv[1]

    t.is(enc.encode(n), packed, packed)
    t.is(enc.decode(packed), n, String(n))
  }

  t.end()
})

test('basic buffer', function (t) {
  const enc = lexint('buffer')

  t.is(enc.buffer, true, 'decode takes a buffer')

  for (let kv of sample()) {
    const n = kv[0]
    const packed = kv[1]
    const buf = Buffer.from(packed, 'hex')

    t.same(enc.encode(n), buf, packed)
    t.same(enc.decode(buf), n, String(n))
  }

  t.end()
})

test('strict mode', function (t) {
  t.plan(8)

  const enc = lexint('hex', { strict: true })

  const throws = (input, name, message) => {
    try {
      enc.encode(input)
    } catch (err) {
      t.is(err.name, name, name)
      t.is(err.message, message, message)
    }
  }

  throws('1', 'TypeError', 'Argument must be a valid number')
  throws(NaN, 'TypeError', 'Argument must be a valid number')

  throws(-1, 'RangeError', 'Argument must be >= 0 < Number.MAX_SAFE_INTEGER')
  throws(Infinity, 'RangeError', 'Argument must be >= 0 < Number.MAX_SAFE_INTEGER')
})

function sample () {
  return new Map([
    [0, '00'],
    [1, '01'],
    [2, '02'],
    [3, '03'],
    [4, '04'],
    [248, 'f8'],
    [249, 'f9'],
    [250, 'fa'],
    [251, 'fb00'],
    [252, 'fb01'],
    [253, 'fb02'],
    [254, 'fb03'],
    [255, 'fb04'],
    [256, 'fb05'],
    [5000, 'fc128d'],
    [5001, 'fc128e'],
    [5002, 'fc128f'],
    [5003, 'fc1290'],
    [5004, 'fc1291'],
    [21378213, 'fe014633aa']
  ])
}
