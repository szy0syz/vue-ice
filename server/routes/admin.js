import mongoose from 'mongoose'
import { controller, post, required } from '../decorator/router'

const User = mongoose.model('User')

@controller('/admin')
export class WechatController {
  @post('/houses')
  @required({ body: ['email', 'password'] })
  async getHouses(ctx, next) {
    const { email, password } = ctx.request.body
    let user
    let match = false

    try {
      user = await User.findOne({ email }).exec()

      if (user) {
        match = await User.comparePassword(password, user.password)
      }
    } catch (err) {
      throw new Error(err)
    }

    if (match) {
      ctx.session.user = {
        _id: user._id,
        email: user.email,
        role: user.role,
        nickname: user.nickname,
        avatarUrl: user.avatarUrl
      }

      return (ctx.body = {
        success: true,
        data: {
          email: user.email,
          nickname: user.nickname,
          avatarUrl: user.avatarUrl
        }
      })
    }

    return (ctx.body = {
      success: false,
      err: '密码错误'
    })
  }

  @post('logout')
  async logout(ctx, next) {
    ctx.session = null

    ctx.body = {
      success: true
    }
  }
}
