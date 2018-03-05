import Services from './services'

export default {
  getWechatSignature({ commit }, url) {
    return Services.getWechatSignature(url)
  },

  getUserByOAuth({ commit }, url) {
    return Services.getUserByOAuth(url)
  },

  async fetchHouses({ state }) {
    const res = await Services.fetchHouses()
    console.log('~~~data:', res.data.data)
    state.house = res.data.data

    return res
  },

  async fetchCharacters({ state }) {
    const res = await Services.fetchCharacters()

    state.house = res.data.data

    return res
  },

  async fetchCities({ state }) {
    const res = await Services.fetchCities()

    state.house = res.data.data

    return res
  }
}
