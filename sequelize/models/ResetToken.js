'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes)=>{
  class ResetToken extends Model {
    static associate(models) {
    }
  }
  ResetToken.init({
    email: DataTypes.STRING,
    token: DataTypes.STRING,
    expiration: DataTypes.DATE,
    used: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ResetToken',
  });
  return ResetToken;
};