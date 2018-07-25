import {
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType
} from 'graphql'

export let ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: {
    _id: {
      type: GraphQLID
    },
    price: {
      type: GraphQLString
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
