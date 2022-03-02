import express from "express";
const router = express.Router();
import viewBusesController from '../controllers/listOfBusesController.js'
import validate from '../middleware/validator'
router.post("/",validate.viewListOfBuses, viewBusesController)


export default router