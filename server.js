const express = require('express');
const { merge } = require('lodash');
const port = process.env.PORT || 4000;
const dotenv = require('dotenv');
dotenv.config();
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const UserResolver = require('./resolvers/User');
const ExpenseResolver = require('./resolvers/Expense');
const CompanyResolver = require('./resolvers/company');
const models = require('./models');
var getUser = require('./auth/auth');
const bodyParser = require('body-parser');
const expenseRoutes = require('./routes/expense');

models.sequelize.sync();

const app = express();
app.use(bodyParser.json());

app.use('/api/expense', expenseRoutes);
app.listen(3001, () =>
  console.log(`Express Server started on port localhost:3001`)
);

const server = new ApolloServer({
  typeDefs,
  resolvers: merge(UserResolver, CompanyResolver, ExpenseResolver),
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
  .then(({ url }) => console.log('Apollo Server is running on localhost:4000'));
