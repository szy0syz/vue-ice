// 微信异步场景的入口文件 管理微信api地址
import request from "request-promise";

const base = 'https://api.weixin.qq.com/cgi-bin/'
const api = {
  accessToken: base + 'token?grant_type=client_credential'
}

export default class Wechat {
  constructor(opts) {
    this.opts = Object.assign({}, opts)
    this.appID = opts.appID
    this.appSecret = opts.appSecret
    this.getAccessToken = opts.getAccessToken
    this.saveAccessToken = opts.saveAccessToken
    // 在实例第一次创建时，初始化token
    this.fetchAccessToken()
  }

  async request(options) {
    options = Object.assign({}, options, { json: true })

    try {
      const response = await request(options)
      console.log('wechat-lib/index.js中request函数的response: ', response)
      return response
    } catch (err) {
      console.error(err)
    }
  }

  // 初始化token
  async fetchAccessToken() {
    let data = await this.getAccessToken()
    // token失效或不合法就更新token
    if (!this.isValidAccessToken(data)) {
      data = await this.updateAccessToken()
    }

    await this.saveAccessToken(data)

    return data
  }

  // 首次初始化时数据库没有就用此函数向微信服务器发送请求获取最新token
  async updateAccessToken() {
    const url = api.accessToken + '&appid=' + this.appID + '&secret=' + this.appSecret
    const data = await this.request({ url: url })
    const now = (new Date().getTime())
    const expiresIn = now + (data.expires_in - 20) * 1000

    data.expires_in = expiresIn

    return data
  }

  isValidAccessToken(data) {
    if (!data || !data.access_token || !data.expires_in) {
      return false
    }

    const expiresIn = data.expires_in
    const now = (new Date().getTime())

    if (now < expiresIn) {
      return true
    } else {
      false
    }
  }
}