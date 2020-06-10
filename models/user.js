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
          isIn: [['Staff', 'Manager', 'SeniorManagement']],
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
    },
    {}
  );
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Expense);
  };
  return User;
};
