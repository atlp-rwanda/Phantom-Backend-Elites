"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateRoute = exports.getSingleRoute = exports.getAllRoutes = exports.deleteRoute = exports.createRoute = void 0;

var _request = _interopRequireDefault(require("request"));

var _sequelize = _interopRequireDefault(require("sequelize"));

var _lodash = require("lodash");

var _routesValidation = _interopRequireDefault(require("../helpers/routesValidation"));

var _models = require("../../sequelize/models/");

const debug = require('debug')('app:startup');

const createRoute = async (req, res) => {
  // Get route array 
  // Look if each element in the array is exist in the bus stations table by PK
  // If one of the route entered doesn't exist respond an error
  // If all exist check the route of the first index in the route array store it as origin and the last as destination
  // Add that to the Mapbox API
  // Store it in the routeData property 
  try {
    let route = {
      busstations: req.body.busstation
    }; // const { error } = validate(req.body);
    // if (error) return res.status(400).send({ errorMsg: error.details[0].message });

    const firstIndex = route.busstations[0];
    const lastIndex = route.busstations[route.busstations.length - 1];
    const {
      id: firstIndexCheck,
      busStationName: fsBsName
    } = await _models.Busstations.findByPk(firstIndex);
    if (!firstIndexCheck) return res.status(404).json({
      status: 404,
      message: 'Destination with the given ID was not found'
    });
    const {
      id: lastIndexCheck,
      busStationName: lsBsName
    } = await _models.Busstations.findByPk(lastIndex);
    if (!lastIndexCheck) return res.status(404).json({
      status: 404,
      message: 'Destination with the given ID was not found'
    });

    const duplicateBusStationCheck = () => {
      for (let i = 0; i < route.busstations.length; i += 1) {
        for (let j = i + 1; j < route.busstations.length; j += 1) {
          if (route.busstations[i] === route.busstations[j]) {
            return true;
          }
        }

        return false;
      }
    };

    if (duplicateBusStationCheck()) return res.status(409).json({
      status: 409,
      message: 'You have a duplication of bus station'
    });
    const Op = _sequelize.default; // const result = await Busstations.count({ where: { id: { [Op.in]: route.busstations[0] } } });
    // if (result != route.busstations.length) return res.status(404).json({ status: 404, message: 'You have entered too many bus stations' });

    const routeBs = route.busstations;
    const routeBusStations = await _models.Busstations.findAll({
      where: {
        id: routeBs
      }
    });
    let busStationsNames = [];
    routeBusStations.forEach(element => {
      busStationsNames.push(element.busStationName);
    });
    const routeName = busStationsNames.join(' - ');
    route.name = routeName;
    const isRouteExists = await _models.Route.findOne({
      where: {
        name: route.name
      }
    });
    if (isRouteExists) return res.status(409).send({
      status: 409,
      message: `Route with the given name ${route.name} exists`
    });
    const {
      coordinates: origin
    } = await _models.Busstations.findByPk(route.busstations[0]);
    const {
      coordinates: destination
    } = await _models.Busstations.findByPk(route.busstations[route.busstations.length - 1]);

    _request.default.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${origin};${destination}?geometries=geojson&access_token=pk.eyJ1IjoiaWlzaGltd2UiLCJhIjoiY2wwd2Q3aW15MGM2dTNrcGVkZ2kzYTZ3eiJ9._jFYEUoc19EZW-WYArxx4g`, async (error, response, body) => {
      if (error) return debug(`ERROR OCCURED HERE: ${error}`);
      const routeData = body;
      route.routeData = JSON.parse(routeData);

      (async () => {
        const createdRoute = await _models.Route.create(route);
        return res.status(201).json({
          status: 201,
          message: 'A Route created successfully',
          createdRoute
        });
      })();
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'Server error'
    });
    debug(`FATAL ERROR:::::::: ${err}`);
  }
};

exports.createRoute = createRoute;

const getSingleRoute = async (req, res) => {
  try {
    const route = await _models.Route.findByPk(req.params.id);
    if (!route) return res.status(400).json({
      status: 400,
      message: 'Route with the given ID was not found.'
    });
    res.status(200).json({
      status: 200,
      message: 'Route found successfully',
      data: route
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'Server error'
    });
    debug(`FATAL ERROR: ${err}`);
  }
};

exports.getSingleRoute = getSingleRoute;

const getAllRoutes = async (req, res) => {
  try {
    const routes = await _models.Route.findAll();
    if (routes.length < 1) return res.status(404).json({
      status: 404,
      message: 'There are no Routes registered yet!'
    });
    routes.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    res.status(200).json({
      status: 200,
      message: 'Routes found successfully',
      data: routes
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'Server error'
    });
    debug(`FATAL ERROR', ${err}`);
  }
};

exports.getAllRoutes = getAllRoutes;

const updateRoute = async (req, res) => {
  try {
    const {
      error
    } = (0, _routesValidation.default)(req.body);
    if (error) return res.status(400).send({
      status: 400,
      message: error.details[0].message
    });
    let route = await _models.Route.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!route) return res.status(400).send({
      status: 400,
      message: 'Route with the given ID was not found'
    });
    route = _models.Route.update((0, _lodash.pick)(req.body, ['origin', 'destination', 'busstations']), {
      returning: true,
      where: {
        id: req.params.id
      }
    }).then(([rowsUpdate, [updatedBusStation]]) => res.status(201).json({
      status: 200,
      message: "Route updated successfully",
      updatedBusStation
    })).catch(err => {
      res.status(500).json({
        status: 500,
        message: 'Server Error'
      });
      debug('Update route failed: ', err);
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'Server error'
    });
    debug('Updating Route failed: ', err);
  }
};

exports.updateRoute = updateRoute;

const deleteRoute = async (req, res) => {
  try {
    const route = await _models.Route.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!route) return res.status(400).send({
      status: 400,
      message: 'Route with the given ID was not found'
    });
    await route.destroy();
    res.status(200).json({
      message: 'Route deleted successfully',
      data: route
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'Server error'
    });
    debug(`Deleting route failed ${err}`);
  }
};

exports.deleteRoute = deleteRoute;