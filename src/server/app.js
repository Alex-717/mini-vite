
const Koa = require('koa')
const app = new Koa()
const PORT = 10086

app.use(require('./mws/mw-html'))
app.use(require('./mws/mw-js'))
app.use(require('./mws/mw-bareImport'))
app.use(require('./mws/mw-vue'))

app.listen(PORT, err => {
  console.log(`服务启动成功，端口：${PORT}`)
})