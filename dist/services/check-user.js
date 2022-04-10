"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkAuthentication = checkAuthentication;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function checkAuthentication(req, res, next) {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      throw new Error("You are not logged in! Please log in to get access.");
    }

    const decoded = _jsonwebtoken.default.verify(token, process.env.SECRET_KEY);

    if (!decoded) {
      throw new Error("Your credentials does not exist in our database.");
    }

    if (decoded.role !== "admin") {
      throw new Error("Your role does not allow you to perform this action.");
    }

    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: error.message
    });
  }
}