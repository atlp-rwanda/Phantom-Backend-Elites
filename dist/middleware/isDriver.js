"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = _interopRequireDefault(require("../../sequelize/models"));

var _verifyToken = _interopRequireDefault(require("../helpers/verifyToken"));

const {
  Token
} = _models.default;

const isDriver = async (req, res, next) => {
  const {
    id
  } = req.user;
  const userToken = await Token.findOne({
    where: {
      ownerId: id,
      status: "active"
    }
  });

  if (!userToken) {
    return res.status(403).json({
      status: 403,
      message: res.json('The token is not exist!')
    });
  }

  const userRole = (0, _verifyToken.default)(userToken.token).role;

  if (userRole !== 'driver' || userRole !== 'admin') {
    return res.status(403).json({
      status: 403,
      message: res.json('Please sign in as an driver!')
    });
  }

  next();
};

var _default = isDriver;
exports.default = _default;