
module.exports = SelectAction

function SelectAction (actions, value, opts) {
  value = value || []
  opts = opts || {}
  opts.keyField = opts.keyField || 'id'

  return {
    select: select.bind(null, actions, value, opts),
    toObject: toObject.bind(null, value),
    value: toObject.bind(null, value)
  }
}

function select (actions, value, opts, obj) {
  var key = obj[opts.keyField]

  if (typeof actions[key] === 'function') {
    return actions[key](obj)
  }

  value.push(obj)
}

function toObject (value) {
  return value
}
