const checkComponent = require('./checkComponent.js')
const path = require('path')

const toPascalCase = (string) => string.replace(/\w/, (c) => c.toUpperCase()).replace(/-(\w)/g, (_, c) => c.toUpperCase())

/**
 * 
 * @param {String} string String fore replace serch substring
 * @param {String} search Search substring
 * @param {String} repl Replacement string
 */
function pathReplace(string, search, repl)
{
  let regExp = new RegExp('\\[([^\\]]*)(' + search + ')\\]', 'ig');
  return string.replace(regExp, (_, pre, search) => {

    // if empty repl
    if (!repl) return ''

    // if had no pre
    pre = pre ? pre : ''

    // if [Block] we use Pascal notacion
    let isPascal = /^[A-Z]/.test(search)
    let fill = !isPascal ? repl : toPascalCase(repl)

    return pre + fill
  })
} 

module.exports = function({kebabTag, camelTag, prefix}, {}, {}, {rootPath, prefixes}) {

  let result, name, id, trimmedPrefix, block, elem, importPath

  name = kebabTag.substring(prefix.length);
  
  [block, ...elem] = name.split('-')
  elem = elem.length ? elem.join('-') : false
  
  result = {
    install: 'components',
    name: camelTag
  }
  
  importPath = pathReplace(prefixes[prefix].trim(), 'block', block)  // replace [block] or [Block](Pascal case)
  importPath = pathReplace(importPath, 'elem', elem)                 // replace [elem] or [Elem](Pascal case)

  trimmedPrefix = prefix.substring(0, prefix.lastIndexOf('-'))
  importPath = pathReplace(importPath, 'prefix', trimmedPrefix)      // replace [prefix] or [Prefix](Pascal case)
  importPath += '.vue'

  // if path start with ./ or @/
  if (/^(\.|@)\//.test(importPath)) {

    importPath = path.join(rootPath, importPath.substring(1))
    importPath = importPath.split(path.sep)
    importPath = importPath.join('/')

    id = toPascalCase(name)

    if (!checkComponent(importPath, id, block, elem))
      return false

    result.src = importPath

  // if used global library
  } else {
    result.src = importPath
  }

  return result
}