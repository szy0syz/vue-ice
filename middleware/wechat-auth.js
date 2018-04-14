export default function ({ store, route, redirect }) {
  if (!store.state.authUser) {
    let { fullPath } = route

    // 删除第一个字符“/”
    fullPath = encodeURIComponent(fullPath.substr(1))

    return redirect(`/wechat-redirect?visit=${fullPath}`)
  }
}
