'use strict';
module.exports = (sequelize, DataTypes) => {
  const ExpenseReceipt = sequelize.define(
    'ExpenseReceipt',
    {
      receipt: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          contains: 'http',
        },
      },
    },
    {}
  );
  ExpenseReceipt.associate = function (models) {
    ExpenseReceipt.belongsTo(models.Expense, { foreignKey: 'expenseId' });
  };
  return ExpenseReceipt;
};
