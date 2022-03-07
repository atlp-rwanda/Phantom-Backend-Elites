import Roles from '../../sequelize/models/role'
import { development } from "../../sequelize/config/config.js";
import { Sequelize } from "sequelize";
let sequelize = new Sequelize(development);
let Role = Roles(sequelize, Sequelize);

class RoleController{

  async createRole(req, res) {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({
        message: "Name can not be empty!"
      });
      return;
    }
    // Create a Role
    const  { name } = req.body
    // Save Role in the database
    console.log(req.body)
    await Role.create({ name, })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Role."
        });
      });
};


async findOneRole(req, res) {
    const id = req.params.id;
    Role.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Role with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Role with id=" + id
        });
      });
};

async findAllRoles(req, res) {
    Role.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Roles."
        });
      });
};

async updateRole(req, res) {
    const id = req.params.id;
    Role.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Role was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Role with id=${id}. Maybe Role was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Role with id=" + id
        });
      });
};

async deleteRole(req, res) {
    const id = req.params.id;
    Role.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Role was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Role with id=${id}. Maybe Role was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Role with id=" + id
        });
      });
};

}
export default RoleController
 