export default function ({store, redirect}) {
  // 这里只有user.email有值，才表示是网站注册用户。如果是微信客户则没有email  || !store.state.user.email
  if (!store.state.user) {
    return redirect('/admin/login')
  }
}
