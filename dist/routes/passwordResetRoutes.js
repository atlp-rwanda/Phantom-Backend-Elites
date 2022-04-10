"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _resetPasswordController = _interopRequireDefault(require("../controllers/resetPasswordController.js"));

var _validator = _interopRequireDefault(require("../middleware/validator"));

// import isAdmin from "../middleware/isAdmin.js";
const router = _express.default.Router();

router.post("/link", new _resetPasswordController.default().createResetLink);
router.post("/new-password", _validator.default.resetPassword, new _resetPasswordController.default().resetPassword);
var _default = router;
exports.default = _default;