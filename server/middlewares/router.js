import Router from 'koa-router'
import sha1 from 'sha1'
import config from '../config'

export const router = app => {
  const router = new Router()
  // 加载这个文件就会执行文件中那堆代码，进而new实例，就会执行getAccessToken()方法，再来就会获取token
  //require('../wechat') // 不能太早加载代码
  // 竟然说是暂时不需要！

  // opts 存微信公众号的key、id等，reply回复策略
  router.all('/wechat-hear', wechatMiddle(opts, reply))

  app
    .use(router.routes())
    .use(router.allowedMethods())
}