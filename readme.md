# lexicographic-integer-encoding

**Lexicographically ordered integers for `level(up)`. Wraps [`lexicographic-integer`].**

[![npm status](http://img.shields.io/npm/v/lexicographic-integer-encoding.svg?style=flat-square)](https://www.npmjs.org/package/lexicographic-integer-encoding)
[![node](https://img.shields.io/node/v/lexicographic-integer-encoding.svg?style=flat-square)](https://www.npmjs.org/package/lexicographic-integer-encoding) [![Travis build status](https://img.shields.io/travis/vweevers/lexicographic-integer-encoding.svg?style=flat-square&label=travis)](http://travis-ci.org/vweevers/lexicographic-integer-encoding) [![AppVeyor build status](https://img.shields.io/appveyor/ci/vweevers/lexicographic-integer-encoding.svg?style=flat-square&label=appveyor)](https://ci.appveyor.com/project/vweevers/lexicographic-integer-encoding) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](https://standardjs.com) [![Dependency status](https://img.shields.io/david/vweevers/lexicographic-integer-encoding.svg?style=flat-square)](https://david-dm.org/vweevers/lexicographic-integer-encoding)

## usage with [`level`]

```js
const level = require('level')
const lexint = require('lexicographic-integer-encoding')('hex')

const db = level('./db', { keyEncoding: lexint })

db.put(2, 'example', (err) => {
  db.put(10, 'example', (err) => {
    // Without our encoding, the keys would sort as 10, 2.
    db.createKeyStream().on('data', console.log) // 2, 10
  })
})
```

## usage with [`levelup`]

```js
const levelup = require('levelup')
const encode = require('encoding-down')
const leveldown = require('leveldown')
const lexint = require('lexicographic-integer-encoding')('hex')

const db = levelup(encode(leveldown('./db'), { keyEncoding: lexint }))
```

## api

### `lexint = require('lexicographic-integer-encoding')(encoding, [options])`

- `encoding` (string, required): `'hex'` or `'buffer'`
- `options.strict` (boolean): opt-in to type-checking input. If true, encode will throw:
  - A `TypeError` if input is not a number or if `NaN`
  - A `RangeError` if input is < 0 or > `Number.MAX_SAFE_INTEGER`

Returns a [`level-codec` compliant encoding](https://github.com/Level/codec#encoding-format) object.

## see also

- [`lexicographic-integer`]: main encoding logic
- [`unique-lexicographic-integer`]: `lexicographic-integer` plus a suffix if input is the same as the last call;
- [`monotonic-lexicographic-timestamp`]: `unique-lexicographic-integer` with `Date.now()` to get a monotonically increasing timestamp with lexicographic order.

## install

With [npm](https://npmjs.org) do:

```
npm install lexicographic-integer-encoding
```

## license

[MIT](http://opensource.org/licenses/MIT) © Vincent Weevers

[`lexicographic-integer`]: https://github.com/substack/lexicographic-integer
[`level`]: https://github.com/Level/level
[`levelup`]: https://github.com/Level/levelup
[`unique-lexicographic-integer`]: https://github.com/vweevers/unique-lexicographic-integer
[`monotonic-lexicographic-timestamp`]: https://github.com/vweevers/monotonic-lexicographic-timestamp
