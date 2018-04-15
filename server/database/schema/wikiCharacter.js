// 管理微信公众号全局票据 Schema

const mongoose = require('mongoose')
const Mixed = mongoose.Schema.Types.Mixed

const WikicharacterSchema = new mongoose.Schema({
  _id: String, // 这里本该ObjectId的，但我们手动指定String，在database倒数数据时手动绑定了nmId给它！
  name: String,
  cname: String,
  playedBy: String,
  profile: String,
  allegiances: [
    String
  ],
  images: [
    String
  ],
  nmId: String,
  chId: String,
  sections: Mixed,
  intro: [
    String
  ],
  wikiId: Number,
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
// WikicharacterSchema.pre('save', function (next) {
//   if (this.isNew) {
//     this.meta.createdAt = this.meta.updatedAt = Date.now()
//   } else {
//     this.meta.updatedAt = Date.now()
//   }

//   next()
// })

// WikiHouseSchema.statics = {}

mongoose.model('WikiCharacter', WikicharacterSchema)
