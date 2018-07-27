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

const createProduct = {
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

const updateProduct = {
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

const deleteProduct = {
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

export default {
  createProduct,
  updateProduct,
  deleteProduct
}
