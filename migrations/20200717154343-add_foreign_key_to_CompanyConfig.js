'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          'CompanyConfigs',
          'companyId',
          {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
              model: 'Companies',
              key: 'id',
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
        queryInterface.removeColumn('CompanyConfigs', 'companyId', {
          transaction: t,
        }),
      ]);
    });
  },
};
