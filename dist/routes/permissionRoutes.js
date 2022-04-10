"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _isAdmin = _interopRequireDefault(require("../middleware/isAdmin.js"));

var _validator = _interopRequireDefault(require("../middleware/validator"));

var _PermissionController = _interopRequireDefault(require("../controllers/PermissionController.js"));

const router = _express.default.Router();

router.post("/", _isAdmin.default, _validator.default.createPermission, new _PermissionController.default().createPermission);
router.get("/", _isAdmin.default, new _PermissionController.default().findAllPermissions);
router.put("/:id", _isAdmin.default, _validator.default.updatePermission, new _PermissionController.default().updatePermission);
router.delete("/:id", _isAdmin.default, new _PermissionController.default().deletePermission);
router.get("/:id", _isAdmin.default, new _PermissionController.default().findOnePermission);
var _default = router;
exports.default = _default;