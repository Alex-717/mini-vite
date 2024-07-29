const path = require('path')
const fs = require('fs')
const { clientRoot } = require('../utils/path')
const { transformBareImport } = require('../utils/handelBareImport')

module.exports = async (ctx, next) => {
  const { url } = ctx
  // console.log('(mw-js) url', url)
  if (path.extname(url) === '.js') {
    ctx.type = 'text/javascript'
    const jsPath = path.join(clientRoot, url)
    const content = await fs.promises.readFile(jsPath, 'utf-8')
    ctx.body = transformBareImport(content)
  } 
  await next()
}