"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

require("dotenv/config");

var _createPassword = _interopRequireDefault(require("../services/createPassword.js"));

var _sendEmail = _interopRequireDefault(require("../services/sendEmail.js"));

var _models = require("../../sequelize/models");

class UserController {
  async createUser(req, res) {
    const userpassword = (0, _createPassword.default)();
    const password = await _bcrypt.default.hash(userpassword, 12);

    _models.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password,
      roleId: req.body.roleId,
      gender: req.body.gender
    }).then(async data => {
      const output = `
            <h3>Hi ${req.body.firstName}</h3>
            <h3>Welcome to Phantom!</h3>
            <h3>You have been successfully registered. You can login using the following credentials:</h3>
            <p><span style="font-weight:bold">Email:</span>${req.body.email} </p>
            <p><span style="font-weight:bold">Password:</span>${userpassword}</p>
        `;
      (0, _sendEmail.default)(output, data.email);
      res.status(201).json({
        message: "User created successfully!",
        data
      });
    }).catch(err => {
      res.status(500).json({
        message: err.message || "Some error occurred while creating the User."
      });
    });
  }

  async findOneUser(req, res) {
    const id = req.params.id;

    _models.User.findByPk(id, {
      attributes: {
        exclude: ['password']
      }
    }).then(data => {
      if (data) {
        res.json({
          data
        });
      } else {
        res.status(404).json({
          message: `Cannot find User with id=${id}.`
        });
      }
    }).catch(err => {
      res.status(500).json({
        message: "Error retrieving User with id=" + id
      });
    });
  }

  async findAllUsers(req, res) {
    _models.User.findAll({
      attributes: {
        exclude: ['password']
      }
    }).then(data => {
      console.log(data);
      res.status(200).json(data);
    }).catch(err => {
      res.status(500).json({
        message: err.message || "Some error occurred while retrieving Users."
      });
    });
  }

  async updateProfile(req, res) {
    const id = req.params.id;

    _models.User.update(req.body, {
      where: {
        id: id
      }
    }).then(num => {
      if (num == 1) {
        res.json({
          message: "Profile was updated successfully."
        });
      } else {
        res.json({
          message: `Cannot update this profile. Maybe User was not found or req.body is empty!`
        });
      }
    }).catch(err => {
      res.status(500).json({
        message: "Invalid inputs detected, and we cannot update your profile id=" + id
      });
    });
  }

  async deleteUser(req, res) {
    const id = req.params.id;

    _models.User.destroy({
      where: {
        id: id
      }
    }).then(num => {
      if (num == 1) {
        res.json({
          message: "User was deleted successfully!"
        });
      } else {
        res.json({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      }
    }).catch(err => {
      res.status(500).json({
        message: "Could not delete User with id=" + id
      });
    });
  }

}

var _default = UserController;
exports.default = _default;