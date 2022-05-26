"use strict";
const { Model } = require("sequelize");
module.exports =  function(sequelize, DataTypes) {
class Bus extends Model {
  
    static associate(models) {
      Bus.belongsTo(models.User, {
        foreignKey: 'driver',
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
      driver:{
        type: DataTypes.STRING,
        allowNull: true
      },
      seats:{
        type: DataTypes.STRING,
        allowNull: false
      },
      status:{
        type: DataTypes.STRING
      }
      
    },
    {
      sequelize,
      modelName: "Bus",
      timestamps: true
    }
    
   
  );
  return Bus;
};
