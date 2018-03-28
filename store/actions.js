import Services from './services'
import axios from 'axios'

export default {
  nuxtServerInit({ commit }, { req }) {
    if (req.session && req.session.user) {
      const { email, nickname, avatarUrl } = req.session.user

      const user = {
        email,
        nickname,
        avatarUrl
      }

      console.log(user)

      commit('SET_USER', user)
    }
  },

  async login({ commit }, { email, password }) {
    try {
      let res = await axios.post('/admin/lgon', {
        email,
        password
      })

      const { data } = res
      if (data.success) commit('SET_USER', data.data)

      return data.data
    } catch (err) {
      if (err.response.status === 401) {
        throw new Error('来错地方了')
      }
    }
  },

  async logout({commit}) {
    await axios.post('/admin/logout')

    commit('SET_USER', null)
  },

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
  async saveProduct({ state, dispatch }, product) {
    console.log('我在actions时！！！！')
    console.log(product)
    await axios.post('/api/products', product)

    let res = await dispatch('fetchProducts')
    console.log('我是写入到数据库后返回的数据~~~')
    console.log(res)
    return res.data.data
  },

  // 更新宝贝
  async putProduct({ state, dispatch }, product) {
    console.log(product)
    await axios.put('/api/products', product)

    let res = await dispatch('fetchProducts')
    console.log('~~~~~')
    console.log(res)
    return res.data.data
  },

  // 删除宝贝
  async deleteProduct({ state, dispatch }, product) {
    await axios.delete(`/api/products/${product._id}`)
    let res = await dispatch('fetchProducts')

    return res.data.data
  }
}
