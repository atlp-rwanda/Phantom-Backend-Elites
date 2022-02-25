const express = require("express");
const router = express.Router();
const db = require("..db");
const User = require("../models/userModel");
const Sequelize = require("sequelize");
const nodemailer = require("nodemailer");

const Op = Sequelize.Op;

function getPassword() {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+?><:{}[]";
  var passwodLength = 16;
  var password = "";

  for (var i = 0; i < passwodLength; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }
  return password;
}

router.post("/", (req, res) => {
  let {
    firstName,
    lastName,
    email,
    role,
  } = req.body;
  let errors = [];
  const password = getPassword();

  // Validate Fields
  if (!firstName) {
    errors.push({ text: "Please add a name" });
  }
  if (!lastName) {
    errors.push({ text: "Please add some lastName" });
  }
  if (!email) {
    errors.push({ text: "Please add a email" });
  }
  if (!role) {
    errors.push({ text: "Please add a role" });
  }
 

  // Check for errors
  if (errors.length > 0) {
    res.status(401).json({
      status: "failed",
      errors,
      message: `User was not able to be registered as ${role}.`,
      enteredData: {
        firstName,
        lastName,
        email,
        role,
      },
    });
  } else {
    User.create({
      firstName,
      lastName,
      email,
      role,
      password,
    })
      .then((results) => {
        // console.log(results);
        let success = "successful";
        const output = `
        <h2>Your account has been registered. you can login in</h2>
        <a href="http://localhost:3000/login">phantom app</a>
        <p>Use ${req.body.email} and your password ${password}</p>
    `;
        sendEmail(output, email);
        return results;
      })
      .then((result) => {
        res.status(201).json({
          status: "success",
          message: `User registered as ${role} successfully!!.`,
          results: result,
        });
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json({
          error: err.message,
        });
      });
  }
});

// function sendEmail(output, toEmail) {
//   let transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false,
//     auth: {
//       user: process.env.USER_EMAIL,
//       pass: process.env.USER_EMAIL_P,
//     },
//   });
//   let mailOptions = {
//     from: process.env.USER_EMAIL, // sender address
//     to: toEmail, // list of receivers
//     subject: "Phantom account has been registered", // Subject line
//     html: output, // html body
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       return console.log(error);
//     }
//     console.log("Message sent: %s", info.messageId);
//     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

//     res.render("contact", { msg: "Email has been sent" });
//   });
// }

module.exports = router;
