const Koa = require('koa')
const serve = require('koa-static')
const Router = require('koa-router')
const path = require('path')
const fs = require('fs')

const backendApp = new Koa()
const frontendApp = new Koa()
const backendRouter = new Router()
const frontendRouter = new Router()

const serverBundle = require(path.resolve(__dirname, '../dist/vue-ssr-server-bundle.json'))
const clientManifest = require(path.resolve(__dirname, '../dist/vue-ssr-client-manifest.json'))
const template = fs.readFileSync(path.resolve(__dirname, '../dist/index.ssr.html'), 'utf-8')

const renderer = require('vue-server-renderer').createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template: template,
  clientManifest: clientManifest
})

backendRouter.get('*', (ctx, next) => {
  console.log('ctx', ctx)
  console.log('url', ctx.url)

  let context = {
    url: ctx.url
  };

  const ssrStream = renderer.renderToStream(context);
  ctx.status = 200
  ctx.type = 'html'
  ctx.body = ssrStream
})

backendApp.use(serve(path.resolve(__dirname, '../dist')))

backendApp
    .use(backendRouter.routes())
    .use(backendRouter.allowedMethods())

backendApp.listen(9000, () => {
    console.log('服务器端渲染地址为： http://localhost:9000')
})

frontendRouter.get('*', (ctx, next) => {
    let html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
    ctx.type = 'html'
    ctx.status = 200
    ctx.body = html
})

frontendApp.use(serve(path.resolve(__dirname, '../dist')))

frontendApp
    .use(frontendRouter.routes())
    .use(frontendRouter.allowedMethods())

frontendApp.listen(9001, () => {
    console.log('客户端渲染地址为： http://localhost:9001')
})
