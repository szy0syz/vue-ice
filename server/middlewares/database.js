import fs from 'fs'
import { resolve } from 'path'
import mongoose from 'mongoose'
import config from '../config'
import R from 'ramda'

const models = resolve(__dirname, '../database/schema')

fs.readdirSync(models)
  .filter(file => ~file.search(/\.js$/)) // 只要.js结尾的文件
  .forEach(file => require(resolve(models, file)))

const formateData = R.map(i => {
  i._id = i.umId

  return i
})

let wikiCharacters = require(resolve(__dirname, '../../completeCharacters.json'))
let wikiHouses = require(resolve(__dirname, '../../completeHouses.json'))

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

    const WikiHouse = mongoose.model('WikiHouse')
    const WikiCharacter = mongoose.model('WikiCharacter')

    const existWikiHouses = await WikiHouse.find({}).exec()
    const existWikiCharacters = await WikiCharacter.find({}).exec()

    if (!existWikiHouses.length) WikiHouse.insertMany(wikiHouses)
    if (!existWikiCharacters.length) WikiHouse.insertMany(wikiCharacters)
  })
}
