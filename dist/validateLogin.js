"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sinon = require("sinon");

var _default = new class ValidateLogin {
  fields(req, res, next) {
    try {
      const checkNull = req.body.email == undefined || req.body.password == undefined ? true : false;

      if (checkNull) {
        throw new Error('There is missing field');
      }

      if (!req.body.email) {
        throw new Error('Email field can\'t be empty');
      }

      if (!req.body.password) {
        throw new Error('Password field can\'t be empty');
      }

      const isEmailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email);

      if (!isEmailValid) {
        throw new Error('You have entered an invalid email address!');
      }

      next();
    } catch (error) {
      res.send({
        message: error.message
      });
    }
  }

}();

exports.default = _default;