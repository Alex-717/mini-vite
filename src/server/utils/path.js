
const { resolve } = require('path')

const serverRoot = resolve(__dirname, '../../server')
const clientRoot = resolve(__dirname, '../../client')
const srcRoot = resolve(__dirname, '../../../src')
const proRoot = resolve(__dirname, '../../../')

module.exports = {
  serverRoot,
  clientRoot,
  srcRoot,
  proRoot
}
