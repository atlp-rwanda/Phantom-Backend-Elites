const pool = require("../../db");
const operatorqueries = require("./operatorQueries");
require("dotenv").config();
// const sendEmail = require("../utils/sendEmail");
const nodemailer = require("nodemailer");

const getoperators = (req, res) => {
  pool.query(operatorqueries.getoperators, (error, results) => {
    if (error) throw error;
    res.status(200).json({
      status: "success",
      data: results.rows,
    });
  });
};

const getoperatorById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(operatorqueries.getoperatorById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json({
      status: "success",
      data: results.rows,
    });
  });
};

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

const addoperator = (req, res) => {
  const {
    fullNames,
    email,
    age,
    dob,
    phone_number,
    id_number,
    driver_licence,
    address,
  } = req.body;
  // check if email exists
  const password = getPassword();
  pool.query(operatorqueries.checkEmailExists, [email], (error, results) => {
    if (error) throw error;
    if (results.rows.length) {
      res.send("Email already exists.");
    } else {
      // add operator to db
      pool.query(
        operatorqueries.addoperator,
        [
          fullNames,
          email,
          age,
          dob,
          phone_number,
          id_number,
          driver_licence,
          address,
          password,
        ],
        async (error, results) => {
          if (error) throw error;
          const output = `
        <h2>Your account has been registered. you can login in</h2>
        <a href="http://localhost:3000/login">phantom app</a>
        <p>Use ${req.body.email} and your password ${password}</p>
    `;
          await sendEmail(output, req.body.email);
          res.status(201).json({
            status: "success",
            message: "operator Created Successfully!",
          });
        }
      );
    }
  });
};

const removeoperator = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(operatorqueries.getoperatorById, [id], (error, results) => {
    const nooperatorFound = !results.rows.length;
    if (nooperatorFound) {
      res.send("operator does not exist in the database.");
    } else {
      pool.query(operatorqueries.removeoperator, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json({
          status: "successful",
          message: "operator removed successfully.",
        });
      });
    }
  });
};

const updateoperator = (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;

  pool.query(queries.getoperatorById, [id], (error, results) => {
    if (error) throw error;
    const nooperatorFound = !results.rows.length;
    if (nooperatorFound) {
      res.send("operator does not exist in the database.");
    } else {
      pool.query(queries.updateoperator, [name, id], (error, results) => {
        if (error) throw error;
        res.status(200).json({
          status: "success",
          message: "operator updated successfully.",
        });
      });
    }
  });
};

module.exports = {
  getoperators,
  getoperatorById,
  addoperator,
  removeoperator,
  updateoperator,
};

function sendEmail(output, toEmail) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_EMAIL_P,
    },
  });
  let mailOptions = {
    from: process.env.USER_EMAIL, // sender address
    to: toEmail, // list of receivers
    subject: "Phantom account has been registered", // Subject line
    html: output, // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.render("contact", { msg: "Email has been sent" });
  });
}
