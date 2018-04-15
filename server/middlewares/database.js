import fs from 'fs'
import { resolve } from 'path'
import mongoose from 'mongoose'
import config from '../config'
import R from 'ramda'

// loading mogoose "meta" plugins
mongoose.plugin(require('../database/plugins/meta'))

const models = resolve(__dirname, '../database/schema')

fs
  .readdirSync(models)
  .filter(file => ~file.search(/\.js$/)) // 只要.js结尾的文件
  .forEach(file => require(resolve(models, file)))

const formateData = R.map(i => {
  i._id = i.nmId

  return i
})

let wikiCharacters = require(resolve(
  __dirname,
  '../database/json/wikiCharacters.json'
))
let wikiHouses = require(resolve(__dirname, '../database/json/wikiHouses.json'))

wikiCharacters = formateData(wikiCharacters)

export const database = app => {
  mongoose.set('debug', true) // 开发环境打印详细日志

  mongoose.connect(config.db)

  mongoose.connection.on('disconnected', () => {
    mongoose.connect(config.db)
  })

  mongoose.connection.on('error', err => {
    console.error(err)
  })

  mongoose.connection.on('open', async () => {
    console.log('Connected to MongoDB ', config.db)

    const User = mongoose.model('User')
    const WikiHouse = mongoose.model('WikiHouse')
    const WikiCharacter = mongoose.model('WikiCharacter')

    const existWikiHouses = await WikiHouse.find({}, { _id: 1 }).exec()
    const existWikiCharacters = await WikiCharacter.find({}, { _id: 1 }).exec()

    if (!existWikiHouses.length) WikiHouse.insertMany(wikiHouses)
    if (!existWikiCharacters.length) WikiCharacter.insertMany(wikiCharacters)

    let user = await User.findOne({
      email: 'szy0syz@gmail.com'
    }).exec()

    if (!user) {
      console.log('写入初始化管理员数据')
      user = new User({
        email: 'szy0syz@gmail.com',
        password: 'admin888',
        role: 'admin'
      })
    }

    await user.save()
  })
}
