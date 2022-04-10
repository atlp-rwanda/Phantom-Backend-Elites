"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateToken;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv.default.config();

function generateToken(payload, expiresInPeriod) {
  const expiresInTime = expiresInPeriod || 24 * 60 * 60;

  const token = _jsonwebtoken.default.sign(payload, process.env.SECRET_KEY, {
    expiresIn: expiresInTime
  });

  return token;
}