const VueAutomato = require('vue-automato')
const { camelize, capitalize, hyphenate } = require('vue-automato/util')

module.exports = function (prefixes) {
  return new VueAutomato({
    match (node, opts) {
      let originalTag = node.tag
      let kebabTag = hyphenate(originalTag)
      let camelTag = capitalize(camelize(originalTag))

      for (const prefix in prefixes) {
        if (!kebabTag.startsWith(prefix)) continue

        opts.prefixes = prefixes
        opts.prefix = prefix
        opts.name = kebabTag.substring(prefix.length)
        opts.defaultHandler = require('./lib/default.js')
        
        const handler = typeof prefixes[prefix] === "function"
          ? prefixes[prefix]
          : opts.defaultHandler
        
        return handler({originalTag, kebabTag, camelTag}, opts, node)
      }
    }
  })
}

