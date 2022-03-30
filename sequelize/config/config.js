/* eslint-disable no-undef */
require("dotenv").config();

module.exports = {
  development: {
    username: "postgres",
    password: "root",
    database: "phantom_db",
    host: "127.0.0.1",
    dialect: "postgres",

  },
  test: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.TESTING_DATABASE_NAME,
    host: "127.0.0.1",
    dialect: "postgres",
  }
};
