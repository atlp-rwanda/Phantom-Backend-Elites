"use strict";

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();

_dotenv.default.config();

const port = process.env.PORT | 3000;
app.get("/", (req, res, next) => {
  res.send("<h1>Welcome to phantom app</h1>");
});
app.listen(port, () => {
  console.log(`App is running on ${port}`);
});