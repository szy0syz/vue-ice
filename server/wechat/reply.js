const tip = '[默认消息]我的saber酱'

export default async (ctx, next) => {
  // 这个message就是微信服务器返回xml转的对象
  const message = ctx.weixin
  let mp = require('./index')
  let client = mp.getWechat()

  console.log('~~~~~~~~~~~')
  console.log('我是微信传来的消息哦~~')
  console.dir(message)
  console.log('~~~~~~~~~~~')
  switch (message.MsgType) {
    case 'text':
      if (message.Content === '1') {
        // let userList = [
        //   {
        //     openid: 'o9ln70pBefkwU2OYo9gfwJCpSf90',
        //     lang: 'zh_CN'
        //   },
        //   {
        //     openid: 'o9ln70h0TgqD-N28g0-o8-VYXSAw',
        //     lang: 'zh_CN'
        //   },
        //   {
        //     openid: 'o9ln70r28EsBvBnp7b3L2zwbtxZ4',
        //     lang: 'zh_CN'
        //   }]
        //const data = await client.handle('updateTag',100, '云南人')
        //const data = await client.handle('createTag', '云南')
        const data = await client.handle('fetchTags')
        //const data = await client.handle('batchTag',['o9ln70r28EsBvBnp7b3L2zwbtxZ4','o9ln70pBefkwU2OYo9gfwJCpSf90'], 2)
        //const data = await client.handle('getTagList','o9ln70r28EsBvBnp7b3L2zwbtxZ4')
      }

      if (message.Content === '2') {
        const menu = require('./menu').default
        await client.handle('createMenu', menu)
      }
      ctx.body = message.Content
      break;
    case 'image':
      ctx.body = {
        type: 'image',
        mediaId: message.MediaId
      }
      break;
    case 'voice':
      ctx.body = {
        type: 'voice',
        mediaId: message.MediaId
      }
      break;
    case 'video':
      ctx.body = {
        title: message.ThumbMediaId,
        type: 'video',
        mediaId: message.MediaId
      }
      break;
    case 'location':
      ctx.body = message.Location_X + ' : ' + message.Location_Y + ' : ' + message.Label
      break;
    case 'link':
      ctx.body = message.Title
      break;
    case 'event':
      switch (message.Event) {
        case 'subscribe':
          ctx.body = '[关注事件]已触发'
          break;
        case 'unsubscribe':
          console.log('[*] 用户取消关注了')
          break;
        case 'LOCATION':
          ctx.body = '[上报地理位置事件]' + message.Latitude + ' : ' + message.Longitude + ' : ' + message.Precision
          break;
        case 'view':
          console.log('[菜单链接跳转事件]')
          ctx.body = message.EventKey + message.MenuId
          break;
        case 'pic_sysphoto':
          console.log('[弹出系统拍照发图的事件]')
          ctx.body = message.Count + 'photos sent.'
          break;
        default:
          ctx.body = '未知事件'
          break;
      }
      break;
    default:
      ctx.body = tip
      break;
  }
}

// message大概长这样
// { 
//   ToUserName: 'gh_7120f440d388',
//   FromUserName: 'o9ln70h0TgqD-N28g0-o8-VYXSAw',
//   CreateTime: '1519305207',
//   MsgType: 'text',
//   Content: '我我我',
//   MsgId: '6525366177125812110' 
// }