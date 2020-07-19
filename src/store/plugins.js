const syncStorage = store => {
  // 当 store 初始化后调用
  store.subscribe((mutation, state) => {
    // 每次 mutation 之后调用
    // mutation 的格式为 { type, payload }
    window.localStorage.setItem('rzg-cart', JSON.stringify(state.cart))
  })
}

export default [syncStorage]
