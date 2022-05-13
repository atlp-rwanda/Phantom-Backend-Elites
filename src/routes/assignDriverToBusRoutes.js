import express from 'express';
import { 
    assignDriverToBus, 
    unAssignDriverFromBus, 
    allDriverToBusAssignments  } from "../controllers/AssignDriverToBusController";
const router = express.Router();

router.post('/assign-bus', assignDriverToBus);
router.get('/unassign-bus/:driverId', unAssignDriverFromBus);
router.get('/assigned-buses', allDriverToBusAssignments);

export { router as default };