"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _db = _interopRequireDefault(require("../config/db"));

const sequelize = _db.default;
const User = sequelize.define('user', {
  user_id: {
    type: _sequelize.default.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: _sequelize.default.STRING,
    allowNull: false
  },
  email: {
    type: _sequelize.default.STRING,
    allowNull: false,
    primaryKey: true
  },
  password: {
    type: _sequelize.default.STRING,
    allowNull: false
  },
  createdAt: _sequelize.default.DATE,
  updatedAt: _sequelize.default.DATE
}); // Exporting User, using this constant
// we can perform CRUD operations on
// 'user' table.

exports.default = User;