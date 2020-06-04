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

  # type Recipe {
  #   id: Int!
  #   title: String!
  #   ingredients: String!
  #   direction: String!
  #   user: User!
  # }

  type Query {
    user(id: Int!): User!
    allUsers: [User!]!
    # allRecipes: [Recipe!]!

    # recipe(id: Int!): Recipe
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
    ): User!
    deleteUser(id: Int!): User
    login(email: String!, password: String!): String

    # createRecipe(
    #   userId: Int!
    #   title: String!
    #   ingredients: String!
    #   direction: String!
    # ): Recipe!
  }
`;

module.exports = typeDefs;
