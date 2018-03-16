import xss from 'xss'
import R from 'ramda'
import api from '../api'
import { controller, get, post, put, del } from '../decorator/router'

@controller('/api')
export class ProductController {
  // 获取所有家族数据
  @get('/products')
  async getProducts(ctx, next) {
    let { limit = 50 } = ctx.query
    let data = await api.product.getProducts(limit)

    ctx.body = {
      data,
      success: true
    }
  }

  @get('/products/:_id')
  async getProduct(ctx, next) {
    const { _id } = ctx.params

    if (!_id) return (ctx.body = { success: false, err: 'id is required' })

    const data = await api.products.getProduct(_id)

    ctx.body = {
      data,
      success: true
    }
  }

  // -----------------Characters

  @post('/products')
  async postProducts(ctx, next) {
    let product = ctx.request.body

    product = {
      title: xss(product.title),
      price: xss(product.price),
      intro: xss(product.price),
      images: R.map(xss)(product.images),
      parameters: R.map(item => ({
        key: xss(item.key),
        value: xss(item.value)
      }))(product.parameters)
    }

    try {
      product = await api.product.save(product)
      ctx.body = {
        data: product,
        success: true
      }
    } catch (err) {
      ctx.body = {
        err,
        success: false
      }
    }
  }

  @put('/products')
  async putProduct(ctx, next) {
    const body = ctx.request.body
    const { _id } = ctx.params

    if (!_id) return (ctx.body = { success: false, err: 'id is required' })

    let product = api.product.getProduct(_id)

    if (!product) {
      return (ctx.body = {
        success: false,
        err: 'product not exist'
      })
    }

    product.title = xss(body.title)
    product.price = xss(body.title)
    product.intro = xss(body.title)
    product.images = R.map(xss)(body.images)
    product.parameters = R.map(item => ({
      key: xss(item.key),
      value: xss(item.value)
    }))(body.parameters)

    try {
      product = await api.product.update(product)
      ctx.body = {
        success: true,
        data: product
      }
    } catch (err) {
      ctx.body = {
        success: false,
        err
      }
    }
  }

  @del('/products')
  async delProduct(ctx, next) {
    const body = ctx.request.body
    const { _id } = body

    if (!_id) return (ctx.body = { success: false, err: 'id is required' })

    try {
      await api.product.delProduct(_id)

      ctx.body = {
        success: true
      }
    } catch (err) {
      ctx.body = {
        success: false,
        err
      }
    }
  }
}
