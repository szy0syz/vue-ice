import {
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLObjectType
} from 'graphql'

export let WikiCharacterType = new GraphQLObjectType({
  name: 'WikiCharacter',
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
    playedBy: {
      type: GraphQLString
    },
    profile: {
      type: GraphQLString
    },
    allegiances: {
      type: new GraphQLList(GraphQLString)
    },
    images: {
      type: new GraphQLList(GraphQLString)
    },
    nmId: {
      type: GraphQLString
    },
    chId: {
      type: GraphQLString
    },
    sections: {
      type: new GraphQLList(GraphQLString)
    },
    intro: {
      type: new GraphQLList(GraphQLString)
    },
    wikiId: {
      type: GraphQLInt
    }
  }
})
