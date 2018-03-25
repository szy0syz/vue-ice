import mongoose from 'mongoose'

const Product = mongoose.model('Product')

export async function getProducts(limit = 50) {
  const data = await Product.find({})
    .limit(Number(limit))
    .exec()

  return data
}

export async function getProduct(_id) {
  const data = await Product.findOne({ _id }).exec()

  return data
}

export async function save(product) {
  console.log('我在api~~保存宝贝前%%%%%')
  console.log(product)
  product = new Product(product)
  product = await product.save()
  console.log('我在api~~保存宝贝后%%%%%')
  console.log(product)
  return product
}

export async function update(product) {
  product = await product.save()

  return product
}

export async function del(_id) {
  await Product.remove({_id})

  return true
}
