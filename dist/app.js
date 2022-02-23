"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _user = _interopRequireDefault(require("./models/user"));

var _sequelize = _interopRequireDefault(require("sequelize"));

var _i18nConf = _interopRequireDefault(require("./config/i18nConf"));

var _userRoute = _interopRequireDefault(require("./routers/userRoute"));

var _i18nextExpressMiddleware = _interopRequireDefault(require("i18next-express-middleware"));

const app = (0, _express.default)();
app.use(_i18nextExpressMiddleware.default.handle(_i18nConf.default, {
  ignoreRoutes: ["/foo"],
  //ignore route from being internationalize ex:/foo
  removeLngFromUrl: false
}));
app.use(_express.default.json());
app.use('/api/v1/', _userRoute.default);
var _default = app;
exports.default = _default;