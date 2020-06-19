'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Companies', 'name', {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      }),

      queryInterface.changeColumn('Companies', 'phone', {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [6, 15],
        },
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Companies', 'name', {
        type: Sequelize.STRING,
        allowNull: false,
      }),

      queryInterface.changeColumn('Companies', 'phone', {
        type: Sequelize.INT,
        allowNull: false,
        validate: {
          len: [6, 15],
        },
      }),
    ]);
  },
};
