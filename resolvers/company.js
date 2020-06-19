var AdminPermission = require('../auth/AdminPermission');

const CompanyResolver = {
  Query: {
    async company(root, { id }, { models, user }) {
      if (!(await AdminPermission(user))) {
        throw new Error('Not Authenticated');
      }

      const company = await models.Company.findByPk(id);
      if (!company) {
        throw new Error('Company not found');
      }
      return company;
    },

    async allCompanies(root, args, { models, user }) {
      if (!(await AdminPermission(user))) {
        throw new Error('Not Authenticated');
      }

      const allCompanies = await models.Company.findAll();
      return allCompanies;
    },
  },

  Mutation: {
    async createCompany(
      root,
      {
        name,
        addressFirstLine,
        addressSecondLine,
        addressThirdLine,
        postcode,
        registerYear,
        businessArea,
        phone,
      },
      { models, user }
    ) {
      if (!(await AdminPermission(user))) {
        throw new Error('Not Authenticated');
      }
      const createdCompany = await models.Company.create({
        name,
        addressFirstLine,
        addressSecondLine,
        addressThirdLine,
        postcode,
        registerYear,
        businessArea,
        phone,
      });

      return createdCompany;
    },
    async deleteCompany(root, { id }, { models, user }) {
      if (!(await AdminPermission(user))) {
        throw new Error('Not Authenticated');
      }
      const deletedCompany = await models.Company.destroy({
        where: {
          id,
        },
        returning: true,
        plain: true,
      });

      if (!deletedCompany) {
        throw new Error('There was an error while deleting company');
      }

      return {
        id,
      };
    },

    async updateCompany(
      root,
      {
        id,
        name,
        addressFirstLine,
        addressSecondLine,
        addressThirdLine,
        postcode,
        registerYear,
        businessArea,
        phone,
      },
      { models, user }
    ) {
      if (!(await AdminPermission(user))) {
        throw new Error('Not Authenticated');
      }

      const updateCompany = await models.Company.update(
        {
          name,
          addressFirstLine,
          addressSecondLine,
          addressThirdLine,
          postcode,
          registerYear,
          businessArea,
          phone,
        },
        {
          where: {
            id,
          },
          returning: true,
          plain: true,
        }
      );

      const updatedCompany = updateCompany[1].dataValues;

      if (!updatedCompany.id) {
        throw new Error('There was a problem updating company');
      }

      return updatedCompany;
    },
  },
};

module.exports = CompanyResolver;
