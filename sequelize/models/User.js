"use strict";
const { Model } = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
      User.belongsTo(models.Role, {
        foreignKey: 'roleId',
        as: 'role',
        onDelete: 'CASCADE',
      });
      User.hasOne(models.Bus, {
        foreignKey: 'driverId',
      });
      User.hasMany(models.Notification, {
        as: 'notifications',
        foreignKey: 'receiverId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      dateofbirth: DataTypes.STRING,
      gender: DataTypes.STRING,
      address: DataTypes.STRING,
      roleId: DataTypes.INTEGER,
      drivingLicenseNo: DataTypes.STRING,
      nationalIdNo: DataTypes.STRING,
      phoneNo: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "User",
    },
  );
  return User;
};
