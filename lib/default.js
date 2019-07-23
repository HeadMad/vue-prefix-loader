const checkComponent = require('./checkComponent.js')

module.exports = function({camelTag}, {prefixes, prefix, name}) {

  let path = prefixes[prefix] + name.split('-', 1)[0] + '/'

  if (!checkComponent('./src' + path.replace(/^(\.|@)\//, ''), name, '.vue'))
    return false

  return {
    comp: camelTag,
    from: `${path + name}.vue`
  }
}