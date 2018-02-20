// 对微信异步场景初始化
import mongoose from 'mongoose'
import config from '../config'
import Wechat from "../wechat-lib"

const Token = mongoose.model('Token')

const wechatConfig = {
  wechat: {
    addID: config.wechat.appID,
    appSecret: config.wechat.appSecret,
    token: config.wechat.token,
    getAccessToken: async () => await Token.getAccessToken(),
    saveAccessToken: async (data) => await Token.saveAccessToken(data)
  }
}

export const getWechat = () => {
  const wechatClient = new Wechat(wechatConfig.wechat)

  return wechatClient
}

getWechat()

