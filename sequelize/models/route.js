'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Route extends Model {
    static associate(models) {
      Route.hasMany(models.Busstations, {
        foreignKey: 'id',
        as: 'busStationId',
        onDelete: 'CASCADE'
      });
    }
  }
  Route.init({
    name: DataTypes.STRING,
    busstations: DataTypes.ARRAY(DataTypes.INTEGER),
    routeData: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Route',
  });
  return Route;
};