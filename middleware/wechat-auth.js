export default function ({ store, route, redirect }) {
  if (!store.state.authUser) {
    let { fullPath } = route
    console.log(route)
    // 删除第一个字符“/”
    fullPath = encodeURIComponent(fullPath.substr(1))
    console.log('wechat-auth 中间件')
    console.log('fullPath: ', fullPath)
    return redirect(`/wechat-redirect?visit=${fullPath}`)
  }
}
