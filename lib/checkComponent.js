const fs = require('fs')
const ComponentContent = require('./ComponentContent.js')

module.exports = function (file, id, block, elem) {
  // path to file
  let path = file.substring(0, file.lastIndexOf('/'))

  // если файл существует
  if (fs.existsSync(file))
    return true

  // creating content of vue-component (.vue)
  let component = new ComponentContent()
  let name = elem ? block + '__' + elem : block
  component.addTemplate(`<component :is="tag" class="${name}"><slot /></component>`)
  component.addScript(`export default {\n  name: "${id}",\n  props: {\n    tag: { type: String, default: "div" }\n  },\n  data() {\n    return {}\n  } \n}`)
  component.addStyle(`.${name} {}`)

  try {
    fs.writeFileSync(file, component.getContent())
    return true

  } catch (err) {
    try {
      fs.mkdirSync(path, {recursive: true})
      fs.writeFileSync(file, component.getContent())
      return true
    } catch (e) {
      console.log('Error creating component: ', e)
      return false
    }
  }
}