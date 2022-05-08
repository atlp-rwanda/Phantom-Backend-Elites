'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Busstations extends Model {
    static associate(models) {
    }
  }
  Busstations.init({
    busStationName: DataTypes.STRING,
    coordinates: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Busstations'
  });
  return Busstations;
};