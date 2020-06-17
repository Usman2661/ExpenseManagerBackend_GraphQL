'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn('Expenses', 'recipt')]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Expenses', // table name
        'recipt', // new field name
        {
          type: Sequelize.String,
        }
      ),
    ]);
  },
};
