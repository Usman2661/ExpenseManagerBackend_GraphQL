const { gql } = require('apollo-server');

const User = gql`
  type User {
    id: Int!
    name: String!
    email: String!
    userType: String
    jobTitle: String!
    department: String!
    managerId: Int
    companyId: Int
    Expenses: [Expense!]
  }

  extend type Query {
    user(id: Int!): User!
    allUsers: [User!]!
    me: User!
  }

  extend type Mutation {
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
      userType: String
      jobTitle: String!
      department: String!
      managerId: Int
      companyId: Int
    ): User
    deleteUser(id: Int!): DeleteResponse
    login(email: String!, password: String!): LoginResponse!
  }

  type DeleteResponse {
    id: Int
  }

  type LoginResponse {
    token: String
    user: User
  }
`;

module.exports = User;
