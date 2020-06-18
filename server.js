const express = require('express');
const port = process.env.PORT || 4000;
const dotenv = require('dotenv');
dotenv.config();
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers/resolvers');
const models = require('./models');
var getUser = require('./auth/auth');

models.sequelize.sync();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const tokenWithBearer = req.headers.authorization || '';
    const token = tokenWithBearer.split(' ')[1];
    const user = getUser(token);
    return {
      models,
      user,
    };
  },
});

server
  .listen()
  .then(({ url }) => console.log('Server is running on localhost:4000'));
