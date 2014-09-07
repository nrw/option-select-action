var slice = Array.prototype.slice

module.exports = SelectAction

function SelectAction (actions, value, opts) {
  value = value || []
  opts = opts || {}
  opts.keyField = opts.keyField || 'id'

  return {
    select: select.bind(null, actions, value, opts),
    pop: pop.bind(null, value),
    toObject: toObject.bind(null, value),
    value: toObject.bind(null, value)
  }
}

function select (actions, value, opts, obj) {
  var key = obj[opts.keyField]

  if (typeof actions[key] === 'function') {
    var args = slice.call(arguments, 3)
    return actions[key].apply(null, args)
  }

  value.push(obj)
}

function pop (value) {
  return value.pop()
}

function toObject (value) {
  return value
}
