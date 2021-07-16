const getters = {
  cartList(state) {
    return state.cartList
  },
  // cartLength(state) {
  //   return getters.cartList.length
  // }
    cartCount(state) {
    return getters.cartList.length
  }
}

export default getters
