'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class Token extends Model {
    static associate(models) {
      this.userId = this.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
    }
  }

  Token.init(
    {
      id: DataTypes.INTEGER,
      token: DataTypes.STRING,
      status: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Token',
    }
  );
  return Token;
};