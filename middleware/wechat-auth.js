export default function ({ store, route, redirect }) {
  console.log('中间件~~~~~~authUser', store.state.authUser)
  if (!store.state.authUser) {
    let { fullPath } = route
    console.log(route)
    // 删除第一个字符“/”
    fullPath = encodeURIComponent(fullPath.substr(1))
    console.log('wechat-auth 中间件fullPath:', fullPath)
    return redirect(`/wechat-redirect?visit=${fullPath}`)
  }
}
