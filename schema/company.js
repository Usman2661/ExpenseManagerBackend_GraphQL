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
    businessArea: String!
    registerYear: Int!
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
      businessArea: String!
      registerYear: Int!
    ): Company!
    updateCompany(
      id: Int!
      name: String!
      addressFirstLine: String!
      addressSecondLine: String
      addressThirdLine: String
      postcode: String!
      phone: Int!
      businessArea: String!
      registerYear: Int!
    ): Company
    deleteCompany(id: Int!): DeleteResponse
  }
`;

module.exports = company;
