import express from 'express';
import {
    createBusStation,
    getSingleBusStation,
    getAllBusStation,
    updateBusStation,
    deleteBusStation,
    getAllBusStationGeoJSON
} from '../controllers/busStationsController';
const router = express.Router();

router.post('/', createBusStation);
router.get('/:id', getSingleBusStation);
router.get('/', getAllBusStation);
router.get('/bus-station-geojson', getAllBusStationGeoJSON);
// router.get('/list/:page', new BusController().getPaginatedList);
router.put('/:id', updateBusStation);
router.delete('/:id', deleteBusStation);

export { router as default };