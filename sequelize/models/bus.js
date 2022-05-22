"use strict";
const { Model } = require("sequelize");
module.exports =  function(sequelize, DataTypes) {
class Bus extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
      Bus.belongsTo(models.User, {
        foreignKey: 'driverId',
        as: 'drivers',
        onDelete: 'CASCADE',
      });
      
    }
  }
  Bus.init(
    {
      brand: {
        type: DataTypes.STRING,
        allowNull: false
      },
      plateNo:{
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      driverId:{
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'User',
          key: 'id',
          as: 'driverId'
        }
      },
      seats:{
        type: DataTypes.INTEGER,
        allowNull: false
      },
      status:{
        type: DataTypes.STRING
      }
      
    },
    {
      sequelize,
      modelName: "Bus"
    }   
  );
  return Bus;
};
