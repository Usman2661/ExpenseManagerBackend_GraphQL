'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Companies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      addressFirstLine: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      addressSecondLine: {
        type: Sequelize.STRING,
      },
      addressThirdLine: {
        type: Sequelize.STRING,
      },
      postcode: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [3, 8],
        },
      },
      registerDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      phone: {
        type: Sequelize.NUMBER,
        allowNull: false,
        validate: {
          len: [6, 15],
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Companies');
  },
};
