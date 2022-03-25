import Request from 'request';
import Sequelize, { Op } from 'sequelize';
import { pick } from 'lodash';
import validate from '../helpers/routesValidation';
import { Busstations, Route } from '../../sequelize/models/';
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
        };
        debug(`THIS IS ROUTE BUS STATIONS ${route.busstations}`);

        // VALIDATE INPUTS
        // const { error } = validate(req.body);
        // if (error) return res.status(400).send({ errorMsg: error.details[0].message });
        const firstIndex = route.busstations[0];
        const lastIndex = route.busstations[route.busstations.length - 1];

        // CHECK IF ORIGIN IS EXIST AS A BUS STATION IN BUS STATION TABLE
        const firstIndexCheck = await Busstations.findByPk(firstIndex);
        if (!firstIndexCheck) return res.status(404).json({ status: 404, message: 'Destination with the given ID was not found' });

        // CHECK IF DESTINATION IS EXIST AS A BUS STATION IN BUS STATION TABLE
        const lastIndexCheck = await Busstations.findByPk(lastIndex);
        if (!lastIndexCheck) return res.status(404).json({ status: 404, message: 'Destination with the given ID was not found' });

        const duplicateBusStationCheck = () => {
            for (let i = 0; i < route.busstations.length; i += 1) {
                for (let j = i + 1; j < route.busstations.length; j += 1) {
                    if (route.busstations[i] == route.busstations[j]) {
                        return true;
                    }
                }
                return false;
            }
        };

        if (duplicateBusStationCheck()) return res.status(409).json({ status: 409, message: 'You have a duplication of bus stations' });

        const result = await Busstations.count({ where: { id: { [Sequelize.Op.in]: route.busstations } } });
        if (result != route.busstations.length) return res.status(404).json({ status: 404, message: 'You have entered too many bus stations' });

        let busStationsNames = [];
        route.busstations.forEach((element) => {
            // const allBusStations = await Busstations.findAll({ where: { id: element } });
            // const allBusStations = await Busstations.findOne({ where: { id: element } });
            // if (!allBusStations) return res.status(404).json({ status: 404, message: 'No bus stations found' });
            // debug(`NAME OF THE BUS STATION:::::: ${allBusStations.busStationName}`);
            // busStationsNames.push(allBusStations.busStationName);

            Busstations.findOne({ where: { id: element } })
                .then((error, allBusStations) => {
                    if (!allBusStations) return res.status(404).json({ status: 404, message: 'No bus stations found' });
                    debug(`NAME OF THE BUS STATION:::::: ${allBusStations.busStationName}`);
                    busStationsNames.push(allBusStations.busStationName);
                });

        });

        debug(`BUS STATIONS NAMES:::: ${busStationsNames}`);

        const routeName = busStationsNames.join('-');
        debug(`THIS IS ROUTNAME:::: ${routeName}`);
        route.name = routeName;
        debug(`THIS IS ROUTNAME:::: ${route.name}`);

        const isRouteExists = await Route.findOne({ where: { name: route.name } });
        if (isRouteExists) return res.status(409).send({ status: 409, message: `Route with the given name ${route.name} exists` });

        const origin = await Busstations.findByPk(route.busstations[0]);
        const destination = await Busstations.findByPk(route.busstations[route.busstations.length - 1]);

        Request.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${origin.coordinates};${destination.coordinates}?geometries=geojson&access_token=pk.eyJ1IjoiaWlzaGltd2UiLCJhIjoiY2wwd2Q3aW15MGM2dTNrcGVkZ2kzYTZ3eiJ9._jFYEUoc19EZW-WYArxx4g`, (err, body) => {
            if (err) debug(`FATAL ERROR: ${err}`);
            debug(`THIS IS THE BODY OF ROUTE DATA::::: ${body}`);
            const routeData = body;
            // route.routeData = JSON.parse(routeData);
            route.routeData = routeData;

            (async () => {
                route = await Route.create(route);
                if (route) {
                    res.status(201).json({ status: 201, message: 'The Route created successfully', data: route });
                } else {
                    throw new Error('Something went wrong');
                };
            })();
        });

    } catch (err) {
        res.status(500).json({ status: 500, message: 'Server error' });
        debug(`FATAL ERROR:::::::: ${err}`);
    }
};

const getSingleRoute = async (req, res) => {

    try {

        const route = await Route.findByPk(req.params.id);
        if (!route) return res.status(400).json({ status: 400, message: 'Route with the given ID was not found.' });

        res.status(200).json({ status: 200, message: 'Route found successfully', data: route });

    } catch (err) {
        res.status(500).json({ status: 500, message: 'Server error' });
        debug(`FATAL ERROR: ${err}`);
    }
};

const getAllRoutes = async (req, res) => {

    try {

        const routes = await Route.findAll();
        if (routes.length < 1) return res.status(404).json({ status: 404, message: 'There are no Routes registered yet!' });

        routes.sort((a, b) => (new Date(b.updatedAt)).getTime() - (new Date(a.updatedAt).getTime()));
        res.status(200).json({ status: 200, message: 'Routes found successfully', data: routes });

    } catch (err) {
        res.status(500).json({ status: 500, message: 'Server error' });
        debug(`FATAL ERROR', ${err}`);
    }
};

const updateRoute = async (req, res) => {

    try {

        const { error } = validate(req.body);
        if (error) return res.status(400).send({ status: 400, message: error.details[0].message });

        let route = await Route.findOne({ where: { id: req.params.id } });
        if (!route) return res.status(400).send({ status: 400, message: 'Route with the given ID was not found' });

        route = Route.update(pick(req.body, ['origin', 'destination', 'busstations']), { returning: true, where: { id: req.params.id } })
            .then(([rowsUpdate, [updatedBusStation]]) => res.status(201).json({ status: 200, message: "Route updated successfully", updatedBusStation }))
            .catch(err => {
                res.status(500).json({ status: 500, message: 'Server Error' });
                debug('Update route failed: ', err);
            });

    } catch (err) {
        res.status(500).json({ status: 500, message: 'Server error' });
        debug('Updating Route failed: ', err);
    }
};

const deleteRoute = async (req, res) => {

    try {

        const route = await Route.findOne({ where: { id: req.params.id } });
        if (!route) return res.status(400).send({ status: 400, message: 'Route with the given ID was not found' });

        await route.destroy();
        res.status(200).json({ message: 'Route deleted successfully', data: route });

    } catch (err) {
        res.status(500).json({ status: 500, message: 'Server error' });
        debug(`Deleting route failed ${err}`);
    }
};

export { createRoute, getSingleRoute, getAllRoutes, updateRoute, deleteRoute };