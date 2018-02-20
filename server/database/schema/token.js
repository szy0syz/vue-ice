// 管理微信公众号全局票据 Schema

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TokenSchema = new mongoose.Schema({
  name: String, // 票据名称
  token: String,
  expires_in: Number,
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
})

// mongoose的一个中间件，每次往数据库写入前执行这个中间件
TokenSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }

  next()
})

// token票据的静态方法，静态方法可以拿到model后直接调用，它属于整个类的~
TokenSchema.statics = {
  async getAccessToken() {
    const token = await this.findOne({
      name: 'access_token'
    }).exec()

    if (token && token.token) {
      token.access_token = token.token // 对外提供统一的数据对象
    }

    return token
  },
  async saveAccessToken(data) {
    let token = await this.findOne({
      name: 'access_token'
    }).exec()
    if (token) {
      token.token = data.access_token
      token.expires_in = data.expires_in
    } else {
      token = new Token({
        name: 'access_token',
        token: data.access_token,
        expires_in: data.expires_in
      })
    }

    await token.save()

    return data
  }
}

// 获取Token的数据模型
const Token = mongoose.model('Token', TokenSchema)