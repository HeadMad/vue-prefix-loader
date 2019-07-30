const checkComponent = require('./checkComponent.js')

module.exports = function({camelTag}, params, node, {rootPath, prefixes, prefix, name}) {

  let result = {
    install: 'components',
    name: camelTag
  }

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