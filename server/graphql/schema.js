import {
  GraphQLObjectType,
  GraphQLSchema
} from 'graphql'

import ProducQueries from './product/query'
import WikiHouseQueries from './house/query'
import WikicharacterQueries from './character/query'

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Queries',
    fields: Object.assign(
      WikicharacterQueries,
      WikiHouseQueries,
      ProducQueries
    )
  })
})
