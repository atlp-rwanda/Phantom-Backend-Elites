"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _verifyToken = _interopRequireDefault(require("../helpers/verifyToken"));

var _models = _interopRequireDefault(require("../../sequelize/models"));

const {
  Role,
  Token
} = _models.default;

const canUpdateProfile = async (req, res, next) => {
  if (!req?.headers?.authorization && !req?.headers['x-access-token'] && !req?.params.token) {
    return res.status(401).json({
      message: "You should be authenticated to access this!"
    });
  }

  const token = req?.headers?.authorization || req?.headers['x-access-token'] || req?.params.token;
  const id = req.params.id;
  const splitedToken = token.split(' ')[1];
  const tokenExist = await Token.findOne({
    where: {
      token: splitedToken,
      ownerId: id,
      status: "active"
    }
  });

  if (tokenExist) {
    let userRoleId = (0, _verifyToken.default)(splitedToken).role;
    let roleObject = await Role.findOne({
      where: {
        id: userRoleId
      }
    });
    let roleName = roleObject.name;

    if (!token) {
      return res.status(404).json({
        message: 'You are not authorized this!'
      });
    }

    if (roleName !== 'driver' && roleName !== 'operator') {
      return res.status(403).json({
        message: 'Only operators and drivers are allowed to update their profiles. Please sign in as an driver or operator!'
      });
    }

    next();
  } else {
    return res.status(404).json({
      message: 'You can only update your own profile. Try logging into your account!'
    });
  }
};

var _default = canUpdateProfile;
exports.default = _default;