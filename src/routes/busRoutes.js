import express from 'express'
import isBusManager from '../middleware/isBusManager';
import BusController from '../controllers/busController'
import validate from '../middleware/vidateBus'
const router = express.Router();

router.post('/', isBusManager,validate.createBus, new BusController().createBus);

router.get('/',new BusController().getAllBuses);
router.get('/:plateNo',new BusController().getOneBus);
router.get('/list/:page',new BusController().getPaginatedList);
router.put('/update/:plateNo',isBusManager,validate.updateRole,new BusController().updateBus);
router.delete('/:plateNo',isBusManager,new BusController().deleteteBus);

export {router as default};