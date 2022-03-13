import { pick } from 'lodash';
import validate from '../validations/routeValidation';
import Routes from '../../sequelize/models/route';
import { development } from "../../sequelize/config/config.js";
import { Sequelize } from "sequelize";
const debug = require('debug')('app:startup');
let sequelize = new Sequelize(development);
let Route = Routes(sequelize, Sequelize);

const createRoute = async (req, res) => {
    try {

        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let route = await Route.findOne({ where: { name: req.body.name } });
        if (route) return res.status(400).send('Unable to create route. Route already exist');

        route = await Route.create(pick(req.body, ['name', 'origin', 'destination', 'distance', 'busStops', 'assignedBuses']));
        res.status(201).json({ message: 'Route created successfully', createdRoute: route });

    } catch (error) {
        debug(`FATAL ERROR: ${error}`);
    }
};

const getSingleRoute = async (req, res) => {
    try {

        const route = await Route.findByPk(req.params.id);
        if (!route) return res.status(400).json({ message: 'The route with the given ID was not found.' });

        res.status(200).json({ message: 'Route found successfully', route: route });

    } catch (error) {
        debug(`FATAL ERROR: ${error}`);
    }
};

const getAllRoutes = async (req, res) => {
    try {

        const route = await Route.findAll();
        res.status(200).json({ message: 'Route has been found', route: route });

    } catch (err) {
        debug('Unable to find routes', err);
    }
};

const updateRoute = async (req, res) => {
    try {

        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let route = await Route.findOne({ where: { id: req.params.id } });
        if (!route) return res.status(400).send('Route with the given ID was not found');

        // route = await Route.create(pick(req.body, ['name', 'origin', 'destination', 'distance', 'busStops', 'assignedBuses']));

        // route.set(pick(req.body, ['name', 'origin', 'destination', 'distance', 'busStops', 'assignedBuses']));
        // await route.save();
        await Route.update(req.body, { where: { id: req.params.id } });
        res.status(200).json({ message: "Route updated successfully", updatedRoute: route });

    } catch (err) {
        debug('Updating route failed: ', err);
    }
};

const deleteRoute = async (req, res) => {
    try {

        let route = await Route.findOne({ where: { id: req.params.id } });
        if (!route) return res.status(400).send('Route of the given ID is not exist');

        await route.destroy();
        res.status(200).json({ message: 'Route deleted successfully', deletedRoute: route });

    } catch (err) {
        debug('Deleting route failed' + err);
    }
};

export { createRoute, getSingleRoute, getAllRoutes, updateRoute, deleteRoute };