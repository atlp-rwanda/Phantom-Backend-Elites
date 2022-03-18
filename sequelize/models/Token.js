'use strict';
const { Model } = require('sequelize');
module.exports = function (sequelize, DataTypes){

  class Token extends Model {
    static associate(models) {
      Token.belongsTo(models.User, {
        foreignKey: 'ownerId',
        as: 'owner',
        onDelete: 'CASCADE',
      });
    }
  }

  Token.init(
    {
      token: DataTypes.STRING,
      status: DataTypes.STRING,
      ownerId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Token',
    }
  );
  return Token;
};