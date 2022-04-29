"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _verifyToken = _interopRequireDefault(require("../helpers/verifyToken"));

var _models = _interopRequireDefault(require("../../sequelize/models"));

const {
  ResetToken,
  Token
} = _models.default;

const isAdmin = async (req, res, next) => {
  if (!req?.headers?.authorization && !req?.headers['x-access-token'] && !req?.params.token) {
    return res.status(401).json({
      message: "You should be authenticated to access this!"
    });
  }

  const token = req?.headers?.authorization || req?.headers['x-access-token'] || req?.params.token;
  const splitedToken = token.split(' ')[1];
  const tokenExist = await Token.findOne({
    where: {
      token: splitedToken
    }
  });

  if (tokenExist) {
    const status = tokenExist.status;

    if (status === 'active') {
      const userRoleId = (0, _verifyToken.default)(splitedToken).role;

      if (userRoleId !== 1) {
        return res.status(403).json({
          message: 'Please sign in as an admin!'
        });
      }

      next();
    } else {
      res.status(401).json({
        message: "You should be authenticated to access this!"
      });
    }
  } else {
    res.status(401).json({
      message: "There is no token for this user!"
    });
  }
};

var _default = isAdmin;
exports.default = _default;