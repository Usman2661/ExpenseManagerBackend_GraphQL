const company = require('./company');
const User = require('./User');
const root = require('./root');
const Expense = require('./Expense');

const schemaArray = [root, company, User, Expense];

module.exports = schemaArray;
