import { parse as urlParse } from 'url'
import { parse as queryParse } from 'querystring'
import * as api from '../api'
import config from '../config'

export async function signature(ctx, next) {
  let url = ctx.query.url

  if (!url) ctx.throw(404)

  url = decodeURIComponent(url)

  const params = await api.wechat.getSignatureAsync(url)

  ctx.body = {
    success: true,
    params
  }
}

export async function redirect(ctx, next) {
  const target = config.SITE_ROOT_URL + '/oauth'
  const scope = 'snsapi_userinfo'
  const { a, b } = ctx.query // ~~~~~~~~~~这里只是测试用！
  const params = `${a}_${b}`

  const url = await api.wechat.getAuthorizeURL(scope, target, params)

  ctx.redirect(url)
}

export async function oauth(ctx, next) {
  let url = ctx.query.url

  url = decodeURIComponent(url)

  // 解析query查询参数拿code
  const urlObj = urlParse(url)
  const params = queryParse(urlObj.query)
  const code = params.code

  const user = await api.wechat.getUserByCode(code)

  ctx.body = {
    succsee: true,
    data: user
  }
}
