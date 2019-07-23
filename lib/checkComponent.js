const fs = require('fs')
const ComponentContent = require('./ComponentContent.js')

module.exports = function (path, name, ext) {
  // path to file
  let file = path + name + ext

  // если файл существует
  if (fs.existsSync(file))
    return true

  // creating content of vue-component (.vue)
  let component = new ComponentContent()
  let className = name.replace('-', '__')
  component.addTemplate(`<div class="${className}"><slot /></div>`)
  component.addScript(`export default {\n  name: "${name}",\n  data() {\n    return {}\n  } \n}`)
  component.addStyle(`.${className} {}`)

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