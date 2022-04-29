"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _i18next.default;
  }
});

var _path = _interopRequireDefault(require("path"));

var _i18next = _interopRequireDefault(require("i18next"));

var _i18nextExpressMiddleware = _interopRequireDefault(require("i18next-express-middleware"));

var _i18nextNodeFsBackend = _interopRequireDefault(require("i18next-node-fs-backend"));

var _i18nextBrowserLanguagedetector = _interopRequireDefault(require("i18next-browser-languagedetector"));

_i18next.default.use(_i18nextNodeFsBackend.default).use(_i18nextExpressMiddleware.default.LanguageDetector).init({
  fallbackLng: 'en',
  preload: ['en', 'fr'],
  backend: {
    loadPath: _path.default.join(__dirname, '../public/locales/{{lng}}.json')
  },
  detection: {
    order: ["header", "htmlTag", "querystring", "cookie", "path"],
    caches: ["cookie"]
  }
}, (err, t) => {
  if (err) return console.log('something went wrong loading', err);
});