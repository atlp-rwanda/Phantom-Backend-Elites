import express from 'express';
import {
    createRoute,
    getSingleRoute,
    getAllRoutes,
    updateRoute,
    deleteRoute
} from '../controllers/routesController';
const router = express.Router();

router.post('/', createRoute);
router.get('/:id', getSingleRoute);
router.get('/', getAllRoutes);
// router.get('/list/:page', new BusController().getPaginatedList);
router.put('/:id', updateRoute);
router.delete('/:id', deleteRoute);

export { router as default };