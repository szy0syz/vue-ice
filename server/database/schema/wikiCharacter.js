// 管理微信公众号全局票据 Schema

const mongoose = require('mongoose')
const Mixed = mongoose.Schema.Types.Mixed

const WikicharacterSchema = new mongoose.Schema({
  _id: String, // ref
  wikiId: Number,
  name: String,
  canme: String,
  playBy: String,
  profile: String,
  images: [String],
  umId: String,
  chId: String,
  sections: Mixed,
  intro: String,
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
WikicharacterSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }

  next()
})

// WikiHouseSchema.statics = {}

mongoose.model('Wikicharacter', WikicharacterSchema)
