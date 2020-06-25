'use strict';
module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define(
    'Expense',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        default: 'Pending',
        validate: {
          isIn: [['Pending', 'Approved', 'Rejected']],
        },
      },
      amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
      },
    },
    {}
  );
  Expense.associate = function (models) {
    Expense.belongsTo(models.User, {
      onDelete: 'CASCADE',
      hooks: true,
      foreignKey: 'userId',
    });
    Expense.hasMany(models.ExpenseReceipt, {
      hooks: true,
    });
  };
  return Expense;
};
