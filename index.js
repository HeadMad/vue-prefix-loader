const VueAutomato = require('vue-automato')

module.exports = function (prefixes) {
  return new VueAutomato({
    match ({rawTag, camelTag, kebabTag}, params, node, link) {
      // if the tag is in this file already had
      if (link[kebabTag]) return false
      link[kebabTag] = true

      for (const prefix in prefixes) {
        if (!kebabTag.startsWith(prefix)) continue

        link.prefixes = prefixes
        link.prefix = prefix
        link.name = kebabTag.substring(prefix.length)
        link.defaultHandler = require('./lib/default.js')
        
        const handler = typeof prefixes[prefix] === "function"
          ? prefixes[prefix]
          : link.defaultHandler
        
        return handler(...arguments)
      }
    }
  })
}

