
const path = require('path')
const fs = require('fs')
const { proRoot } = require('../utils/path')
const { transformBareImport } = require('../utils/handelBareImport')
const { bare_prefix } = require('../utils/const')

function getBareEntryFilePath (bareDep) {
  // console.log('🐷', bareDep)
  bareDep = bareDep
  const pkg = require(`${proRoot}/node_modules/${bareDep}/package.json`)
  const moduleEntry = pkg.module
  const targetFilePath = path.resolve(`${proRoot}/node_modules/${bareDep}`, moduleEntry)
  // console.log('🐷🐷', targetFilePath)
  return targetFilePath
}

module.exports = async (ctx, next) => {
  const { url } = ctx
  // console.log('(mw-bareImport) url---', url, bare_prefix, url.startsWith(bare_prefix))
  if (url.startsWith(bare_prefix)) {
    ctx.type = 'text/javascript'
    const bareEntryFilePath = getBareEntryFilePath(url.slice(bare_prefix.length+1))
    const content = await fs.promises.readFile(bareEntryFilePath, 'utf-8')
    ctx.body = transformBareImport(content)
  } 
  await next()
}