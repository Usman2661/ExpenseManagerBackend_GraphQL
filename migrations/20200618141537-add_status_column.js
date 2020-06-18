'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          'Expenses',
          'status',
          {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            default: 'Pending',
            validate: {
              isIn: [['Pending', 'Approved', 'Rejected']],
            },
          },
          { transaction: t }
        ),
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('Expenses', 'status', { transaction: t }),
      ]);
    });
  },
};
