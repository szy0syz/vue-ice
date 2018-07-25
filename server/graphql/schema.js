import {
  GraphQLObjectType,
  GraphQLSchema
} from 'graphql'

import ProducQueries from './product/query'

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Queries',
    fields: Object.assign(ProducQueries)
  })
})
