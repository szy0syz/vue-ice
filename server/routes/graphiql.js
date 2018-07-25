import { controller, post, get } from '../decorator/router'
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa'
import schema from '../graphql/schema'

@controller('')
export class GraphqlController {
  @post('/graphql')
  async postGraphql(ctx, next) {
    await graphqlKoa({
      schema: schema
    })(ctx, next)
  }

  @get('/graphql')
  async getGraphql(ctx, next) {
    await graphqlKoa({
      schema: schema
    })(ctx, next)
  }

  @get('/graphiql')
  async getGraphqlKoa(ctx, next) {
    await graphiqlKoa({
      endpointURL: '/graphql'
    })(ctx, next)
  }
}
