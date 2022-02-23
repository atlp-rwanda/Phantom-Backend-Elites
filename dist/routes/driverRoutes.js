"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _driverController = _interopRequireDefault(require("../controllers/driverController.js"));

var _checkUser = require("../services/check-user.js");

const router = _express.default.Router();
/**
 * @swagger
 * /api/v1/register/driver:
 *   get:
 *     summary: Register new driver in the system.
 *     responses:
 *       201:
 *         description: This endpoint allow admin of the system to register new driver.
 */


exports.default = router;
router.post("/driver", _checkUser.checkAuthentication, new _driverController.default().registerDriver);
/**
 * @swagger
 * /api/v1/register/driver:
 *   get:
 *     summary: Register new driver in the system.
 *     responses:
 *       201:
 *         description: This endpoint allow admin of the system to register new driver.
 */

router.post("/operator", new _driverController.default().registerOperator); // checkAuthentication,

router.post("/driver/register", new _driverController.default().registerDatabase);
router.post("/login", new _driverController.default().login);