"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

var _sendEmail = _interopRequireDefault(require("../services/sendEmail.js"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _models = require("../../sequelize/models");

class ResetTokenController {
  async createResetLink(req, res) {
    let user = await _models.User.findOne({
      where: {
        email: req.body.email
      }
    });
    if (!user) return res.status(400).json({
      message: 'User can not be found!'
    });

    let fpSalt = _crypto.default.randomBytes(64).toString('base64');

    let expireDate = new Date(new Date().getTime() + 60 * 60 * 1000);
    const previousToken = await _models.ResetToken.findOne({
      where: {
        email: user.email
      }
    });

    if (previousToken) {
      await _models.ResetToken.destroy({
        where: {
          email: req.body.email
        }
      });
    }

    const data = await _models.ResetToken.create({
      email: user.email,
      expiration: expireDate,
      token: fpSalt,
      used: 0
    });
    const message = `
      <p>To reset your password, please click the link below.</p>
      <a href="http://${process.env.DOMAIN}api/v1/reset-password?token=${encodeURIComponent(data.token)}&email=${data.email}"> Reset Password </a>
      <p>Or use the following token</p>
      ${data.token}
      `;
    (0, _sendEmail.default)(message, data.email);
    res.status(200).json({
      message: `Your password reset link has successfully been sent to your email ${data.email}`,
      token: `${data.token}`
    });
    return data;
  }

  async resetPassword(req, res) {
    try {
      let tokenData = await _models.ResetToken.findOne({
        where: {
          token: req.body.token
        }
      });
      console.log(tokenData.email);

      if (!tokenData) {
        return res.status(404).json({
          message: 'Token has expired. Please try password reset again.'
        });
      }

      if (!req.body.password && !req.body.confirmPassword && !req.body.token) {
        return res.status(400).json({
          status: 'error',
          message: 'Password and reset-token should be provided. Please try again.'
        });
      }

      if (req.body.password === req.body.confirmPassword) {
        let newPassword = await _bcrypt.default.hash(req.body.password, 12);
        console.log(newPassword);
        await _models.User.update({
          password: newPassword
        }, {
          where: {
            email: tokenData.email
          }
        });
        return res.json({
          status: 'ok',
          message: 'Password reset. Please login with your new password.'
        });
      }
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: 'An error occured while trying to reset the password.'
      });
    }
  }

}

exports.default = ResetTokenController;