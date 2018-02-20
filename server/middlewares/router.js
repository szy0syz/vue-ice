import Router from 'koa-router'
import sha1 from 'sha1'
import config from '../config'

export const router = app => {
  const router = new Router()

  router.get('/wechat-hear', (ctx, next) => {

    // 加载这个文件就会执行文件中那堆代码，进而new实例，就会执行getAccessToken()方法，再来就会获取token
    require('../wechat') // 不能太早加载代码

    const token = config.wechat.token
    const {
      signature,
      nonce,
      timestamp,
      echostr
    } = ctx.query
    const str = [token, timestamp, nonce].sort().join('')
    const sha = sha1(str)
    if (sha === signature) {
      ctx.body = echostr
    } else {
      ctx.body = 'Failed'
    }
  })

  // router.post('/wechat-hear', (ctx, next) => {
    
  // })

  app.use(router.routes())
  app.use(router.allowedMethods())
}