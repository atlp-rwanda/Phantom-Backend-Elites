"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

const router = _express.default.Router();
/**
 * @swagger
 * /:
 *   get:
 *     summary: Return warm welcome message to the phantom web app user.
 *     responses:
 *       200:
 *         description: Welcome message to welcome to the phantom web app.
 */


exports.default = router;
router.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    data: "Welcome to phantom app backend side"
  });
});