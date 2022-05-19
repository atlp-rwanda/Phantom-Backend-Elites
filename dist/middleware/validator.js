"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _models = _interopRequireDefault(require("../../sequelize/models"));

const {
  Role,
  User,
  Permission
} = _models.default;

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

      return res.status(400).send(errors);
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

    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    });
    if (user) return res.status(409).json({
      message: "User email already exist"
    });
    const role = await Role.findOne({
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

      return res.status(400).send(errors);
    }

    const role = await Role.findOne({
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
      const role = await Role.findOne({
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

    const role = await Role.findOne({
      where: {
        id: req.body.assignedId
      }
    });
    if (!role) return res.status(400).json({
      message: "Assigned Role doesn't exist"
    });
    const driverPermissions = ['start', 'stop', 'change', 'edit', 'view'];
    const adminPermissions = ['create', 'udpate', 'delete', 'view', 'edit'];
    const operatorPermission = ['create', 'udpate', 'delete', 'view', 'register', 'remove'];

    switch (role.name) {
      case "driver":
        if (!driverPermissions.includes(req.body.name)) return res.status(400).json({
          message: "Driver is not allowed to have that permission"
        });

      case "operator":
        if (!adminPermissions.includes(req.body.name)) return res.status(400).json({
          message: "Operator is not allowed to have that permission"
        });

      case "admin":
        if (!adminPermissions.includes(req.body.name)) return res.status(400).json({
          message: "Administrator is not allowed to have that permission"
        });

      default:
        next();
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

      return res.status(400).send(errors);
    }

    const permission = await Permission.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!permission) return res.status(400).json({
      message: "Permission you are trying to update doesn't exists"
    });
    const role = await Role.findOne({
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

      return res.status(400).send(errors);
    }

    next();
  }

}

var _default = new Validate();

exports.default = _default;