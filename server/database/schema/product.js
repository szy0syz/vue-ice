const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const Mixed = Schema.Types.Mixed

const ProductSchema = new Schema({
  price: Number,
  title: String,
  intro: String,
  images: [ String ],
  parameters: [
    {
      key: String,
      value: String
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

mongoose.model('Product', ProductSchema)
