'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('Companies', 'registerDate', {
          transaction: t,
        }),
        queryInterface.addColumn(
          'Companies',
          'businessArea',
          {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          'Companies',
          'registerYear',
          {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            validate: {
              len: [3, 4],
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
        queryInterface.removeColumn('Companies', 'registerYear', {
          transaction: t,
        }),
        queryInterface.removeColumn('Companies', 'businessArea', {
          transaction: t,
        }),
        queryInterface.addColumn(
          'Companies',
          'registerDate',
          {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
          },
          { transaction: t }
        ),
      ]);
    });
  },
};
