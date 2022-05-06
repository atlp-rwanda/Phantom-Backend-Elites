"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _models = require("../../sequelize/models");

class Validate {
  loginFields(req, res, next) {
    const schema = _joi.default.object({
      email: _joi.default.string().required().email({
        minDomainSegments: 2
      }),
      password: _joi.default.string().required()
    });

    const {
      error,
      value
    } = schema.validate(req.body, {
      abortEarly: false
    });

    if (error) {
      const {
        details
      } = error;
      const errors = {};

      for (let item of details) errors[item.path[0]] = item.message;

      return res.status(400).json(errors);
    }

    next();
  }

  async userFields(req, res, next) {
    const schema = _joi.default.object({
      email: _joi.default.string().required().email({
        minDomainSegments: 2
      }),
      firstName: _joi.default.string().required(),
      lastName: _joi.default.string().required(),
      roleId: _joi.default.number().min(2).required().messages({
        "number.min": "Choose another role"
      }),
      dateofbirth: _joi.default.string(),
      gender: _joi.default.string().required(),
      address: _joi.default.string()
    });

    const {
      error,
      value
    } = schema.validate(req.body, {
      abortEarly: false
    });

    if (error) {
      const {
        details
      } = error;
      const errors = {};

      for (let item of details) errors[item.path[0]] = item.message;

      return res.status(400).json(errors);
    }

    const user = await _models.User.findOne({
      where: {
        email: req.body.email
      }
    });
    if (user) return res.status(409).json({
      message: "User email already exist"
    });
    const role = await _models.Role.findOne({
      where: {
        id: req.body.roleId
      }
    });
    if (!role) return res.status(404).json({
      message: "Role doesn't exist"
    });
    next();
  }

  async createRole(req, res, next) {
    const schema = _joi.default.object({
      name: _joi.default.string().required()
    });

    const {
      error,
      value
    } = schema.validate(req.body, {
      abortEarly: false
    });

    if (error) {
      const {
        details
      } = error;
      const errors = {};

      for (let item of details) errors[item.path[0]] = item.message;

      return res.status(400).json(errors);
    }

    const role = await _models.Role.findOne({
      where: {
        name: req.body.name.toLowerCase()
      }
    });
    if (role) return res.status(400).json({
      message: "Role already exist"
    });
    const roles = ['driver', 'operator', 'admin'];

    if (!roles.includes(req.body.name)) {
      return res.status(400).json({
        message: "Unknow role can't be created"
      });
    }

    next();
  }

  async updateRole(req, res, next) {
    const schema = _joi.default.object({
      name: _joi.default.string().required()
    });

    const {
      error,
      value
    } = schema.validate(req.body, {
      abortEarly: false
    });

    if (error) {
      const {
        details
      } = error;
      const errors = {};

      for (let item of details) errors[item.path[0]] = item.message;

      return res.status(400).send(errors);
    }

    try {
      const role = await _models.Role.findOne({
        where: {
          id: req.params.id
        }
      });
      if (!role) return res.status(400).json({
        message: "Role you want to update doesn't exist"
      });
      next();
    } catch (error) {
      return res.status(400).json({
        message: "Role you want to update doesn't exist"
      });
    }
  }

  async createPermission(req, res, next) {
    const schema = _joi.default.object({
      name: _joi.default.string().required(),
      assignedId: _joi.default.number().required()
    });

    const {
      error,
      value
    } = schema.validate(req.body, {
      abortEarly: false
    });

    if (error) {
      const {
        details
      } = error;
      const errors = {};

      for (let item of details) errors[item.path[0]] = item.message;

      return res.status(400).send(errors);
    }

    const role = await _models.Role.findOne({
      where: {
        id: req.body.assignedId
      }
    });
    if (!role) return res.status(400).json({
      message: "Assigned Role doesn't exist"
    });
    const driverPermissions = ['start', 'stop', 'change', 'edit', 'view'];
    const adminPermissions = ['create', 'update', 'delete', 'view', 'edit'];
    const operatorPermission = ['create', 'update', 'delete', 'view', 'register', 'remove'];

    switch (role.name) {
      case "driver":
        if (!driverPermissions.includes(req.body.name)) return res.status(400).json({
          message: "Driver is not allowed to have that permission"
        });
        break;

      case "operator":
        if (!operatorPermission.includes(req.body.name)) return res.status(400).json({
          message: "Operator is not allowed to have that permission"
        });
        break;

      case "admin":
        if (!adminPermissions.includes(req.body.name)) return res.status(400).json({
          message: "Administrator is not allowed to have that permission"
        });
        break;

      default:
        return res.status(400).json({
          message: "Unknown user"
        });
    }
  }

  async updatePermission(req, res, next) {
    const schema = _joi.default.object({
      id: _joi.default.number().required()
    });

    const {
      error,
      value
    } = schema.validate({
      id: req.params.id
    }, {
      abortEarly: false
    });

    if (error) {
      const {
        details
      } = error;
      const errors = {};

      for (let item of details) errors[item.path[0]] = item.message;

      return res.status(400).json(errors);
    }

    const permission = await _models.Permission.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!permission) return res.status(400).json({
      message: "Permission you are trying to update doesn't exists"
    });
    const role = await _models.Role.findOne({
      where: {
        id: req.body.assignedId
      }
    });
    if (!role) return res.status(400).json({
      message: "Assigned Role doesn't exist"
    });
    next();
  }

  async resetPassword(req, res, next) {
    const schema = _joi.default.object({
      token: _joi.default.string().required(),
      password: _joi.default.string().required(),
      confirmPassword: _joi.default.string().required()
    });

    const {
      error,
      value
    } = schema.validate(req.body, {
      abortEarly: false
    });

    if (error) {
      const {
        details
      } = error;
      const errors = {};

      for (let item of details) errors[item.path[0]] = item.message;

      return res.status(400).json(errors);
    }

    next();
  }

}

var _default = new Validate();

exports.default = _default;