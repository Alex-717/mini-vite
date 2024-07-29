
const path = require('path')
const fs = require('fs')
const { clientRoot } = require('../utils/path')
const { transformBareImport } = require('../utils/handelBareImport')

const handleFnMap = {
  '': hanleVueScript,
  'template': hanleVueTemplate,
  'style': handleVueStyle,
}

module.exports = async (ctx, next) => {
  const { query, path: ctxPath } = ctx
  // console.log('(mw-vue) url---', url, path.extname(url))
  if (path.extname(ctxPath) === '.vue') {
    ctx.type = 'text/javascript'
    const code = await fs.promises.readFile(`${clientRoot}/${ctxPath}`, 'utf-8')
    const { descriptor } = require('vue/compiler-sfc').parse(code)

    const handleFn = handleFnMap[query.type ? query.type : '']
    handleFn && handleFn({ctx, descriptor, ctxPath})
  } 
  await next()
}

function hanleVueScript({ctx, descriptor, ctxPath}) {
  const string = descriptor.script.content.replace('export default', 'const comp =')
  // 组件的导出需要一个setup函数和render渲染函数
  const retCode = `
  ${transformBareImport(string)}
  ${descriptor.styles && descriptor.styles.length ? `import '${ctxPath}?type=style'` : ''}
  import { render } from '${ctxPath}?type=template'
  comp.render = render
  export default comp`

  ctx.body = retCode
}

function hanleVueTemplate({ctx, descriptor}) {
  // 编译模板
  const compileDom = require('@vue/compiler-dom').compile(descriptor.template.content, { mode: 'module' })
  ctx.body = transformBareImport(compileDom.code)
}

function handleVueStyle({ctx, descriptor}) {
  let { styles = [] } = descriptor
  let stylesString = ''
  if(styles.length) {
    styles.forEach(style => stylesString+=style.content)
  }
  ctx.body = !styles.length ? '' : `
    function setHeadStyle(code) {
      const style = document.createElement('style')
      style.innerHTML = code
      document.head.appendChild(style)
    }
    setHeadStyle(${JSON.stringify(stylesString)})
  `
}