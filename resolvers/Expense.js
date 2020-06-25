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
          {
            model: models.ExpenseReceipt,
          },
        ],
      });
      return {
        user: myuser,
        expenses,
      };
    },

    async expense(root, { id }, { models, user }) {
      if (!(await UserPermission(user))) {
        throw new Error('Not Authenticated');
      }
      const myExpense = await models.Expense.findOne({
        where: {
          id,
        },
        include: [
          {
            model: models.User,
            as: 'User',
          },
          {
            model: models.ExpenseReceipt,
          },
        ],
      });
      return myExpense;
    },

    async allExpenses(root, args, { models, user }) {
      if (!(await UserPermission(user))) {
        throw new Error('Not Authenticated');
      }

      const allexpenses = await models.Expense.findAll({
        where: {
          userId: user.id,
        },
        include: [
          {
            model: models.User,
            as: 'User',
          },
          {
            model: models.ExpenseReceipt,
          },
        ],
      });

      return allexpenses;
    },
  },

  Mutation: {
    async createExpense(
      root,
      { title, description, type, amount },
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
        status: 'Pending',
        type,
      });

      return createdExpense;
    },

    async updateExpense(
      root,
      { id, title, description, type, amount, status },
      { models, user }
    ) {
      if (!(await UserPermission(user))) {
        throw new Error('Not Authenticated');
      }

      const updatedExpense = await models.Expense.update(
        {
          title,
          description,
          type,
          amount,
          status,
        },
        {
          where: {
            id,
          },
          returning: true,
          plain: true,
        }
      );

      const myUpdatedExpense = updatedExpense[1].dataValues;

      if (!myUpdatedExpense.id) {
        throw new Error('There was a problem updating user');
      }

      return myUpdatedExpense;
    },
    async deleteExpense(root, { id }, { models, user }) {
      if (!(await UserPermission(user))) {
        throw new Error('Not Authenticated');
      }
      const deletedExpense = await models.Expense.destroy({
        where: {
          id,
          userId: user.id,
        },
        returning: true,
        plain: true,
      });

      if (!deletedExpense) {
        throw new Error('There was an error while deleting expense');
      }
      return {
        id,
      };
    },
  },
};

module.exports = ExpenseResolver;
