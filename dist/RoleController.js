"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../../sequelize/models");

class RoleController {
  async createRole(req, res) {
    // Validate request
    if (!req.body.name) {
      res.status(400).json({
        message: "Name can not be empty!"
      });
      return;
    }

    const {
      name
    } = req.body;

    _models.Role.create({
      name
    }).then(data => {
      res.status(201).json({
        data,
        message: 'Role created successfully!'
      });
    }).catch(err => {
      res.status(500).json({
        message: err.message || "Some error occurred while creating the Role."
      });
    });
  }

  async findOneRole(req, res) {
    const id = req.params.id;

    _models.Role.findByPk(id).then(data => {
      res.status(200).json({
        data
      });
    }).catch(err => {
      res.status(500).json({
        message: err.message || "Error retrieving that Role"
      });
    });
  }

  async findAllRoles(req, res) {
    _models.Role.findAll().then(data => {
      res.status(200).json({
        message: 'List of all Roles',
        data
      });
    }).catch(err => {
      res.status(500).json({
        message: err.message || "Some error occurred while retrieving Roles."
      });
    });
  }

  async updateRole(req, res) {
    const id = req.params.id;

    _models.Role.update(req.body, {
      where: {
        id: id
      }
    }).then(num => {
      if (num == 1) {
        res.status(200).json({
          message: "Role was updated successfully."
        });
      } else {
        res.json({
          message: `Cannot update Role with id=${id}. Maybe Role was not found or req.body is empty!`
        });
      }
    }).catch(err => {
      res.status(500).json({
        message: "Error updating Role with id=" + id
      });
    });
  }

  async deleteRole(req, res) {
    const id = req.params.id;

    _models.Role.destroy({
      where: {
        id: id
      }
    }).then(num => {
      if (num == 1) {
        res.status(200).json({
          message: "Role was deleted successfully!"
        });
      } else {
        res.status(401).json({
          message: `Cannot delete Role with id=${id}. Maybe Role was not found!`
        });
      }
    }).catch(err => {
      res.status(500).json({
        message: "Could not delete Role with id=" + id
      });
    });
  }

}

var _default = RoleController;
exports.default = _default;