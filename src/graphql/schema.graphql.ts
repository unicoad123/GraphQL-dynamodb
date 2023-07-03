import { gql } from 'graphql-tag';

export const typeDefs = gql`
type User {
  id: ID!
  name:String!
  email: String!
  password:String!
}

type Token {
  token: String!
}

type Query {
  users: [User]
}

type Mutation {
  register(name:String!,email: String!, password: String!): User
  login(email: String!, password: String!): Token
}

schema {
  query: Query
  mutation: Mutation
}
`;
