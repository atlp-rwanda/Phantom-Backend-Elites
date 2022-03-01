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

[![Node.js CI](https://github.com/atlp-rwanda/Phantom-Backend-Elites/actions/workflows/node.js.yml/badge.svg)](https://github.com/atlp-rwanda/Phantom-Backend-Elites/actions/workflows/node.js.yml) [![Maintainability](https://api.codeclimate.com/v1/badges/2b1340f723faa22a820e/maintainability)](https://codeclimate.com/github/atlp-rwanda/Phantom-Backend-Elites/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/2b1340f723faa22a820e/test_coverage)](https://codeclimate.com/github/atlp-rwanda/Phantom-Backend-Elites/test_coverage)
