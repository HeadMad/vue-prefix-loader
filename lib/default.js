const checkComponent = require('./checkComponent.js')

module.exports = function({camelTag}, {prefixes, prefix, name}) {

  let result = {comp: camelTag}

  let importPath = prefixes[prefix]

  if (pathImport.startsWith('@/')) {
    if (!checkComponent('./src/' + path.replace(/^(\.|@)\//, ''), name, '.vue')) return false

    result.from = importPath + name + '.vue'

  // if used global library
  } else {
    result.from = importPath
  }

  return result
}