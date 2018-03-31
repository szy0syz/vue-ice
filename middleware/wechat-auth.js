export default function ({ store, route, redirect }) {
  if (!store.state.authUser) {
    let {fullPath} = route

    fullPath = encodeURIComponent(fullPath.substr(1))
    console.log('wechat-auth 中间件')
    console.log(fullPath)
    return redirect(`/wechat-redirect?visit=${fullPath}`)
  }
}
