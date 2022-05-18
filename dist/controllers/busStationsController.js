"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateBusStation = exports.getSingleBusStation = exports.getAllBusStationGeoJSON = exports.getAllBusStation = exports.deleteBusStation = exports.createBusStation = void 0;

var _sequelize = _interopRequireWildcard(require("sequelize"));

var _lodash = require("lodash");

var _busStationsValidation = _interopRequireDefault(require("../helpers/busStationsValidation"));

var _models = require("../../sequelize/models/");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const debug = require('debug')('app:startup');

const createBusStation = async (req, res) => {
  try {
    const {
      error
    } = (0, _busStationsValidation.default)(req.body);
    if (error) return res.status(400).send({
      errorMsg: error.details[0].message
    });
    const busStation = await _models.Busstations.findOne({
      where: _sequelize.default.or({
        busStationName: req.body.busStationName
      }, {
        coordinates: req.body.coordinates
      })
    });
    if (busStation) return res.status(409).send({
      message: 'Unable to create bus station. Bus station already exist'
    });
    const createdbusStation = await _models.Busstations.create((0, _lodash.pick)(req.body, ['busStationName', 'coordinates']));

    if (createdbusStation) {
      res.status(201).json({
        status: 201,
        message: 'Bus station created successfully',
        data: createdbusStation
      });
    } else {
      throw new Error('something happened');
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'Server error'
    });
    debug(`FATAL ERROR: ${err}`);
  }
};

exports.createBusStation = createBusStation;

const getSingleBusStation = async (req, res) => {
  try {
    const busStation = await _models.Busstations.findByPk(req.params.id);
    if (!busStation) return res.status(400).json({
      status: 500,
      message: 'The bus station with the given ID was not found.'
    });
    res.status(200).json({
      status: 200,
      message: 'Bus station found successfully',
      data: busStation
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'Server error'
    });
    debug(`FATAL ERROR: ${err}`);
  }
};

exports.getSingleBusStation = getSingleBusStation;

const getAllBusStation = async (req, res) => {
  try {
    const busStations = await _models.Busstations.findAll();
    if (busStations.length < 1) return res.status(404).json({
      status: 404,
      message: 'There are no Bus stations registered yet!'
    });
    busStations.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    res.status(200).json({
      status: 200,
      message: 'Bus stations found successfully',
      data: busStations
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'Server error'
    });
    debug(`Unable to find bus station', ${err}`);
  }
};

exports.getAllBusStation = getAllBusStation;

const updateBusStation = async (req, res) => {
  try {
    const {
      error
    } = (0, _busStationsValidation.default)(req.body);
    if (error) return res.status(400).send({
      status: 400,
      message: error.details[0].message
    });
    let busStation = await _models.Busstations.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!busStation) return res.status(400).send({
      status: 400,
      message: 'Bus station with the given ID was not found'
    });
    busStation = _models.Busstations.update((0, _lodash.pick)(req.body, ['busStationName', 'coordinates']), {
      returning: true,
      where: {
        id: req.params.id
      }
    }).then(([rowsUpdate, [updatedBusStation]]) => res.status(201).json({
      status: 200,
      message: "Route updated successfully",
      data: updatedBusStation
    })).catch(err => {
      res.status(500).json({
        status: 500,
        message: 'Server Error'
      });
      debug('Update bus station failed: ', err);
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'Server error'
    });
    debug('Updating Bus station failed: ', err);
  }
};

exports.updateBusStation = updateBusStation;

const deleteBusStation = async (req, res) => {
  try {
    const busStation = await _models.Busstations.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!busStation) return res.status(400).send({
      status: 400,
      message: 'Bus station with the given ID was not found'
    });
    await busStation.destroy();
    res.status(200).json({
      message: 'Bus station deleted successfully',
      deletedBusStation: busStation
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'Server error'
    });
    debug('Deleting route failed' + err);
  }
};

exports.deleteBusStation = deleteBusStation;

const getAllBusStationGeoJSON = async (req, res) => {
  try {
    const busStations = await _models.Busstations.findAll();
    if (busStations.length < 1) return res.status(404).json({
      status: 404,
      message: 'There are no Bus stations registered yet!'
    });
    busStations.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

    if (req.query.type !== undefined && req.query.type.toLowerCase() === 'geojson') {
      const geoJSONBusStations = {
        type: 'FeatureCollection',
        features: busStations.map(busStation => ({
          type: 'Feature',
          properties: {
            id: busStation.id,
            busStationName: busStation.busStationName,
            createdAt: busStation.createdAt,
            updatedAt: busStation.updatedAt
          },
          geometry: {
            type: 'Point',
            coordinates: [busStation.coordinates.split(',')[0], busStation.coordinates.split(',')[1]]
          }
        }))
      };
      return res.status(200).json({
        status: 200,
        data: geoJSONBusStations
      });
    }

    return res.status(422).json({});
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'Server error'
    });
    debug(`Unable to find bus station', ${err}`);
  }
};

exports.getAllBusStationGeoJSON = getAllBusStationGeoJSON;