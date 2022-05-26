"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _routesController = require("../controllers/routesController");

const router = _express.default.Router();

exports.default = router;
router.post('/', _routesController.createRoute);
router.get('/:id', _routesController.getSingleRoute);
router.get('/', _routesController.getAllRoutes); // router.get('/list/:page', new BusController().getPaginatedList);

router.put('/:id', _routesController.updateRoute);
router.delete('/:id', _routesController.deleteRoute);