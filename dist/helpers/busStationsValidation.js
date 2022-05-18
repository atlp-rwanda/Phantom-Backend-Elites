"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

const validateBusStation = busStation => {
  const schema = _joi.default.object({
    busStationName: _joi.default.string().required(),
    coordinates: _joi.default.string().min(36).max(43).required()
  });

  return schema.validate(busStation);
};

var _default = validateBusStation;
exports.default = _default;