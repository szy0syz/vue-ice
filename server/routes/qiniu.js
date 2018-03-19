import * as qiniu from '../libs/qiniu'
import { controller, get, post, put } from '../decorator/router'

@controller('/qiniu')
export class QiniuController {
  @get('/token')
  async qiniuToken (ctx, next) {
    let key = ctx.query.key
    let token = qiniu.uptoken(key)

    ctx.body = {
      success: true,
      data: {
        key,
        token
      }
    }
  }
}
