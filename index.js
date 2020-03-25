const { GraphQLServer } = require('graphql-yoga');

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'FullStack tutorial for GraphQL'
}]

let idCount = links.length;

const resolvers = {
  Query: {
    info: () => `This is the API for a Hackernews Clone`,
    feed: () => links,
    link: (parent, args) => {
      const link = links.find(el => el.id == args.id);
      return link
    } 
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link);
      return link;
    },
    deleteLink: (parent, args) => {
      const link = links.find(el => el.id == args.id);
      const index = links.indexOf(link);
      links.splice(index, 1);
      return link;
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))