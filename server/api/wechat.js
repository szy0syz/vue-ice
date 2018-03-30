import { getWechat, getOAuth } from '../wechat'
import mongoose from 'mongoose'

const User = mongoose.model('User')
const client = getWechat()

export async function getSignatureAsync(url) {
  const data = await client.fetchAccessToken()
  const token = data.token

  const ticketData = await client.fetchTicket(token)
  const ticket = ticketData.ticket

  let params = client.sign(ticket)
  params.appId = client.appID

  return params
}

export async function getAuthorizeURL(...args) {
  const oauth = getOAuth()
  return oauth.getAuthorizeURL(...args)
}

export async function getUserByCode(code) {
  const oauth = getOAuth()
  const data = await oauth.fetchAccessToken(code)
  console.log(data)
  // const user = await oauth.getUserByCode(data.access_token, data.unionid)
  const user = await oauth.getUserInfo(data.access_token, data.openid)
  console.log('getUserByCode~~~~~')
  console.log(user)
  const existUser = await User.findOne({
    openid: data.openid
  }).exec()

  console.log(`existUser`)
  console.log(existUser)

  if (!existUser) {
    let newUser = new User({
      // role: default --> user
      openid: [data.openid],
      unionid: data.unionid ? data.unionid : null,
      nickname: user.nickname,
      province: user.province,
      country: user.country,
      city: user.city,
      sex: user.sex,
      headimgurl: user.headimgurl
    })

    await newUser.save()
  }

  // 控制返回的格式
  return {
    nickname: user.nickname,
    province: user.province,
    country: user.country,
    city: user.city,
    sex: user.sex,
    headimgurl: user.headimgurl
  }
}
