"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _isBusManager = _interopRequireDefault(require("../middleware/isBusManager"));

var _busController = _interopRequireDefault(require("../controllers/busController"));

var _vidateBus = _interopRequireDefault(require("../middleware/vidateBus"));

const router = _express.default.Router();

exports.default = router;
router.post('/', _isBusManager.default, _vidateBus.default.createBus, new _busController.default().createBus);
router.get('/', new _busController.default().getAllBuses);
router.get('/:plateNo', new _busController.default().getOneBus);
router.get('/', new _busController.default().getPaginatedList);
router.put('/:plateNo', _isBusManager.default, _vidateBus.default.updateRole, new _busController.default().updateBus);
router.delete('/:plateNo', _isBusManager.default, new _busController.default().deleteteBus);