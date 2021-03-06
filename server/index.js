import Koa from 'koa'
import { Nuxt, Builder } from 'nuxt'
import R from 'ramda'
import { resolve } from 'path'

// 25分钟~~~

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

const r = path => resolve(__dirname, path)
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 4000
const MIDDLEWARES = ['database', 'common', 'router']

class Server {
  constructor() {
    this.app = new Koa()
    this.useMiddleWare(this.app)(MIDDLEWARES)
  }

  // 加载不同中间件
  // 原理：到指定文件夹下扫描所有文件，然后逐个丢require加载，然后再逐个把app对象传到所加载到的对象并执行
  useMiddleWare(app) {
    // app.use(mid1)
    // app.use(mid2)
    // app.use(mid3)
    return R.map()(
      R.compose(R.map(i => i(app)), require, i => `${r('./middlewares')}/${i}`)
    )
  }

  async start() {
    // Instantiate nuxt.js
    const nuxt = new Nuxt(config)
    this.app.szy = 'jerry_shi'
    // Build in development
    if (config.dev) {
      const builder = new Builder(nuxt)
      await builder.build()
    }

    this.app.use(async (ctx, next) => {
      await next()
      ctx.status = 200 // koa defaults to 404 when it sees that status is unset

      // 渲染页面前，将session同步到req中
      // 这里同步了，在adminController-nuxtServInit映射时拿到session
      ctx.req.session = ctx.session
      // ~~~~~~~~~

      return new Promise((resolve, reject) => {
        ctx.res.on('close', resolve)
        ctx.res.on('finish', resolve)
        nuxt.render(ctx.req, ctx.res, promise => {
          // nuxt.render passes a rejected promise into callback on error.
          promise.then(resolve).catch(reject)
        })
      })
    })

    this.app.listen(port, host)
    console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
  }
}

const app = new Server()
app.start()
