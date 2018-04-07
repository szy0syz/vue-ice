import rp from 'request-promise'
import config from '../config'

export const openidAndSessionKey = async code => {
  let opts = {
    uri: 'https://api.weixin.qq.com/sns/jscode2session?',
    qs: {
      appid: config.mina.appid,
      secret: config.mina.secret,
      grant_type: 'authorization_code'
    },
    json: true
  }

  opts.qs.js_code = code

  let res = await rp(opts)

  return res
}
