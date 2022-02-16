

# What is Sequelize?

Sequelize is an open-source Node.js module that enables JavaScript developers to work with relational databases more easily, including but limited to MySQL, Postgres.

# Benefits of Sequelize
In general, the benefits of Sequelize and Object Relational Mappers are:

1. Sequelize allow us to write less code.
2. Enable us to write more consistent code.
3. You can mostly avoid SQL queries.
4. Sequelize abstracts the database engine.
6. Good tooling for migrations.

# installed packages related to sequelize
1. $ npm install --save sequelize
2. $ npm install --save pg pg-hstore // these are postgres drivers for sequelize
3. npm install --save sequelize-cli // command line interface for sequelize
4. npx sequelize-cli init // this creates a starter sequelize project with the following directories:
   - config
   - models
   - migrations
   - seeders
# Sequelize usage step by step
1. run 'npm i'
2. Create database in pg-admin
3. Open 'config/config.json' and ad the database credentials in the development, test and production
I have created migrations, seeders and seed data for testing. To use them you need the following commands:
* To make it simple, I have created scripts for the npx commands in the 'package.json'
4. 'npm run make-model' // for creating a user model
5. 'npm run migrate' // to migrate the model
6. 'npm run seed' // to insert the default data(seed data) into the database
7. Done, now you are ready to go!



[![Actions Status](https://github.com/atlp-rwanda/Phantom-Backend-Elites/workflows/Node.js CI/badge.svg)](https://github.com/atlp-rwanda/Phantom-Backend-Elites/actions)
