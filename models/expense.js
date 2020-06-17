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
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
    Expense.belongsTo(models.User, { foreignKey: 'userId' });
    Expense.hasMany(models.ExpenseReceipt, { foreignKey: 'expenseId' });
  };
  return Expense;
};
