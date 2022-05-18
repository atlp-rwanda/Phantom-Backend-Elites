"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _joi = _interopRequireDefault(require("joi"));

var _models = require("../../sequelize/models");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

class Validate {
  async createBus(req, res, next) {
    const schema = _joi.default.object({
      brand: _joi.default.string().required(),
      plateNo: _joi.default.string().regex(/^RA[A-Z][0-9]{3}[A-Z]/).required(),
      driver: _joi.default.number(),
      seats: _joi.default.number().required().min(3),
      status: _joi.default.string().required()
    });

    const {
      error,
      value
    } = schema.validate(req.body, {
      abortEarly: false
    });

    if (error) {
      const {
        details
      } = error;
      const errors = {};

      for (let item of details) errors[item.path[0]] = item.message;

      if (errors.hasOwnProperty("plateNo")) errors["plateNo"] = "PlateNo is required with format like this RAA111B";
      return res.status(400).json(errors);
    }

    const bus = await _models.Bus.findOne({
      where: {
        plateNo: req.body.plateNo
      }
    });
    if (bus) return res.status(409).json({
      message: "Bus already exists"
    });

    if (req.body.driver) {
      const user = await _models.User.findOne({
        where: {
          id: req.body.driver
        }
      });
      if (!user) return res.status(409).json({
        message: "Assigned Driver doesn't exist"
      });
      const role = await _models.Role.findOne({
        where: {
          id: user.roleId
        }
      });
      if (!role) return res.status(400).json({
        message: "Unknown Driver"
      });
      if (role.name != 'driver') return res.status(400).json({
        message: "Assigned Used is not a driver"
      });
    }

    next();
  }

  async updateRole(req, res, next) {
    const schema = _joi.default.object({
      brand: _joi.default.string(),
      plateNo: _joi.default.string().required(),
      driver: _joi.default.number(),
      seats: _joi.default.number(),
      status: _joi.default.string()
    });

    const {
      error,
      value
    } = schema.validate(_objectSpread({
      plateNo: req.params.plateNo
    }, req.body), {
      abortEarly: false
    });

    if (error) {
      const {
        details
      } = error;
      const errors = {};

      for (let item of details) errors[item.path[0]] = item.message;

      return res.status(400).send(errors);
    }

    try {
      const bus = await _models.Bus.findOne({
        where: {
          plateNo: req.params.plateNo
        }
      });
      if (!bus) return res.status(400).json({
        message: "Bus you want to update doesn't exist"
      });

      if (req.body.driver) {
        const user = await _models.User.findOne({
          where: {
            id: req.body.driver
          }
        });
        if (!user) return res.status(409).json({
          message: "Assigned Driver doesn't exist"
        });
        const role = await _models.Role.findOne({
          where: {
            id: req.body.driver
          }
        });
        if (!role) return res.status(400).json({
          message: "Unknown Driver"
        });
        if (role.name != 'driver') return res.status(400).json({
          message: "Assigned Used is not a driver"
        });
      }

      next();
    } catch (error) {
      return res.status(400).json({
        message: "Bus you want to update doesn't exist"
      });
    }
  }

}

var _default = new Validate();

exports.default = _default;