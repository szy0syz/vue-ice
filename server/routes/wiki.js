import mongoose from 'mongoose'
import { controller, get } from '../decorator/router'

const WikiHouse = mongoose.model('WikiHouse')
const WikiCharacter = mongoose.model('WikiCharacter')

@controller('/wiki')
export class WechatController {
  // 获取所有家族数据
  @get('/houses')
  async getHouses(ctx, next) {
    let data = await WikiHouse
      .find({})
      .populate({
        path: 'swornMembers.character',
        select: '_id name cname profile'
      })
      .exec()

    ctx.body = {
      data,
      success: true
    }
  }

  @get('/houses/:_id')
  async getHouse(ctx, next) {
    const { _id } = ctx.params
    console.log(ctx.params)
    if (!_id) return (ctx.body = { success: false, err: 'id is required' })

    const data = await WikiHouse.findOne({ _id }).populate({
      path: 'swornMembers.character',
      select: '_id name cname nmid'
    })
    .exec()

    ctx.body = {
      data,
      success: true
    }
  }

  // -----------------Characters

  @get('/characters')
  async getCharacters(ctx, next) {
    let {limit = 20} = ctx.query

    const data = await WikiCharacter
      .find({})
      .limit(Number(limit))
      .exec()

    ctx.body = {
      data,
      success: true
    }
  }

  @get('/characters/:_id')
  async getCharacter(ctx, next) {
    const { _id } = ctx.params

    if (!_id) return (ctx.body = { success: false, err: 'id is required' })

    const data = await WikiCharacter.findOne({ _id }).exec()

    ctx.body = {
      data,
      success: true
    }
  }
}
