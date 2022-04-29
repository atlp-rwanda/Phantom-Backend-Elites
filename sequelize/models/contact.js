'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Contact.init({
    fullname: DataTypes.STRING,
    email: DataTypes.STRING,
    telnumber: DataTypes.STRING,
    message: DataTypes.STRING(1000)
  }, {
    sequelize,
    modelName: 'Contact',
  });
  return Contact;
};