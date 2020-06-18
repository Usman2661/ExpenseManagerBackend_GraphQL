const ExpenseResolver = {
  Query: {
    async managerExpenses(root, args, { models, user }) {
      if (!user) {
        throw new Error('Not Authenticated');
      }
      if (user.userType !== 'SeniorManagement' && user.userType !== 'Manager') {
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
      if (!user) {
        throw new Error('Not Authenticated');
      }
      const createdExpense = await models.Expense.create({
        userId: user.id,
        title,
        description,
        amount,
        type,
      });

      return createdExpense;
    },
  },
};

module.exports = ExpenseResolver;
