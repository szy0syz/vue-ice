import { controller, get, post, required } from '../decorator/router'
// import config from '../config'
import User from '../database/schema/user'
import { openidAndSessionKey } from '../wechat-lib/mina'

@controller('/mina')
export class MinaController {
  @post('/login')
  @required({body: ['code', 'avatarUrl', 'nickName']})
  async wechatHear(ctx, next) {
    const { code, avatarUrl, nickName } = ctx.request.body

    try {
      const {openid, unionid} = await openidAndSessionKey(code)

      let user = await User.findOne({
        unionid
      }).exec()

      if (!user) {
        user = new User({
          openid: [openid],
          nickname: nickName,
          unionid,
          avatarUrl
        })

        user = await user.save()
      } else {
        user.avatarUrl = avatarUrl
        user.nickname = nickName
        user = await user.save()
      }

      ctx.body = {
        success: true,
        data: {
          nickname: nickName,
          avatarUrl: avatarUrl
        }
      }
    } catch (err) {
      ctx.body = {
        success: false,
        err
      }
    }
  }
}
