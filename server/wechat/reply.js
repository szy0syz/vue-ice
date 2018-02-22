const tip = '[默认消息]我的saber酱'

export default async (ctx, next) => {
  // 这个message就是微信服务器返回xml转的对象
  const message = ctx.weixin

  console.log('~~~~~~~~~~~')
  console.log('我是微信传来的消息哦~~')
  console.dir(message)
  console.log('~~~~~~~~~~~')
  switch (message.MsgType) {
    case 'text':
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
          ctx.body = '[关注事件]'
          break;
        case 'unsubscribe':
          console.log('[*] 用户取消关注了')
          break;
        case 'LOCATION':
          ctx.body = '[上报地理位置事件]' + message.Latitude + ' : ' + message.Longitude + ' : ' + message.Precision
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