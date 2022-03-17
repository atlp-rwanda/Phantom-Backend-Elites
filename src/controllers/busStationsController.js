import { pick } from 'lodash';
import validate from '../helpers/busStationsValidation';
import Busstations from '../../sequelize/models/busstations';
import { development } from "../../sequelize/config/config.js";
import { Sequelize } from "sequelize";
const debug = require('debug')('app:startup');
let sequelize = new Sequelize(development);
let Busstation = Busstations(sequelize, Sequelize);

const createBusStation = async (req, res) => {
    try {

        const { error } = validate(req.body);
        if (error) return res.status(400).send({ errorMsg: error.details[0].message });

        const busStation = await Busstation.findOne({ where: { busStationName: req.body.busStationName } });
        if (busStation) return res.status(400).send('Unable to create bus station. Bus station already exist');

        const createdbusStation = await Busstation.create(pick(req.body, ['busStationName', 'coordinates']));
        if (createdbusStation) {
            res.status(201).json({ message: 'Bus station created successfully', createdbusStation });
        } else {
            throw new Error('something happened');
        }

    } catch (err) {
        debug(`FATAL ERROR: ${err}`);
    }
};

const getSingleBusStation = async (req, res) => {
    try {

        const busStation = await Busstation.findByPk(req.params.id);
        if (!busStation) return res.status(400).json({ message: 'The bus station with the given ID was not found.' });

        res.status(200).json({ message: 'Bus station found successfully', singleBusStation: busStation });

    } catch (err) {
        debug(`FATAL ERROR: ${err}`);
    }
};

const getAllBusStation = async (req, res) => {
    try {

        const busStations = await Busstation.findAll();
        res.status(200).json({ message: 'Routes found successfully', allBusStations: busStations });

    } catch (err) {
        debug('Unable to find bus station', err);
    }
};

const updateBusStation = async (req, res) => {
    try {

        const { error } = validate(req.body);
        if (error) return res.status(400).send({ errorMsg: error.details[0].message });

        let busStation = await Busstation.findOne({ where: { id: req.params.id } });
        if (!busStation) return res.status(400).send({ message: 'Bus station with the given ID was not found' });

        busStation = Busstation.update(pick(req.body, ['busStationName', 'coordinates']), { returning: true, where: { id: req.params.id } })
            .then(([rowsUpdate, [updatedBusStation]]) => res.json({ message: "Route updated successfully", updatedBusStation }))
            .catch(err => debug('Update bus station failed: ', err));

    } catch (err) {
        debug('Updating Bus station failed: ', err);
    }
};

const deleteBusStation = async (req, res) => {
    try {

        const busStation = await Busstation.findOne({ where: { id: req.params.id } });
        if (!busStation) return res.status(400).send({ message: 'Bus station with the given ID is not exist' });

        await busStation.destroy();
        res.status(200).json({ message: 'Bus station deleted successfully', deletedBusStation: busStation });

    } catch (err) {
        debug('Deleting route failed' + err);
    }
};

export { createBusStation, getSingleBusStation, getAllBusStation, updateBusStation, deleteBusStation };