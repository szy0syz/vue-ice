import { controller, get, post, required } from '../decorator/router'
// import config from '../config'

import { getUserAsync, loginAsync } from '../controllers/user'

import { openidAndSessionKey } from '../wechat-lib/mina'

@controller('/mina')
export class MinaController {
  @get('/codeAndSessionKey')
  @required({ query: ['code'] })
  async getCodeAndSessionKey(ctx, next) {
    const { code } = ctx.query
    let res = await openidAndSessionKey(code)

    ctx.body = {
      success: true,
      data: res
    }
  }

  @post('/login')
  @required({ body: ['code', 'avatarUrl', 'nickName'] })
  async login(ctx, next) {
    await loginAsync(ctx, next)
  }

  @get('/user')
  @required({ query: ['code', 'avatarUrl', 'nickName'] })
  async user(ctx, next) {
    // 业务控制权交出去
    await getUserAsync(ctx, next)
  }
}
