const bcrypt = require('bcryptjs');

const resolvers = {
  Query: {
    async user(root, { id }, { models }) {
      const user = await models.User.findByPk(id);
      return user;
    },
    // async allRecipes(root, args, { models }) {
    //   return models.Recipe.findAll();
    // },
    async allUsers(root, args, { models }) {
      const allUsers = models.User.findAll();
      return allUsers;
    },
    // async recipe(root, { id }, { models }) {
    //   return models.Recipe.findByPk(id);
    // },
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
          password,
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
    // async createRecipe(
    //   root,
    //   { userId, title, ingredients, direction },
    //   { models }
    // ) {
    //   return models.Recipe.create({ userId, title, ingredients, direction });
    // },
  },

  //   User: {
  //     async recipes(user) {
  //       return user.getRecipes();
  //     },
  //   },
  //   Recipe: {
  //     async user(recipe) {
  //       return recipe.getUser();
  //     },
  //   },
};

module.exports = resolvers;
