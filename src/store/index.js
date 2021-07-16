import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    cartList:[]
  },
  getters,
  mutations:{
    addCart(state,payload){
      return new Promise((resolve, reject) => {
              // state.cartList.push(payload)
      let oldProduct = state.cartList.find(item => item.iid === payload.iid)

      if(oldProduct){
        oldProduct.count += 1
        resolve('当前商品数量+1')
      }else {
        payload.count = 1
        state.cartList.push(payload)
        resolve('添加了新的商品')
      }
      })
    }
  }
})


export default store