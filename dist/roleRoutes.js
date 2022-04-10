"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _isAdmin = _interopRequireDefault(require("../middleware/isAdmin.js"));

var _RoleController = _interopRequireDefault(require("../controllers/RoleController.js"));

var _validator = _interopRequireDefault(require("../middleware/validator"));

const router = _express.default.Router();

router.post("/", _isAdmin.default, new _RoleController.default().createRole);
router.get("/", _isAdmin.default, new _RoleController.default().findAllRoles);
router.put("/:id", _validator.default.updateRole, _isAdmin.default, new _RoleController.default().updateRole);
router.delete("/:id", _isAdmin.default, new _RoleController.default().deleteRole);
router.get("/:id", _isAdmin.default, new _RoleController.default().findOneRole);
var _default = router;
exports.default = _default;