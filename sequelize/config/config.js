/* eslint-disable no-undef */
require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.HOST,
    dialect: "postgres",

  },
  test: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.TESTING_DATABASE_NAME,
    host: process.env.HOST,
    dialect: "postgres",

  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
  },
};
