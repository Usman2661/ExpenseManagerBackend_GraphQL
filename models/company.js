'use strict';
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define(
    'Company',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      addressFirstLine: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      addressSecondLine: {
        type: DataTypes.STRING,
      },
      addressThirdLine: {
        type: DataTypes.STRING,
      },
      postcode: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 8],
        },
      },
      registerYear: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          len: [3, 4],
        },
      },
      businessArea: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          len: [6, 15],
        },
      },
    },
    {}
  );
  Company.associate = function (models) {
    Company.hasMany(models.User, {
      foreignKey: 'companyId',
      onDelete: 'CASCADE',
      hooks: true,
    });
  };
  return Company;
};
