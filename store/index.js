import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

const createStore = () => {
  return new Vuex.Store({
    state: {
      user: null,
      houses: [],
      products: [],
      authUser: null,
      characters: [],
      payments: [],
      currentHouse: {},
      currentProduct: [],
      currentCharacter: {},
      imageCDN: 'https://fireice.iblack7.com/'
    },
    getters,
    actions,
    mutations
  })
}

export default createStore
