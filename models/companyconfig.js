'use strict';
module.exports = (sequelize, DataTypes) => {
  const CompanyConfig = sequelize.define(
    'CompanyConfig',
    {
      logo: DataTypes.STRING,
      appBarColor: DataTypes.STRING,
      companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Companies',
          key: 'id',
        },
      },
    },
    {}
  );
  CompanyConfig.associate = function (models) {
    CompanyConfig.belongsTo(models.Company, {
      foreignKey: 'companyId',
      onDelete: 'CASCADE',
      hooks: true,
    });
  };
  return CompanyConfig;
};
