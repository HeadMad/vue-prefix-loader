const checkComponent = require('./checkComponent.js')

module.exports = function({kebabTag, camelTag, prefix}, {}, {}, {rootPath, prefixes}) {

  let result = {
    install: 'components',
    name: camelTag
  }

  let name = kebabTag.substring(prefix.length)
  let importPath = prefixes[prefix].replace('[block]', name.split('-', 1)[0])

  if (importPath.startsWith('@/')) {
    if (!checkComponent(rootPath + '/src/' + importPath.replace('@/', ''), name, '.vue'))
      return false

    result.src = importPath + name + '.vue'

  // if used global library
  } else {
    result.src = importPath
  }

  return result
}