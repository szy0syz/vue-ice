import mongoose from 'mongoose'
import { controller, get, post, required } from '../decorator/router'
import config from '../config'
import reply from '../wechat/reply'
import wechatMiddle from '../wechat-lib/middleware'
import { signature, redirect, oauth } from '../controllers/wechat'

import { getParamsAsync } from '../wechat-lib/pay'

const User = mongoose.model('User')
const Product = mongoose.model('Product')
const Payment = mongoose.model('Payment')

@controller('')
export class WechatController {
  @get('/wechat-hear')
  async wechatHear(ctx, next) {
    const middle = wechatMiddle(config.wechat, reply)
    await middle(ctx, next)
  }

  @post('/wechat-hear')
  async wechatPostHear(ctx, next) {
    const middle = wechatMiddle(config.wechat, reply)
    await middle(ctx, next)
  }

  @post('/wechat-pay')
  @required({ body: ['productId', 'name', 'phoneNumber', 'address'] })
  async createOrder(ctx, next) {
    // 有时候用代理ip返回值修复
    const ip = ctx.ip.replace('::fff:', '')
    const session = ctx.session
    const { productId, name, phoneNumber, address } = ctx.request.body // post的body

    // 查询商品是否有效
    const product = await Product.findOne({
      _id: productId
    }).exec()

    if (!product) {
      return (ctx.body = { success: false, err: '这个宝贝不存在' })
    }

    try {
      // 查询用户是否以前登录过 要换openid来查询
      let user = await User.findOne({ unionid: session.user.unionid }).exec()
      // 如果没登录过
      if (!user) {
        user = new User({
          openid: [session.user.openid],
          unionid: session.user.unionid,
          nickname: session.user.nickname,
          address: session.user.address,
          province: session.user.province,
          country: session.user.country,
          city: session.user.city,
          sex: session.user.sex,
          headimgurl: session.user.headimgurl,
          phoneNumber
        })

        user = await user.save()
      }

      let orderParams = {
        body: product.title,
        attach: '公众号周边手办支付',
        out_trade_no: 'Product' + new Date(),
        total_fee: product.price * 100,
        openid: session.user.unionid,
        trade_type: 'JSAPI',
        spbill_create_ip: ip
      }

      const order = await getParamsAsync(orderParams)

      let payment = new Payment({
        user: user._id,
        product: product._id,
        name,
        address,
        payType: '公众号',
        order,
        totalFee: product.price
      })

      payment = await payment.save()

      ctx.body = {
        success: true,
        data: payment.order
      }
    } catch (err) {
      ctx.body = {
        success: false,
        err
      }
    }
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
