
const Koa = require('koa')
const app = new Koa()
const PORT = 8001

app
  .use(require('./mws/mw-html'))
  .use(require('./mws/mw-js'))
  .use(require('./mws/mw-bareImport'))
  .use(require('./mws/mw-vue'))

app.listen(PORT, err => {
  console.log(`服务启动成功，端口：${PORT}`)
})