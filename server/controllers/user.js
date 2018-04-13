import mongoose from 'mongoose'
import { openidAndSessionKey, WXBizDataCrypt } from '../wechat-lib/mina'

const User = mongoose.model('User')

export async function getUserAsync(ctx, next) {
  const { code, userInfo } = ctx.request.body
  const minaUser = await openidAndSessionKey(code)

  let user = await User.findOne({
    openid: {
      $in: [minaUser.openid]
    }
  }).exec()

  if (!user) {
    let pc = new WXBizDataCrypt(minaUser.session_key)
    const data = pc.decryptData(userInfo.encryptedData, userInfo.iv)

    try {
      user = await User.findOne({
        openid: {
          $in: [data.openid]
        }
      })

      if (!user) {
        let _userData = data.userInfo

        user = new User({
          avatarUrl: _userData.avatarUrl,
          nickname: _userData.nickName,
          openid: data.unionid,
          sex: _userData.gender,
          country: _userData.country,
          city: _userData.city,
          province: _userData.province
        })

        await user.save()
      }
    } catch (err) {
      return (ctx.body = {
        success: false,
        err
      })
    }
  }

  ctx.body = {
    success: true,
    data: {
      nickname: user.nickName,
      avatarUrl: user.avatarUrl,
      sex: user.sex
    }
  }
}

export async function loginAsync(ctx, next) {
  const { code, avatarUrl, nickName } = ctx.request.body

  try {
    const { openid, unionid } = await openidAndSessionKey(code)

    let user = await User.findOne({
      unionid
    }).exec()

    if (!user) {
      user = new User({
        openid: [openid],
        nickname: nickName,
        unionid,
        avatarUrl
      })

      user = await user.save()
    } else {
      user.avatarUrl = avatarUrl
      user.nickname = nickName
      user = await user.save()
    }

    ctx.body = {
      success: true,
      data: {
        nickname: nickName,
        avatarUrl: avatarUrl
      }
    }
  } catch (err) {
    ctx.body = {
      success: false,
      err
    }
  }
}
