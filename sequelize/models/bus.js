"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
class Bus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
      Bus.belongsTo(models.User, {
        foreignKey: 'driver',
        as: 'owner',
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
        allowNull: false
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
      timestamps: false
    }
    
   
  );
  return Bus;
};
