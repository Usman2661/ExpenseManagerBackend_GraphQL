'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      userType: {
        allowNull: true,
        type: DataTypes.STRING,
        validate: {
          isIn: [['Staff', 'Manager', 'SeniorManagement', 'Admin']],
        },
      },
      jobTitle: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      department: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      managerId: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
    },
    {}
  );
  User.associate = function (models) {
    User.hasMany(models.Expense, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      hooks: true,
    });
    User.belongsTo(models.Company, {
      foreignKey: 'companyId',
      onDelete: 'CASCADE',
      hooks: true,
    });
  };
  return User;
};
