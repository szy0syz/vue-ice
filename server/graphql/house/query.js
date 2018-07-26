import {
  // GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull
} from 'graphql'

import {
  WikiHouseType
} from './model'

import {
  getHouses,
  getHouse
} from '../../api/wiki'

const house = {
  type: WikiHouseType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve(root, params, options) {
    const data = await getHouse()
    return data
  }
}

const houses = {
  type: new GraphQLList(WikiHouseType),
  args: {}, // 前端传来的参数
  async resolve(root, params, options) {
    const data = await getHouses()
    return data
  }
}

export default {
  house,
  houses
}
