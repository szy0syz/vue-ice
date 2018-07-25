import {
  // GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull
} from 'graphql'

import {
  ProductType
} from './model'

import mongoose from 'mongoose'
const Product = mongoose.model('Product')

const product = {
  type: ProductType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve(root, params, options) {
    return Product.findOne({_id: params.id}).exec()
  }
}

const products = {
  type: new GraphQLList(ProductType),
  args: {}, // 前端传来的参数
  resolve(root, params, options) {
    return Product.find({}).exec()
  }
}

export default {
  product,
  products
}
