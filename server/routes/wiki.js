import mongoose from 'mongoose'
import { controller, get } from '../decorator/router'

const WikiHouse = mongoose.model('WikiHouse')
// const WikiCharacter = mongoose.model('WikiCharacter')

@controller('/wiki')
export class WechatController {
  // 获取所有家族数据
  @get('/houses')
  async getHouses(ctx, next) {
    let houses = await WikiHouse
      .find({})
      .populate({
        path: 'swornMembers.character',
        select: '_id name cname profile'
      })
      .exec()

    ctx.body = {
      data: houses,
      success: true
    }
  }

  @get('/houses/:_id')
  async getHouse(ctx, next) {
    const { params } = ctx
    const { _id } = params

    if (_id) return (ctx.body = { success: false, err: 'id is required' })

    const house = await WikiHouse.findOne({ _id }).pupulate({
      path: 'swornMembers.character',
      select: '_id name cname nmid'
    })
    .exec()

    ctx.body = {
      data: house,
      success: true
    }
  }
}
