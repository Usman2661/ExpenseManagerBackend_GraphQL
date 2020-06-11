const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: Int!
    name: String!
    email: String!
    userType: String
    jobTitle: String!
    department: String!
    managerId: Int
    Expenses: [Expense!]
  }

  type Expense {
    id: Int!
    title: String!
    description: String
    type: String!
    amount: Float!
    status: Boolean!
    recipt: String
    date: String
    user: User
  }

  type Query {
    user(id: Int!): User!
    allUsers: [User!]!
    me: User!
    managerExpenses: managerExpenseResponse!
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
    createExpense(
      title: String!
      description: String!
      type: String!
      amount: Float!
    ): Expense!
    updateUser(
      id: Int!
      name: String!
      email: String!
      userType: String
      jobTitle: String!
      department: String!
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
  type managerExpenseResponse {
    user: User!
    expenses: [Expense]
  }
`;

module.exports = typeDefs;
