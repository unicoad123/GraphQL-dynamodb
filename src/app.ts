import { ApolloServer } from 'apollo-server-lambda';
import { resolvers } from './graphql/resolvers';
import { typeDefs } from './graphql/schema.graphql';

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

export const graphqlHandler = server.createHandler();

