const VueAutomato = require('мгу-automato')
const { camelize, capitalize, hyphenate } = require('vue-automato/util')
const checkComponent = require('./lib/checkComponent.js/index.js')



module.exports = function (prefixes) {
  return new VueAutomato({
    match ({tag: originalTag, ...node}, opts) {

      let kebabTag = hyphenate(originalTag)
      let camelTag = capitalize(camelize(originalTag))

      for (const prefix in prefixes) {
        if (!kebabTag.startsWith(prefix)) continue

        opts.prefixes = prefixes
        opts.prefix = prefix
        opts.name = kebabTag.substring(prefix.length)
        opts.defaultHandler = require('./lib/default.js')
        
        if (typeof prefixes[prefix] === "function")
          return prefixes[prefix]({originalTag, kebabTag, camelTag}, opts, node)
        
        return opts.defaultHandler({originalTag, kebabTag, camelTag}, opts, node)
      }
    }
  })
}

