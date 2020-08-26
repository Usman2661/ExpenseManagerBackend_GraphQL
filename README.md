# ExpenseManagerBackend_GraphQL

Setup the config.json file in config/config.json with the following structure with the DB credentials
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

#Instructions after cloning
//To install all the dependancies
yarn install 
//Run seed to setup some sample data
npx sequelize-cli db:seed:all
//Run the server
yarn start

