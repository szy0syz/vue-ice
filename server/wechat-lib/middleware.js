// 微信消息中间件
export default function (opts, reply) {
  return async function wechatMiddle(ctx, next) {
    const token = config.wechat.token
    const {
      signature,
      nonce,
      timestamp,
      echostr
    } = ctx.query
    const str = [token, timestamp, nonce].sort().join('')
    const sha = sha1(str)

    if (ctx.method === 'GET') {
      if (sha === signature) {
        ctx.body = echostr
      } else {
        ctx.body = 'Failed'
      }
    } else if (ctx.method === 'POST'){
      if (sha !== signature) {
        ctx.body = 'Failed'
        return false
      }

      //先拿到请求的数据包
      const data = await getRawBody(ctx.req, {
        length: ctx.length,
        limit: '1mb',
        encoding: ctx.charset
      })
      // 解析xml数据包
      const content = await util.parseXML(data)
      const message = util.formatMessage(content)
      // 后续中间件可以访问到这个解析过的对象
      ctx.weixin = message
      // ！让reply在内部执行且在执行时能调用到当前上下文ctx
      await reply.call(ctx, next)

      const replyBody = ctx.body
      const msg = ctx.weixin
      const xml = util.tpl(reply, msg)

      ctx.status = 200
      ctx.type = 'application/xml'
      ctx.body = xml
    }
  }
}