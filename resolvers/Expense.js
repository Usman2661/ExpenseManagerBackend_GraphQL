var ManagerSeniorManagementPermission = require('../auth/ManagerAndSeniorManagementPermission');
var UserPermission = require('../auth/UserPermission');

const ExpenseResolver = {
  Query: {
    async managerExpenses(root, args, { models, user }) {
      if (!(await ManagerSeniorManagementPermission(user))) {
        throw new Error('Not Authenticated');
      }

      const myuser = await models.User.findByPk(user.id);

      const expenses = await models.Expense.findAll({
        include: [
          {
            model: models.User,
            as: 'User',
            where: {
              managerId: user.id,
            },
          },
        ],
      });
      return {
        user: myuser,
        expenses,
      };
    },
  },

  Mutation: {
    async createExpense(
      root,
      { title, description, type, status, amount },
      { models, user }
    ) {
      if (!(await UserPermission(user))) {
        throw new Error('Not Authenticated');
      }

      const createdExpense = await models.Expense.create({
        userId: user.id,
        title,
        description,
        amount,
        status,
        type,
      });

      return createdExpense;
    },
  },
};

module.exports = ExpenseResolver;
