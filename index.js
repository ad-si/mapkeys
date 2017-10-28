function mapKey (object, oldKey, newKey) {
  const oldKeyFragments = oldKey.split('.')
  const value = oldKeyFragments.reduce(
    (subObject, subKey, index) => {
      if (subObject && subObject.hasOwnProperty(subKey)) {
        const tempValue = subObject[subKey]
        if (index === oldKeyFragments.length - 1) delete subObject[subKey]
        return tempValue
      }
      else {
        return undefined
      }
    },
    object
  )

  if (typeof value === 'undefined') return

  const fragments = newKey.split('.')
  fragments
    .reduce(
      (subObject, subKey, index) => {
        if (typeof subObject[subKey] === 'undefined') subObject[subKey] = {}
        if (index === fragments.length - 1) subObject[subKey] = value
        return subObject[subKey]
      },
      object
    )
}

module.exports = (options) => {
  const {in: object} = options
  const objectClone = Object.assign({}, object) // Clone object
  let {mappings} = options

  if (!Array.isArray(mappings)) mappings = [mappings]

  mappings.forEach(map => {
    const {to: newKey} = map
    let {from: oldKeys} = map
    if (!Array.isArray(oldKeys)) oldKeys = [oldKeys]
    oldKeys.forEach(oldKey => {
      mapKey(objectClone, oldKey, newKey)
      delete objectClone[oldKey]
    })
  })

  return objectClone
}
