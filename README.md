# ExpenseManagerBackend_GraphQL

- Full Backend GraphQL_API using Apollo, Sequelize ORM, SQL Database, Node.js

- 1. Setup the config.json file in config/config.json with the following structure with the DB credentials
 {
  "development": {
    "username": "",
    "password": "",
    "database": "",
    "host": "",
    "dialect": ""
  },
  "test": {
    "username": "",
    "password": "",
    "database": "",
    "host": "",
    "dialect": ""
  },
  "production": {
    "username": "",
    "password": "",
    "database": "",
    "host": "",
    "dialect": ""
  }
}

- 2. Create public/images/userExpenses in root directory

- 3. Create a .env file in root and add JWT_SECRET value to it

- 4. Run yarn install to install all the dependancies 

- 5. Run seed to setup some sample data for first admin user with email admin@expense.com npx sequelize-cli db:seed:all

- 6. Finally start the server using yarn start