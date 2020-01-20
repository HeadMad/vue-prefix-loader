const VueAutomato = require('vue-automato')

// set default values of options
const options = {
  defaultHandler: require('./lib/defaultHandler.js')
}

/**
 * Set value by default if they dont set in result object
 * 
 * @param {Object} obj result object, or array of objects
 * @param {String} prop prop of object
 * @param {String} value value of prop
 */
const _addProp = function (obj, prop, value) {
  if (Array.isArray(obj)) obj.forEach(_addProp)
  else if (!obj[prop]) obj[prop] = value
}


function vuePrefixLoader(prefixes = {}, opts = {}) {

  // merge options with options by default
  Object.assign(options, opts)

  return new VueAutomato({
    match(tag, params, node, link) {

      // if the tag is in this file already had
      if (link[tag.kebabTag]) return false
      link[tag.kebabTag] = true

      link.prefixes = prefixes
      link.defaultHandler = options.defaultHandler

      for (const prefix in prefixes) {
        if (!tag.kebabTag.startsWith(prefix)) continue

        tag.prefix = prefix

        const handler = typeof prefixes[prefix] === 'function'
          ? prefixes[prefix]
          : options.defaultHandler

        let result = handler(...arguments)
        if (result) _addProp(result, 'install', 'components')

        return result
      }
    } // VueAutomato.match
  }) // VueAutomato
}

module.exports = vuePrefixLoader