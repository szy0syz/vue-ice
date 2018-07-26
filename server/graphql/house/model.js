import {
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLObjectType
} from 'graphql'

export let WikiHouseType = new GraphQLObjectType({
  name: 'WikiHouse',
  fields: {
    _id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    cname: {
      type: GraphQLString
    },
    words: {
      type: GraphQLString
    },
    intro: {
      type: GraphQLString
    },
    cover: {
      type: GraphQLString
    },
    wikiId: {
      type: GraphQLInt
    },
    sections: {
      type: new GraphQLList(GraphQLString)
    },
    swornMembers: {
      type: new GraphQLList(GraphQLString)
    }
  }
})
