import {
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
  GraphQLObjectType
} from 'graphql'

export let ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: {
    _id: {
      type: GraphQLID
    },
    price: {
      type: GraphQLFloat
    },
    title: {
      type: GraphQLString
    },
    intro: {
      type: GraphQLString
    },
    images: {
      type: new GraphQLList(GraphQLString)
    }
  }
})
