"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendSuccessResponse = exports.sendErrorResponse = void 0;

const sendErrorResponse = (res, code, errorMessage, e = null) => res.status(code).json({
  status: 'error',
  error: errorMessage,
  e: e?.toString()
});

exports.sendErrorResponse = sendErrorResponse;

const sendSuccessResponse = (res, code, data, message = 'Successful') => res.status(code).json({
  status: 'success',
  data,
  message
});

exports.sendSuccessResponse = sendSuccessResponse;