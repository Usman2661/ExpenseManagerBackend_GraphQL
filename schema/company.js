const { gql } = require('apollo-server');

const company = gql`
  type Company {
    id: Int!
    name: String!
    addressFirstLine: String!
    addressSecondLine: String
    addressThirdLine: String
    postcode: String!
    phone: Int!
    registerDate: String
  }

  extend type Query {
    company(id: Int!): Company!
    allCompanies: [Company!]!
  }

  extend type Mutation {
    createCompany(
      name: String!
      addressFirstLine: String!
      addressSecondLine: String
      addressThirdLine: String
      postcode: String!
      phone: Int!
      registerDate: String
    ): Company!
  }
`;

module.exports = company;
