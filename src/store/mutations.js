export default {
  addToCart (state, item) {
    // 判断item是否已经存在于购物车
    const isInCart = state.cart.some(cartItem => cartItem.id === item.id)
    if (isInCart) {
      state.cart = state.cart.map(cartItem => {
        if (cartItem.id === item.id) {
          cartItem.count += 1
        }
        return cartItem
      })
    } else {
      state.cart.push({
        ...item,
        isChecked: false,
        count: 1
      })
    }
  },
  addCartItemCount (state, id) {
    state.cart = state.cart.map(cartItem => {
      if (cartItem.id === id) {
        cartItem.count += 1
      }
      return cartItem
    })
  },
  reduceCartItemCount (state, id) {
    state.cart = state.cart.map(cartItem => {
      if (cartItem.id === id && cartItem.count > 1) {
        cartItem.count -= 1
      }
      return cartItem
    })
  },
  toggleChecked (state, id) {
    state.cart = state.cart.map(cartItem => {
      if (cartItem.id === id) {
        cartItem.isChecked = !cartItem.isChecked
      }
      return cartItem
    })
  },
  changeAllCheck (state, checked) {
    state.cart = state.cart.map(cartItem => {
      cartItem.isChecked = checked
      return cartItem
    })
  },
  changePageTitle (state, title) {
    state.pageTitle = title
  },
  changeLoginStatus (state, loginStatus) {
    state.isLogin = loginStatus
  }
}
