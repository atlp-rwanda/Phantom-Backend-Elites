import express from "express";
import driverController from "../controllers/driverController.js";

const router = express.Router();

/**
 * @swagger
 * /api/v1/register/driver:
 *   get:
 *     summary: Register new driver in the system.
 *     responses:
 *       201:
 *         description: This endpoint allow admin of the system to register new driver.
 */
router.post("/driver", new driverController().registerDriver);

/**
 * @swagger
 * /api/v1/register/driver:
 *   get:
 *     summary: Register new driver in the system.
 *     responses:
 *       201:
 *         description: This endpoint allow admin of the system to register new driver.
 */
router.post("/operator", new driverController().registerOperator);

export { router as default };
