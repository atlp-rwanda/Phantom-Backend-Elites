/* eslint-disable no-undef */
require("dotenv").config();

module.exports = {
  development: {
    // username: process.env.DATABASE_USERNAME,
    // password: process.env.DATABASE_PASSWORD,
    // database: process.env.DATABASE_NAME,
    username: "postgres",
    password: "root",
    database: "phantom_db",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  test: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
  },
};
