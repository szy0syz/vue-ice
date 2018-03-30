export default function ({sotre, redirect}) {
  if (!store.state.user || !sotre.state.user.email) {
    return redirect('/admin/login')
  }
}