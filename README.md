# vue-prefix-loader

The plugin `vue-prefix-loader` allows you to specify the directory from which you want to load the components, depending on the prefixes in the tag name.
```javascript
// vue.config.js
const vuePrefixLoader = require('vue-prefix-loader')


module.exports = {
  configureWebpack: {
    plugins: [
      vuePrefixLoader({
        'l-': '@/lib/layout/',
        'b-': '@/lib/blocks/',
        'g-': require('./plugins/grid-loader.js')
      })
    ]
  }
}
```

Also, as a path you can specify a function that should return `false` in case of failure or the following object:
```javascript
{
  comp: 'PrefixNameOfComponent',
  from: '@/path/to/name-of-component.vue'
}
```
The sample code of the handler function:
```javascript
// grid-loader.js

module.exports = function(
  {originalTag, kebabTag, camelTag},
  {rootPath, parentPath, prefixes, prefix, name, defaultHandler},
  node) {
    let name = kebabTag.substring(2)
    let from = `@/lib/grids/${name}.vue`
    return {
      from: from,
      comp: camelTag
    }
}
```

## Parameters
- **originalTag**
  <br> String. Original tag (_for example: app-header-title_)
- **kebabTag**
  <br> String. Tag in kebab-case style (_app-header-title_)
- **camelTag**
  <br> Tag in came-case style (_AppHeaderTitle_)
- **rootPah**
  <br> String. Full path to the root directory of the project
- **parentPath**
  <br> String. The path to the parent vue file relative to the root directory of the project
- **prefixes**
  <br> Object. A list of prefixes in the plugin
- **prefix**
  <br> String. A prefix of current tag (_app-_)
- **name**
  <br> String. Current tag without prefix (_header-title_)
- **defaultHandler**
  <br> Function. Зrefix handler whose values are specified by a string
- **node**
  <br> Object. The node of this tag is from the virtual tree



