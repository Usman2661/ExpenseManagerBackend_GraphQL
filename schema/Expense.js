const { gql } = require('apollo-server');

const Expense = gql`
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

  extend type Query {
    managerExpenses: managerExpenseResponse!
  }

  extend type Mutation {
    createExpense(
      title: String!
      description: String!
      type: String!
      amount: Float!
    ): Expense!
  }

  type managerExpenseResponse {
    user: User!
    expenses: [Expense]
  }
`;

module.exports = Expense;
