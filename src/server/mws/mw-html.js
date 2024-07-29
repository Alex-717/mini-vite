
const path = require('path')
const fs = require('fs')
const { clientRoot } = require('../utils/path')


module.exports = async (ctx, next) => {
  const { url } = ctx
  // console.log('(mw-html) url', url)
  const htmlName = path.basename(url, path.extname(url))
  if (url == '/' || htmlName === 'index') {
    ctx.type = 'text/html'
    const htmlPath = path.join(clientRoot, 'index.html')
    const content = await fs.promises.readFile(htmlPath, 'utf-8')
    ctx.body = content
  }
  await next()
}