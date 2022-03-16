'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Route extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Route.hasMany(models.busstations, {
        foreignKey: 'id',
        as: 'busStationId',
        onDelete: 'CASCADE'
      });
    }
  }
  Route.init({
    name: DataTypes.STRING,
    originId: DataTypes.INTEGER,
    destinationId: DataTypes.INTEGER,
    busstations: DataTypes.ARRAY(DataTypes.INTEGER)
  }, {
    sequelize,
    modelName: 'Route',
  });
  return Route;
};