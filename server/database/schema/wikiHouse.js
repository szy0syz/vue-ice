// 管理微信公众号全局票据 Schema

const mongoose = require('mongoose')
const Mixed = mongoose.Schema.Types.Mixed

const TokenSchema = new mongoose.Schema({
  name: String,
  canme: String,
  words: String,
  intro: String,
  cover: String,
  wikiId: Number,
  sections: Mixed,
  swornMembers: [
    {
      character: {
        type: String,
        ref: 'WikiCharacter',
        text: String
      }
    }
  ],
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
TokenSchema.statics = {}

// 获取Token的数据模型
const WikiHouse = mongoose.model('WikiHouse', TokenSchema)
