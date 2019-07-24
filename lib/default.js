const checkComponent = require('./checkComponent.js')

module.exports = function({camelTag}, {rootPath, prefixes, prefix, name}) {

  let result = {comp: camelTag}

  let importPath = prefixes[prefix]

  if (importPath.startsWith('@/')) {
    if (!checkComponent(rootPath + '/src/' + path.replace('@/', ''), name, '.vue')) return false

    result.from = importPath + name + '.vue'

  // if used global library
  } else {
    result.from = importPath
  }

  return result
}