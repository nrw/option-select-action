var test = require('tape')
var SelectAction = require('..')

var actions, initial, store

test('simple usage', function (t) {
  var i = 0

  actions = {inc: function () { i++ }}
  store = SelectAction(actions)

  t.same(store.value(), [])

  store.select({})
  t.same(store.value(), [{}])

  store.select({value: 'six'})
  t.same(store.value(), [{}, {value: 'six'}])
  t.equal(i, 0)

  store.select({value: 'inc'})
  t.equal(i, 1)
  t.same(store.value(), [{}, {value: 'six'}])

  store.select({value: 'inc'})
  t.equal(i, 2)

  t.same(store.pop(), {value: 'six'})
  t.same(store.value(), [{}])
  store.pop()
  t.same(store.value(), [])

  t.end()
})

test('with options', function (t) {
  var i = 0

  actions = {
    inc: function () { i++ },
    dec: function () { i-- }
  }

  initial = [{_value: 'eight'}]
  store = SelectAction(actions, initial, {keyField: '_value'})
  t.same(store.value(), [{_value: 'eight'}])

  store.select({_value: 'one'})
  t.same(store.value(), [{_value: 'eight'}, {_value: 'one'}])
  t.equal(i, 0)

  store.select({_value: 'inc'})
  t.equal(i, 1)
  t.same(store.value(), [{_value: 'eight'}, {_value: 'one'}])

  store.select({_value: 'dec'})
  t.same(store.value(), [{_value: 'eight'}, {_value: 'one'}])
  t.equal(i, 0)

  t.end()
})

test('passes arguments', function (t) {
  var i = ''

  actions = {
    add: function (obj, a, b) { i += obj.value + a + b }
  }

  store = SelectAction(actions)

  store.select({value: 'add'}, 'one', 'two')
  t.equal(i, 'addonetwo')

  t.end()
})
