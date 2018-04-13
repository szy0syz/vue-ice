import { parse as urlParse } from 'url'
import { parse as queryParse } from 'querystring'
import * as wechat from '../api/wechat'
import config from '../config'

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
