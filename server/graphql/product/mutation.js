import {
  // GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
  GraphQLNonNull
} from 'graphql'

import {
  ProductType
} from './model'

import mongoose from 'mongoose'
const Product = mongoose.model('Product')

import { 
  save as create,
  update as update,
  del as remove
} from '../../api/product'

const createProduct = {
  type: ProductType,
  description: '创建一个新商品',
  args: {
    price: { type: new GraphQLNonNull(GraphQLFloat) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    intro: { type: GraphQLString },
  },
  resolve(root, params, options) {
    return create(params)
  }
}

const updateProduct = {
  type: ProductType,
  description: '更新商品',
  args: {
    _id: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: GraphQLFloat },
    title: { type: GraphQLString },
    intro: { type: GraphQLString },
  },
  resolve(root, params, options) {
    return update(params)
  }
}

const deleteProduct = {
  type: ProductType,
  args: {
    _id: {type: new GraphQLNonNull(GraphQLString)}
  },
  resolve(root, params, options) {
    return remove(params.id)
  }
}

export default {
  createProduct,
  updateProduct,
  deleteProduct
}
