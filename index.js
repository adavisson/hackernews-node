const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./src/generated/prisma-client');

const resolvers = {
  Query: {
    info: () => `This is the API for a Hackernews Clone`,
  },
  Mutation: {
    post: (root, args, context) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description,
      })
    },
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma
    }
  },
})
server.start(() => console.log(`Server is running on http://localhost:4000`))