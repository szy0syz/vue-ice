const tip = '我的saber酱'
//'点击<a href="https://jerryshi.com">jerryshi</a>'

export default async (ctx, next) => {
  const message = ctx.weixin

  console.log(message)

  ctx.body = tip
}