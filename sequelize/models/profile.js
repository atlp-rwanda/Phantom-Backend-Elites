"use strict";
// import { Model } from "sequelize";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User, {
        foreignKey: 'ownerId',
        as: 'owner',
        onDelete: 'CASCADE',
      })
    }
  }
  Profile.init(
    {
      ownerId: DataTypes.STRING,
      driverLicence: DataTypes.STRING,
      dateofBirth: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Profile",
    }
  );
  return Profile;
};
