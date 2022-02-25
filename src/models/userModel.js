const Sequelize = require("sequelize");
const db = require("../db");
// const dbs = require('../../db')

const User = db.define("phantom_user", {
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },

  password: {
    type: Sequelize.STRING,
  },
  role: {
    type: Sequelize.STRING,
  }
});

module.exports = User;
