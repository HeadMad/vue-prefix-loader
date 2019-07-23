class Component {
  constructor() {
    this.template = ''
    this.script = ''
    this.styles = ''
  }

  addTemplate(string) {
    this.template += string 
  }

  addScript(string) {
    this.script += string
  }

  addStyle(string) {
    this.styles += string
  }

  getContent() {
    return `<template>\n  ${this.template.replace(/\n/g, '\n  ')}\n</template>\n\n<script>\n  ${this.script.replace(/\n/g, '\n  ')}\n</script>\n\n<style>\n  ${this.styles.replace(/\n/g, '\n  ')}\n</style>`
  }
}

module.exports = Component