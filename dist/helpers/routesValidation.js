"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

const validateRoute = route => {
  const schema = _joi.default.object({
    busStations: [_joi.default.array().items().min(2)] // assignedBuses: [
    //     Joi.array()
    // ]

  });

  return schema.validate(route);
};

var _default = validateRoute;
exports.default = _default;