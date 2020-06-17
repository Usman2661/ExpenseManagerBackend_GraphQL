'use strict';
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define(
    'Company',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
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
      registerDate: {
        type: DataTypes.DATE,
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
    Company.hasMany(models.User, { foreignKey: 'companyId' });
  };
  return Company;
};
