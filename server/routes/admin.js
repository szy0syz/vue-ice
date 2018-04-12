import api from '../api'
import { controller, post, required, get } from '../decorator/router'
import mongoose from 'mongoose'
const Payment = mongoose.model('Payment')

@controller('/admin')
export class AdminController {
  @post('/login')
  @required({ body: ['email', 'password'] })
  async getHouses(ctx, next) {
    const { email, password } = ctx.request.body
    const data = await api.admin.login(email, password)
    const { match, user } = data

    if (match) {
      if (user.role !== 'admin') {
        return (ctx.body = {
          success: false,
          err: '权限错误/来错地方'
        })
      }

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

  @get('payments')
  async getPayments(ctx, next) {
    const res = await Payment.find({}).populate('product user').exec()

    ctx.body = {
      success: true,
      data: res
    }
  }
}
