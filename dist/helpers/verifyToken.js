"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = verifyToken;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv.default.config();

function verifyToken(token) {
  try {
    const decode = _jsonwebtoken.default.verify(token, process.env.SECRET_KEY);

    return decode;
  } catch (error) {
    return error.message;
  }
}