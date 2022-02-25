import Sequelize from "sequelize";
import db from "../config/db.js";
const sequelize = db;
const Operator = sequelize.define("operator_table", {
  operator_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: Sequelize.STRING,
  },
  secondName: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  phoneNumber: {
    type: Sequelize.STRING,
  },
  idNumber: {
    type: Sequelize.STRING,
  },
  driverLicence: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  dateofBirth: {
    allowNull: true,
    type: Sequelize.DATE,
  },
  gender: {
    type: Sequelize.STRING,
  },
  address: {
    type: Sequelize.STRING,
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});

export { Operator as default };
