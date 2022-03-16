'use strict';
// const { v4: UUIDV4 } = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Busstations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Busstations.init({

    busStationName: DataTypes.STRING,
    coordinate: DataTypes.STRING

    // busstationId: { type: DataTypes.UUIDV4, allowNull: false },
    // location: { type: DataTypes.STRING, allowNull: false },
    // latitude: { type: DataTypes.STRING, allowNull: false },
    // longitude: { type: DataTypes.STRING, allowNull: false }
  }, {
    sequelize,
    modelName: 'Busstations',
    timestamps: false
  });
  return Busstations;
};