'use strict'

const lexint = require('lexicographic-integer')
const Buffer = require('safe-buffer').Buffer

module.exports = function factory (enc, opts) {
  const strict = opts && opts.strict

  if (enc === 'hex') {
    return {
      type: 'lexicographic-integer/hex',
      encode: maybeStrict(strict, function (n) {
        return lexint.pack(n, 'hex')
      }),
      decode: lexint.unpack,
      buffer: false
    }
  } else if (enc === 'buffer' || enc === 'binary') {
    return {
      type: 'lexicographic-integer/buffer',
      encode: maybeStrict(strict, function (n) {
        return Buffer.from(lexint.pack(n))
      }),
      decode: function (buf) {
        // Hack because lexicographic-integer doesn't take a Buffer.
        return lexint.unpack(Array.from(buf.values()))
      },
      buffer: true
    }
  } else {
    throw new Error('First argument must be a valid encoding')
  }
}

function maybeStrict (strict, encode) {
  return strict ? function encodeStrict (n) {
    if (typeof n !== 'number' || isNaN(n)) {
      throw new TypeError('Argument must be a valid number')
    }

    if (n < 0 || n > Number.MAX_SAFE_INTEGER) {
      throw new RangeError('Argument must be >= 0 < Number.MAX_SAFE_INTEGER')
    }

    return encode(n)
  } : encode
}
