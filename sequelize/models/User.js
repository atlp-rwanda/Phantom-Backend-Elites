"use strict";
const { Model } = require('sequelize');
module.exports = function (sequelize, DataTypes)  {
  class User extends Model {
 
    static associate(models) {
      User.belongsTo(models.Role, {
        foreignKey: 'roleId',
        as: 'role',
        onDelete: 'CASCADE',
      })
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
