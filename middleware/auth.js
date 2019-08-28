export default function({ store, redirect, route }) {
  console.log(store.state.user)
  if (!store.state.user.id) {
    store.state.redirect = route
    return redirect('/')
  }
}
