'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('Expenses', 'status', { transaction: t }),
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          'Expenses',
          'status',
          {
            type: Sequelize.DataTypes.Boolean,
            allowNull: false,
            default: false,
          },
          { transaction: t }
        ),
      ]);
    });
  },
};
