import Router from 'koa-router'
import config from '../config'
import reply from '../wechat/reply'
import wechatMiddle from '../wechat-lib/middleware'
import { signature, redirect, oauth } from '../controllers/wechat'
import { resolve } from 'path'

export const router = app => {
  const router = new Router()
  // 加载这个文件就会执行文件中那堆代码，进而new实例，就会执行getAccessToken()方法，再来就会获取token
  // require('../wechat') // 不能太早加载代码
  // 竟然说是暂时不需要！

  // opts 存微信公众号的key、id等，reply回复策略
  router.all('/wechat-hear', wechatMiddle(config.wechat, reply))

  router.get('/wechat-signature', signature)
  router.get('/wechat-redirect', redirect)
  router.get('/wechat-oauth', oauth)
  // http://jerrys.free.ngrok.cc/wechat-redirect?a=111&b=222
  router.get('/upload', async (ctx, next) => {
    let mp = require('../wechat', signature)
    let client = mp.getWechat()
    // 测试临时视频
    // await client.handle('uploadMaterial', 'video', resolve(__dirname,'../../ice.mp4'))
    // 测试永久视频
    // await client.handle('uploadMaterial', 'video', resolve(__dirname,'../../ice.mp4'), {type: 'video', description:'{"type":"视频标题111", "introduction":"视频描述222"}'})
    // 测试永久图片素材
    // await client.handle('uploadMaterial', 'image', resolve(__dirname,'../../saber.jpeg'), {type: 'image'})
    // 测试临时图片素材
    // await client.handle('uploadMaterial', 'image', resolve(__dirname,'../../saber.jpeg'))
    const data = await client.handle(
      'uploadMaterial',
      'image',
      resolve(__dirname, '../../saber.jpeg'),
      { type: 'image' }
    )
    console.log(data)
  })

  app.use(router.routes()).use(router.allowedMethods())
}
