// 管理微信公众号全局票据 Schema

const mongoose = require('mongoose')
const Mixed = mongoose.Schema.Types.Mixed

const WikiHouseSchema = new mongoose.Schema({
  name: String,
  cname: String,
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
WikiHouseSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }

  next()
})

// WikiHouseSchema.statics = {}

mongoose.model('WikiHouse', WikiHouseSchema)
