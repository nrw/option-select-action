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

  store.select({id: 'six'})
  t.same(store.value(), [{}, {id: 'six'}])
  t.equal(i, 0)

  store.select({id: 'inc'})
  t.equal(i, 1)
  t.same(store.value(), [{}, {id: 'six'}])

  store.select({id: 'inc'})
  t.equal(i, 2)
  t.end()
})

test('with options', function (t) {
  var i = 0

  actions = {
    inc: function () { i++ },
    dec: function () { i-- }
  }

  initial = [{_id: 'eight'}]
  store = SelectAction(actions, initial, {keyField: '_id'})
  t.same(store.value(), [{_id: 'eight'}])

  store.select({_id: 'one'})
  t.same(store.value(), [{_id: 'eight'}, {_id: 'one'}])
  t.equal(i, 0)

  store.select({_id: 'inc'})
  t.equal(i, 1)
  t.same(store.value(), [{_id: 'eight'}, {_id: 'one'}])

  store.select({_id: 'dec'})
  t.same(store.value(), [{_id: 'eight'}, {_id: 'one'}])
  t.equal(i, 0)

  t.end()
})

test('passes arguments', function (t) {
  var i = ''

  actions = {
    add: function (obj, a, b) { i += obj.id + a + b }
  }

  store = SelectAction(actions)

  store.select({id: 'add'}, 'one', 'two')
  t.equal(i, 'addonetwo')

  t.end()
})
