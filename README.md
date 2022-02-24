# Pre-requisities

1. Node installed
2. Postgres database installed

# Sequelize set-up locally

1. run 'npm i'
2. Create database in pg-admin
3. Open 'config/config.json' and ad the database credentials in the development, test and production

I have created migrations, seeders and seed data for testing. To use them you need the following commands:

- To make it simple, I have created scripts for the npx commands in the 'package.json'

4. 'npm run make-model' // for creating a user model
5. 'npm run migrate' // to migrate the model
6. 'npm run seed' // to insert the default data(seed data) into the database
7. Done, now you are ready to go!

[![Actions Status](https://github.com/atlp-rwanda/Phantom-Backend-Elites/workflows/Node.js CI/badge.svg)](https://github.com/atlp-rwanda/Phantom-Backend-Elites/actions)
