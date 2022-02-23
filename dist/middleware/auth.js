"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _user = _interopRequireDefault(require("../models/user"));

require("dotenv/config");

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', ''); // const token = req.header('x-auth-token');

    const decoded = _jsonwebtoken.default.verify(token, process.env.SECRET_KEY); // const user = await User.findOne({_id:decoded._id});


    console.log(user);

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({
      message: 'Please authenticate...'
    });
    return;
  }
};

exports.default = auth;