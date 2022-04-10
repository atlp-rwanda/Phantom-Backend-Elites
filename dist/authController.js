"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _generateToken = _interopRequireDefault(require("../helpers/generateToken"));

var _verifyToken = _interopRequireDefault(require("../helpers/verifyToken"));

var _models = require("../../sequelize/models");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

class AuthController {
  async login(req, res) {
    const user = await _models.User.findOne({
      where: {
        email: req.body.email
      }
    });
    if (!user) return res.status(400).json({
      message: "Wrong email detected!"
    });
    const isPasswordMatch = await _bcrypt.default.compare(req.body.password, user.password);

    if (isPasswordMatch) {
      const newToken = (0, _generateToken.default)({
        id: user.id,
        role: user.roleId
      });
      await _models.Token.create({
        token: newToken,
        ownerId: user.id,
        status: "active"
      }).then(data => {
        const accessor = user.dataValues;
        res.status(200).json({
          message: "A token for your session has been saved!",
          user: {
            id: accessor.id,
            firstName: accessor.firstName,
            lastName: accessor.lastName,
            email: accessor.email,
            createdAt: accessor.createdAt,
            updatedAt: accessor.updatedAt,
            role: accessor.roleId
          },
          token: data.token
        });
      });
    } else {
      res.status(404).json({
        message: "Incorrect email or password"
      });
    }
  }

  async logout(req, res) {
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
        await _models.Token.update({
          status: 'expired'
        }, {
          where: {
            token: splitedToken
          }
        });
        res.status(200).json({
          message: 'Logged out successfully!'
        });
      } else {
        res.status(404).json({
          message: "There is no runing session for this user!"
        });
      }
    } else {
      res.status(404).json({
        message: "There is no token for this user!"
      });
    }
  }

}

const authController = new AuthController();
exports.default = authController;