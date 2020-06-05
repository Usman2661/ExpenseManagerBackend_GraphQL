const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config();

const resolvers = {
  Query: {
    async user(root, { id }, { models }) {
      const user = await models.User.findByPk(id);
      return user;
    },

    async allUsers(root, args, { models }) {
      const allUsers = models.User.findAll();
      return allUsers;
    },

    async me(root, args, { models, user }) {
      if (!user) {
        throw new Error('Not Authenticated');
      }
      const myuser = await models.User.findByPk(user.id);
      return myuser;
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
    async deleteUser(root, { id }, { models }) {
      const deletedUser = await models.User.destroy({
        where: {
          id,
        },
      });

      return deletedUser;
    },

    async updateUser(
      root,
      { id, name, email, password, userType, jobTitle, department },
      { models }
    ) {
      const updatedUser = await models.User.update(
        {
          name,
          email,
          password: await bcrypt.hash(password, 10),
          userType,
          jobTitle,
          department,
        },
        {
          where: {
            id,
          },
        }
      );

      return updatedUser;
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

      const token = jsonwebtoken.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      return token;
    },
  },
};

module.exports = resolvers;
