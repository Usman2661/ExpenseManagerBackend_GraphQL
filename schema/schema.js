const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: Int!
    name: String!
    email: String!
    userType: String
    jobTitle: String!
    department: String!
  }

  type Query {
    user(id: Int!): User!
    allUsers: [User!]!
    me: User!
  }

  type Mutation {
    createUser(
      name: String!
      email: String!
      password: String!
      userType: String
      jobTitle: String!
      department: String!
    ): User!
    updateUser(
      id: Int!
      name: String!
      email: String!
      password: String!
      userType: String
      jobTitle: String!
      department: String!
    ): String
    deleteUser(id: Int!): User
    login(email: String!, password: String!): String
  }
`;

module.exports = typeDefs;
