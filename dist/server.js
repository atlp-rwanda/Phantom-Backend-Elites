"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.get("/", (req, res, next) => {
  res.send("<h1>Welcome to phantom app</h1>");
});