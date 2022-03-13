'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Route extends Model {
    static associate(models) {
      // define association here
    }
  }
  Route.init({
    // routeID: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    origin: { type: DataTypes.STRING, allowNull: false },
    destination: { type: DataTypes.STRING, allowNull: false },
    distance: { type: DataTypes.STRING, allowNull: true },
    busStops: DataTypes.ARRAY(DataTypes.INTEGER),
    assignedBuses: DataTypes.ARRAY(DataTypes.INTEGER)
  }, {
    sequelize,
    modelName: 'Route',
    timestamps: false
  });
  return Route;
};