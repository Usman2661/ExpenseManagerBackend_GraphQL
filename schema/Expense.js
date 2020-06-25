const { gql } = require('apollo-server');

const Expense = gql`
  type Expense {
    id: Int!
    title: String!
    description: String
    type: String!
    amount: Float!
    status: String!
    date: String
    User: User
    ExpenseReceipts: [ExpenseReceipt]
  }

  type ExpenseReceipt {
    id: Int!
    expenseId: Int!
    receipt: String!
  }

  extend type Query {
    managerExpenses: managerExpenseResponse!
    allExpenses: [Expense!]!
    expense(id: Int!): Expense!
  }

  extend type Mutation {
    createExpense(
      title: String!
      description: String
      type: String!
      amount: Float!
    ): Expense!
    updateExpense(
      id: Int!
      title: String!
      description: String
      status: String
      type: String!
      amount: Float!
    ): Expense
    deleteExpense(id: Int!): DeleteResponse
  }

  type managerExpenseResponse {
    user: User!
    expenses: [Expense]
  }
`;

module.exports = Expense;
