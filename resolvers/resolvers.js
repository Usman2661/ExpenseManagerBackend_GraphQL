const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config();

const resolvers = {
  Query: {
    async user(root, { id }, { models }) {
      const user = await models.User.findByPk(id);
      return user;
    },

    async allUsers(root, args, { models, user }) {
      if (user.userType !== 'SeniorManagement') {
        throw new Error('Not Authenticated');
      }

      const allUsers = await models.User.findAll();
      return allUsers;
    },

    async me(root, args, { models, user }) {
      if (!user) {
        throw new Error('Not Authenticated');
      }

      const myUser = await models.User.findByPk(user.id, {
        include: [
          {
            model: models.Expense,
            as: 'Expenses',
          },
        ],
      });

      return myUser;
    },

    async managerExpenses(root, args, { models, user }) {
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
    async createUser(
      root,
      { name, email, password, userType, jobTitle, department },
      { models }
    ) {
      const createdUser = await models.User.create({
        name,
        email,
        password: await bcrypt.hash(password, 10),
        userType,
        jobTitle,
        department,
      });

      return createdUser;
    },

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
    async deleteUser(root, { id }, { models, user }) {
      if (user.userType !== 'SeniorManagement') {
        throw new Error('Not Authenticated');
      }
      const deletedUser = await models.User.destroy({
        where: {
          id,
        },
        returning: true,
        plain: true,
      });

      if (!deletedUser) {
        throw new Error('There was an error while deleting user');
      }

      return {
        id,
      };
    },

    async updateUser(
      root,
      { id, name, email, userType, jobTitle, department, managerId },
      { models, user }
    ) {
      if (user.userType !== 'SeniorManagement') {
        throw new Error('Not Authenticated');
      }

      const updatedUser = await models.User.update(
        {
          name,
          email,
          userType,
          jobTitle,
          department,
          managerId,
        },
        {
          where: {
            id,
          },
          returning: true,
          plain: true,
        }
      );

      const myUpdatedUser = updatedUser[1].dataValues;

      if (!myUpdatedUser.id) {
        throw new Error('There was a problem updating user');
      }

      return myUpdatedUser;
    },

    async login(root, { email, password }, { models }) {
      const user = await models.User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        throw new Error('Invalid Credentials');
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        throw new Error('Invalid Credentials');
      }

      if (!user.userType) {
        throw new Error('Your account is pending approval');
      }
      if (!user.managerId) {
        throw new Error('Your account is pending approval');
      }

      const token = jsonwebtoken.sign(
        {
          id: user.id,
          email: user.email,
          userType: user.userType,
          managerId: user.managerId,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      return {
        token,
        user,
      };
    },
  },
};

module.exports = resolvers;
