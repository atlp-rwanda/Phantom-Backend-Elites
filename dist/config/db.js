"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

require("dotenv/config");

// require("dotenv").config();
var connection = new _sequelize.default(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
  host: process.env.HOST,
  port: 5432,
  dialect: process.env.DIALECT
});
exports.default = connection;

try {
  connection.authenticate();
  console.log("connection started successfully");
} catch (error) {
  console.log("unable to connected to database", error);
} // module.exports = connection;