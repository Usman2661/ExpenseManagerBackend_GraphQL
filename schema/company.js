const { gql } = require('apollo-server');

const company = gql`
  type Company {
    id: Int!
    name: String!
    addressFirstLine: String!
    addressSecondLine: String
    addressThirdLine: String
    postcode: String!
    phone: String!
    businessArea: String!
    registerYear: Int!
    CompanyConfig: CompanyConfig
  }

  type CompanyConfig {
    id: Int!
    logo: String
    appBarColor: String
    companyId: Int
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
      phone: String!
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
      phone: String!
      businessArea: String!
      registerYear: Int!
    ): Company
    deleteCompany(id: Int!): DeleteResponse

    createCompanyConfig(logo: String, appBarColor: String): CompanyConfig
    updateCompanyConfig(
      id: Int!
      logo: String
      appBarColor: String
    ): CompanyConfig
  }
`;

module.exports = company;
