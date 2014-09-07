# option-select-action [![build status](https://secure.travis-ci.org/nrw/option-select-action.png)](http://travis-ci.org/nrw/option-select-action)

Add an option object to a value array or call a fuction based on the object's properties.

```js
var assert = require('assert')
var SelectAction = require('option-select-action')

var actions, initial, store

var i = 0

store = SelectAction({
  inc: function () { i++ }
})

assert.deepEqual(store.value(), [])

store.select({id: 'six'})
assert.deepEqual(store.value(), [{id: 'six'}])

assert.equal(i, 0)

store.select({id: 'inc'})
assert.equal(i, 1)
assert.deepEqual(store.value(), [{id: 'six'}])

store.select({id: 'inc'})
assert.equal(i, 2)

store.pop()
assert.deepEqual(store.value(), [])
```
