# vue-prefix-loader

The plugin `vue-prefix-loader` allows you to specify the directory from which you want to load the components, depending on the prefixes in the tag name.
```javascript
// vue.config.js
const vuePrefixLoader = require('vue-prefix-loader')
const gridLoader = require('./plugins/grid-loader.js')

module.exports = {
  configureWebpack: {
    plugins: [
      vuePrefixLoader({
        'l-': '@/lib/layout/',
        'b-': '@/lib/blocks/',
        'g-': gridLoader
      })
    ]
  }
}
```

Also, as a path you can specify a function that should return `false` or an object from the [returned value](https://github.com/HeadMad/vue-automato#returned-value) of [vue-automato](https://github.com/HeadMad/vue-automato) plugin

```javascript
{
  name: 'PrefixNameOfComponent',
  src: '@/path/to/name-of-component.vue'
}
```

The sample code of the handler function:
```javascript
// grid-loader.js

module.exports = function(tag, params, node, link) {

    let source = `@/lib/grids/${tag.kebabTag}.vue`
    return {
      name: tag.camelTag,
      src: source
    }

}
```

## Parameters
- **tag**
<br> `Object`. Contains next fields
  - **tag.rawTag**
  <br> `String`. Original tag (_for example: app-header-title_)
  - **tag.kebabTag**
  <br> `String`. Tag in kebab-case style (_app-header-title_)
  - **tag.camelTag**
  <br> `String`. came-case style (_AppHeaderTitle_)
  - **tag.prefix**
  <br> `String`. A prefix of current tag (_app-_)
- **params**
<br> `Object`. Additional parameter including:
  - **params.className**
  <br> `Array`. Classes specified in the class attribute
  - **params.directives**
  <br> `Array`. The attributes of the tag specified with prefix _"v-"_
  <br>`[{ name, value, isBinded }, ...]`
  - **params.props**
  <br> `Array`. The attributes of the tag, except for _directives_ and attributes _class_, _style_
  <br>`[{ name, arg, isDynamicArg, mods, value }, ...]`
- **node**
<br> `Object`. The node of this tag is from the virtual tree
  - **node.tag**
  <br> `String`. The name of the current tag
  - *coming soon...*
- **link**
<br> `Object`. Additional object that links all tags in a component
  - **link.rootPath**
  <br> `String`. Full path to the root directory of the project
  - **link.parentPath**
  <br> `String`. The path to the _.vue_ file relative to the root directory
  - **link.prefixes**
  <br> `Object`. A list of prefixes in the plugin
  - **link.defaultHandler**
  <br> `Function`. Prefix handler whose values are specified by a string




