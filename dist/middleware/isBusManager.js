"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _verifyToken = _interopRequireDefault(require("../helpers/verifyToken"));

var _models = require("../../sequelize/models");

const isBusManager = async (req, res, next) => {
  try {
    if (!req?.headers?.authorization && !req?.headers['x-access-token'] && !req?.params.token) {
      return res.status(401).json({
        message: "You should be authenticated to access this!"
      });
    }

    const token = req?.headers?.authorization || req?.headers['x-access-token'] || req?.params.token;
    const splitedToken = token.split(' ')[1];
    const tokenExist = await _models.Token.findOne({
      where: {
        token: splitedToken
      }
    });

    if (tokenExist) {
      const status = tokenExist.status;

      if (status === 'active') {
        const userRoleId = (0, _verifyToken.default)(splitedToken).role;
        const user = await _models.User.findOne({
          where: {
            roleId: userRoleId
          }
        });
        if (!user) return res.status(400).json({
          message: "Please sign in as an admin or operator!"
        });
        const role = await _models.Role.findOne({
          where: {
            id: userRoleId
          }
        });
        if (!role) return res.status(400).json({
          message: "Please sign in as an admin or operator!"
        });
        const allowedUser = ['operator', 'admin'];

        if (!allowedUser.includes(role.name)) {
          return res.status(403).json({
            message: 'Please sign in as an admin!'
          });
        }

        next();
      } else {
        res.status(404).json({
          message: "You should be authenticated to access this!"
        });
      }
    } else {
      res.status(404).json({
        message: "There is no token for this user!"
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "There is no token for this user!"
    });
  }
};

var _default = isBusManager;
exports.default = _default;