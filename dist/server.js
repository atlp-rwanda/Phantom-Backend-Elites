"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _auth = _interopRequireDefault(require("./routes/auth.js"));

var _express = _interopRequireDefault(require("express"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));

var _cors = _interopRequireDefault(require("cors"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _i18nConf = _interopRequireDefault(require("./config/i18nConf"));

var _i18nextExpressMiddleware = _interopRequireDefault(require("i18next-express-middleware"));

var _roleRoutes = _interopRequireDefault(require("./routes/roleRoutes.js"));

var _permissionRoutes = _interopRequireDefault(require("./routes/permissionRoutes.js"));

var _userRoute = _interopRequireDefault(require("./routes/userRoute.js"));

var _morgan = _interopRequireDefault(require("morgan"));

var _homeRoutes = _interopRequireDefault(require("./routes/homeRoutes.js"));

var _index = _interopRequireDefault(require("../sequelize/models/index"));

var _passwordResetRoutes = _interopRequireDefault(require("./routes/passwordResetRoutes.js"));

/*jslint devel: true */

/* eslint-env browser */
_dotenv.default.config();

const app = (0, _express.default)();
exports.default = app;
app.use('/', _auth.default); // eslint-disable-next-line no-undef

const PORT = process.env.PORT || 3006;
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Phantom-app",
      version: "1.0.0",
      description: "Phantom-app for user which will help to reduce route congestion."
    },
    servers: [{
      url: `http://localhost:3000`
    }, {
      url: `https://phantom-pipe-add-expres-fk8xcu.herokuapp.com`
    }]
  },
  apis: ["./src/routes/*.js"]
};
const specs = (0, _swaggerJsdoc.default)(options);
app.use(_i18nextExpressMiddleware.default.handle(_i18nConf.default, {
  ignoreRoutes: ["/foo"],
  //ignore route from being internationalize ex:/foo
  removeLngFromUrl: false
}));
app.get("/junior", (req, res) => {
  res.json("Introduction to the ones and best.");
});
app.use("/api-docs", _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(specs));
app.use((0, _cors.default)());
app.use(_express.default.json());
app.use('/api/v1/users', _userRoute.default);
app.use('/api/v1/roles', _roleRoutes.default);
app.use('/api/v1/auth', _auth.default);
app.use('/api/v1/permissions', _permissionRoutes.default);
app.use('/api/v1/reset-password', _passwordResetRoutes.default);
app.use((0, _morgan.default)());
app.use(_homeRoutes.default);

_index.default.sequelize.sync({
  alter: false
}).then(() => {
  console.log('Database Connected!');
  app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  });
});