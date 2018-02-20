import fs from 'fs'
import { resolve } from 'path'
import mongoose from 'mongoose'
import config from "../config"

const models = resolve(__dirname, '../database/schema')
console.log(models)
fs.readdirSync(models)
  .filter(file => ~file.search(/\.js$/)) // 只要.js结尾的文件
  .forEach(file => require(resolve(models, file)))

export const database = app => {
  mongoose.set('debug', true) // 开发环境打印详细日志

  mongoose.connect(config.db)

  mongoose.connection.on('disconnected', () => {
    mongoose.connect(config.db)
  })

  mongoose.connection.on('error', err => {
    console.error(err)
  })

  mongoose.connection.on('open', async => {
    console.log('Connected to MongoDB ', config.db)
  })
}