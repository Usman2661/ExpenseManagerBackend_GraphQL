'use strict';
module.exports = (sequelize, DataTypes) => {
  const CompanyConfig = sequelize.define(
    'CompanyConfig',
    {
      logo: DataTypes.STRING,
      appBarColor: DataTypes.STRING,
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
