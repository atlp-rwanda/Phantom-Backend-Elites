"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _busStationsController = require("../controllers/busStationsController");

const router = _express.default.Router();

exports.default = router;
router.post('/', _busStationsController.createBusStation);
router.get('/:id', _busStationsController.getSingleBusStation);
router.get('/', _busStationsController.getAllBusStation);
router.get('/bus-station-geojson', _busStationsController.getAllBusStationGeoJSON); // router.get('/list/:page', new BusController().getPaginatedList);

router.put('/:id', _busStationsController.updateBusStation);
router.delete('/:id', _busStationsController.deleteBusStation);