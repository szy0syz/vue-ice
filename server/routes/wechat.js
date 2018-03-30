import { controller, get, post } from '../decorator/router'
import config from '../config'
import reply from '../wechat/reply'
import wechatMiddle from '../wechat-lib/middleware'
import { signature, redirect, oauth } from '../controllers/wechat'

@controller('')
export class WechatController {
  @get('/wechat-hear')
  async wechatHear(ctx, next) {
    const middle = wechatMiddle(config.wechat, reply)
    const body = await middle(ctx, next)
    console.log('get--/wechat-hear')
    ctx.body = body
  }

  @post('/wechat-hear')
  async wechatPostHear(ctx, next) {
    const middle = wechatMiddle(config.wechat, reply)
    const body = await middle(ctx, next)
    console.log('post--/wechat-hear')
    ctx.body = body
  }

  @get('/wechat-signature')
  async wechatSignature(ctx, next) {
    await signature(ctx, next)
  }

  @get('/wechat-redirect')
  async wechatRedirect(ctx, next) {
    await redirect(ctx, next)
  }

  @get('/wechat-oauth')
  async wechatOAuth(ctx, next) {
    await oauth(ctx, next)
  }
}

// export const router = app => {
//   const router = new Router()

//   router.all('/wechat-hear', wechatMiddle(config.wechat, reply))

//   router.get('/wechat-signature', signature)
//   router.get('/wechat-redirect', redirect)
//   router.get('/wechat-oauth', oauth)
//   // http://jerrys.free.ngrok.cc/wechat-redirect?a=111&b=222
//   router.get('/upload', async (ctx, next) => {
//     let mp = require('../wechat', signature)
//     let client = mp.getWechat()

//     const data = await client.handle(
//       'uploadMaterial',
//       'image',
//       resolve(__dirname, '../../saber.jpeg'),
//       { type: 'image' }
//     )
//     console.log(data)
//   })

//   app.use(router.routes()).use(router.allowedMethods())
// }
