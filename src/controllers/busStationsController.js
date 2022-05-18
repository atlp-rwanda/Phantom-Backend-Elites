import Sequelize, { Op } from 'sequelize';
import { pick } from 'lodash';
import validate from '../helpers/busStationsValidation';
import { Busstations } from '../../sequelize/models/';
const debug = require('debug')('app:startup');

const createBusStation = async (req, res) => {

    try {

        const { error } = validate(req.body);
        if (error) return res.status(400).send({ errorMsg: error.details[0].message });

        const busStation = await Busstations.findOne({ where: Sequelize.or({ busStationName: req.body.busStationName }, { coordinates: req.body.coordinates }) });
        if (busStation) return res.status(409).send({ message: 'Unable to create bus station. Bus station already exist' });

        const createdbusStation = await Busstations.create(pick(req.body, ['busStationName', 'coordinates']));
        if (createdbusStation) {
            res.status(201).json({ status: 201, message: 'Bus station created successfully', data: createdbusStation });
        } else {
            throw new Error('something happened');
        }

    } catch (err) {
        res.status(500).json({ status: 500, message: 'Server error' });
        debug(`FATAL ERROR: ${err}`);
    }
};

const getSingleBusStation = async (req, res) => {
    try {

        const busStation = await Busstations.findByPk(req.params.id);
        if (!busStation) return res.status(400).json({ status: 500, message: 'The bus station with the given ID was not found.' });

        res.status(200).json({ status: 200, message: 'Bus station found successfully', data: busStation });

    } catch (err) {
        res.status(500).json({ status: 500, message: 'Server error' });
        debug(`FATAL ERROR: ${err}`);
    }
};

const getAllBusStation = async (req, res) => {
    try {

        const busStations = await Busstations.findAll();
        if (busStations.length < 1) return res.status(404).json({ status: 404, message: 'There are no Bus stations registered yet!' });

        busStations.sort((a, b) => (new Date(b.updatedAt)).getTime() - (new Date(a.updatedAt).getTime()));
        res.status(200).json({ status: 200, message: 'Bus stations found successfully', data: busStations });

    } catch (err) {
        res.status(500).json({ status: 500, message: 'Server error' });
        debug(`Unable to find bus station', ${err}`);
    }
};

const updateBusStation = async (req, res) => {
    try {

        const { error } = validate(req.body);
        if (error) return res.status(400).send({ status: 400, message: error.details[0].message });

        let busStation = await Busstations.findOne({ where: { id: req.params.id } });
        if (!busStation) return res.status(400).send({ status: 400, message: 'Bus station with the given ID was not found' });

        busStation = Busstations.update(pick(req.body, ['busStationName', 'coordinates']), { returning: true, where: { id: req.params.id } })
            .then(([rowsUpdate, [updatedBusStation]]) => res.status(201).json({ status: 200, message: "Route updated successfully", data: updatedBusStation }))
            .catch(err => {
                res.status(500).json({ status: 500, message: 'Server Error' });
                debug('Update bus station failed: ', err);
            });

    } catch (err) {
        res.status(500).json({ status: 500, message: 'Server error' });
        debug('Updating Bus station failed: ', err);
    }
};

const deleteBusStation = async (req, res) => {
    try {

        const busStation = await Busstations.findOne({ where: { id: req.params.id } });
        if (!busStation) return res.status(400).send({ status: 400, message: 'Bus station with the given ID was not found' });

        await busStation.destroy();
        res.status(200).json({ message: 'Bus station deleted successfully', deletedBusStation: busStation });

    } catch (err) {
        res.status(500).json({ status: 500, message: 'Server error' });
        debug('Deleting route failed' + err);
    }
};

const getAllBusStationGeoJSON = async (req, res) => {

    try {

        const busStations = await Busstations.findAll();
        if (busStations.length < 1) return res.status(404).json({ status: 404, message: 'There are no Bus stations registered yet!' });

        busStations.sort((a, b) => (new Date(b.updatedAt)).getTime() - (new Date(a.updatedAt).getTime()));

        if (req.query.type !== undefined && req.query.type.toLowerCase() === 'geojson') {
            const geoJSONBusStations = {
                type: 'FeatureCollection',
                features: busStations.map(busStation => ({
                    type: 'Feature',
                    properties: {
                        id: busStation.id,
                        busStationName: busStation.busStationName,
                        createdAt: busStation.createdAt,
                        updatedAt: busStation.updatedAt,
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: [
                            busStation.coordinates.split(',')[0],
                            busStation.coordinates.split(',')[1],
                        ],
                    },
                })),
            };

            return res.status(200).json({ status: 200, data: geoJSONBusStations });
        }
        return res.status(422).json({});

    } catch (err) {
        res.status(500).json({ status: 500, message: 'Server error' });
        debug(`Unable to find bus station', ${err}`);
    }
};


export {
    createBusStation,
    getSingleBusStation,
    getAllBusStation,
    updateBusStation,
    deleteBusStation,
    getAllBusStationGeoJSON
};