import {
  GraphQLObjectType,
  GraphQLSchema
} from 'graphql'

import ProductQueries from './product/query'
import ProductMutations from './product/mutation'

import WikiHouseQueries from './house/query'
import WikicharacterQueries from './character/query'

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Queries',
    fields: Object.assign(
      WikicharacterQueries,
      WikiHouseQueries,
      ProductQueries
    )
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutations',
    fields: Object.assign(
      ProductMutations
    )
  })
})
