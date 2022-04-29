"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

require("dotenv/config");

function sendEmail(output, email) {
  let transporter = _nodemailer.default.createTransport({
    service: 'gmail',
    host: process.env.TRANSPORTER_HOST,
    port: process.env.TRANSPORTER_PORT,
    secure: process.env.SECURE,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_EMAIL_P
    }
  });

  let mailOptions = {
    from: process.env.USER_EMAIL,
    // sender address
    to: email,
    // list of receivers
    subject: "Successfully Registered",
    // Subject line
    html: output // html body

  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }

    res.render("contact", {
      msg: "Email has been sent"
    });
  });
}

var _default = sendEmail;
exports.default = _default;