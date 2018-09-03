import { parse as urlParse } from 'url'
import { parse as queryParse } from 'querystring'
import * as wechat from '../api/wechat'
import config from '../config'

import { openidAndSessionKey, WXBizDataCrypt } from '../wechat-lib/mina'

import Product from '../database/schema/product'
import User from '../database/schema/user'
import Payment from '../database/schema/payment'

export async function signature(ctx, next) {
  let url = ctx.query.url

  if (!url) ctx.throw(404)

  url = decodeURIComponent(url)

  const params = await wechat.getSignatureAsync(url)

  ctx.body = {
    success: true,
    data: params
  }
}

// 网页上点某按钮，直接跳转到 http://x.o/wechat-redirect?visit=a&id=b
// 用户被重定向到 Wechat Redirect URL 授权验证
// 验证后，自动二跳进入 http://x.o/oauth?code=xxxxxx&state=a_b
export function redirect(ctx, next) {
  const redirect = config.SITE_ROOT_URL + '/oauth'
  const scope = 'snsapi_userinfo'
  const { visit, id } = ctx.query
  const params = id ? `${visit}_${id}` : visit
  console.log('~~~~~controller - redirect - params: ', params)
  const url = wechat.getAuthorizeURL(scope, redirect, params)

  ctx.redirect(url)
}

export async function createOrderAsync(ctx, next) {
  const ip = ctx.ip.replace('::ffff:', '')
  const { code, productId, userInfo, name, address, phoneNumber } = ctx.request.body
  let product

  try {
    product = await Product.findOne({ _id: productId }).exec()

    if (!product) return (ctx.body = { success: 'false', error: '商品已经下架' })
  } catch (err) {
    return (ctx.body = { success: 'false', error: '服务器异常' })
  }

  try {
    const minaUser = await openidAndSessionKey(code)
    const wxBizDataCrypt = new WXBizDataCrypt(minaUser.session_key)
    const decryptData = wxBizDataCrypt.decryptData(userInfo.encryptedData, userInfo.iv)

    let user = await User.findOne({
      openid: decryptData.openid
    }).exec()

    if (!user) {
      let _userInfo = userInfo.userInfo

      user = new User({
        avatarUrl: _userInfo.avatarUrl,
        nickname: _userInfo.nickname,
        openid: [minaUser.openid],
        sex: _userInfo.gender,
        country: _userInfo.country,
        province: _userInfo.province,
        city: _userInfo.city
      })

      await user.save()
    }

    let _order = {
      body: product.title,
      attach: '小程序周边支付',
      out_trade_no: 'Product' + (new Date()),
      total_fee: 0.1 * 100,
      spbill_create_ip: ip,
      openid: minaUser.openid,
      trade_type: 'JSAPI'
    }

    // TODO: fix bug
    let order = await getPramasAsync(_order)

    let payment = new Payment({
      user: user._id,
      product: product._id,
      success: 0,
      name,
      address,
      phoneNumber,
      payType: '小程序',
      totalFee: product.title
    })

    await payment.save()

    ctx.body = {
      order,
      product,
      payment,
      user
    }
  } catch (err) {
    return (ctx.body = {
      success: 'false',
      error: err
    })
  }
}

export async function oauth(ctx, next) {
  let url = ctx.query.url

  // 解析query查询参数拿code
  const urlObj = urlParse(decodeURIComponent(url))
  const params = queryParse(urlObj.query)
  const code = params.code

  const user = await wechat.getUserByCode(code)

  // 更新session
  console.log('我在控制器wecaht中 oauth -- user:')
  console.log(user)

  user.avatarUrl = user.headimgurl
  user.gender = user.sex === 1 ? '男' : '女'
  // 将微信服务器返回的user存入session
  ctx.session = user // 为了测试改,原来ctx.session.user = user

  ctx.body = {
    success: true,
    user
  }
}

export async function paymentAsync(ctx, next) {
  const { body } = ctx.request

  try {
    let payment = await Payment.findOne({
      _id: body.payment._id
    }).exec()

    if (!payment) return (ctx.body = { success: false, error: '订单不存在' })

    if (String(payment.product) !== body.product._id || String(payment.user) !== body.user._id) {
      return (ctx.body = {
        success: false,
        error: '订单错误，请联系网站管理员'
      })
    }

    payment.success = 1

    await payment.save()

    ctx.body = { success: true, msg: '支付成功' }
  } catch (err) {
    ctx.body = { success: false, error: '支付失败' }
  }
}
