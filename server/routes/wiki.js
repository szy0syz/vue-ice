import api from '../api'
import { controller, get } from '../decorator/router'

@controller('/wiki')
export class WechatController {
  // 获取所有家族数据
  @get('/houses')
  async getHouses(ctx, next) {
    let data = await api.wiki.getHouses()

    ctx.body = {
      data,
      success: true
    }
  }

  @get('/houses/:_id')
  async getHouse(ctx, next) {
    const { _id } = ctx.params

    if (!_id) return (ctx.body = { success: false, err: 'id is required' })

    const data = await api.wiki.getHouse(_id)

    ctx.body = {
      data,
      success: true
    }
  }

  // -----------------Characters

  @get('/characters')
  async getCharacters(ctx, next) {
    let {limit = 20} = ctx.query

    const data = await api.wiki.getCharacters(limit)

    ctx.body = {
      data,
      success: true
    }
  }

  @get('/characters/:_id')
  async getCharacter(ctx, next) {
    const { _id } = ctx.params

    if (!_id) return (ctx.body = { success: false, err: 'id is required' })

    const data = await api.wiki.getCharacter(_id)

    ctx.body = {
      data,
      success: true
    }
  }
}
