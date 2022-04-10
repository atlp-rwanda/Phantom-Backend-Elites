"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sendResponse = require("../utils/sendResponse.js");

var _models = _interopRequireDefault(require("../models"));

const {
  Role,
  Permission
} = _models.default;

var _default = permission => async (req, res, next) => {
  const access = await Permission.findOne({
    where: {
      name: permission
    },
    include: [{
      attributes: ['id', 'name'],
      model: Role,
      as: 'roles',
      through: {
        attributes: []
      }
    }]
  });

  if (await req.userData.hasPermissionTo(access)) {
    return next();
  }

  console.error('You do not have the authorization to access this.');
  return (0, _sendResponse.sendErrorResponse)(res, 403, 'You do not have the authorization to access this');
};

exports.default = _default;