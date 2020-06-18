const CompanyResolver = {
  Query: {
    async company(root, { id }, { models, user }) {
      if (!user && user.userType !== 'Admin') {
        throw new Error('Not Authenticated');
      }
      const company = await models.Company.findByPk(id);
      return company;
    },

    async allCompanies(root, args, { models, user }) {
      if (!user && user.userType !== 'Admin') {
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
        registerDate,
        phone,
      },
      { models, user }
    ) {
      if (!user && user.userType !== 'Admin') {
        throw new Error('Not Authenticated');
      }

      const createdCompany = await models.Company.create({
        name,
        addressFirstLine,
        addressSecondLine,
        addressThirdLine,
        postcode,
        registerDate,
        phone,
      });

      return createdCompany;
    },
  },
};

module.exports = CompanyResolver;
