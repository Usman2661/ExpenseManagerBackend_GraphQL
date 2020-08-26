'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
  // Create an Admin user to setup the expense manager software.

      return queryInterface.bulkInsert('Users', [{
        name: 'Admin',
        email: 'admin@expense.com',
        password: '$2a$10$v31r8PkJLeQkY7OAuqC6LOLZRMiGlLpdNYFY/BdLFY373GXBFn8xC',
        userType: 'Admin',
        jobTitle: 'Admin',
        department: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
