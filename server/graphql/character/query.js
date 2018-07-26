import {
  // GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull
} from 'graphql'

import {
  WikiCharacterType
} from './model'

import {
  getCharacter,
  getCharacters
} from '../../api/wiki'

const character = {
  type: WikiCharacterType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve(root, params, options) {
    const data = await getCharacter(params.id)
    return data
  }
}

const characters = {
  type: new GraphQLList(WikiCharacterType),
  args: {}, // 前端传来的参数
  async resolve(root, params, options) {
    const data = await getCharacters()
    return data
  }
}

export default {
  character,
  characters
}
