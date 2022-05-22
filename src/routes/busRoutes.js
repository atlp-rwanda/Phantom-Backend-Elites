import express from 'express'
import isBusManager from '../middleware/isBusManager';
import BusController from '../controllers/busController'
import validate from '../middleware/vidateBus'
const router = express.Router();

router.post('/',validate.createBus, new BusController().createBus);
router.get('/',new BusController().getAllBuses);
router.get('/:plateNo',new BusController().getOneBus);
router.get('/pages/:num',new BusController().getPaginatedList);
router.put('/:plateNo',new BusController().updateBus);
router.delete('/:plateNo',new BusController().deleteteBus);

export {router as default};