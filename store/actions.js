import Services from './services'
import axios from 'axios'

export default {
  getWechatSignature({ commit }, url) {
    return Services.getWechatSignature(url)
  },

  getUserByOAuth({ commit }, url) {
    return Services.getUserByOAuth(url)
  },

  async fetchHouses({ state }) {
    const res = await Services.fetchHouses()

    state.houses = res.data.data

    return res
  },

  async fetchCharacters({ state }) {
    const res = await Services.fetchCharacters()

    state.characters = res.data.data

    return res
  },

  async fetchHouse({ state }, _id) {
    if (_id === state.currentHouse._id) return

    const res = await Services.fetchHouse(_id)

    state.currentHouse = res.data.data

    return res
  },

  async fetchCharacter({ state }, _id) {
    if (_id === state.currentCharacter._id) return

    const res = await Services.fetchCharacter(_id)

    state.currentCharacter = res.data.data

    return res
  },

  async fetchProducts({ state }) {
    const res = await Services.fetchProducts()

    state.products = res.data.data

    return res
  },

  async fetchProduct({ state }, _id) {
    if (_id === state.currentProduct._id) return

    const res = await Services.fetchProduct(_id)

    state.currentProduct = res.data.data

    return res
  },

  async fetchUserAndOrders({ state }) {
    const res = await Services.fetchUserAndOrders()

    state.user = res.data.data

    return res
  },

  // 创建宝贝
  async saveProduct({state, dispatch}, product) {
    await axios.post('/api/products', product)

    let res = await dispatch('fapietchProducts')

    return res.data.data
  },

  // 更新宝贝
  async updateProduct({state, dispatch}, product) {
    await axios.put('/api/products', product)

    let res = await dispatch('fetchProducts')

    return res.data.data
  }
}
