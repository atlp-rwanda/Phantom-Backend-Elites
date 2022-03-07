import Permissions from '../../sequelize/models/Permission'
import { development } from "../../sequelize/config/config.js";
import { Sequelize } from "sequelize";
let sequelize = new Sequelize(development);
let Permission = Permissions(sequelize, Sequelize);

class PermissionController{
    async findOnePermission(req, res) {
        const id = req.params.id;
        await Permission.findOne({where: { id: id }})
          .then(data => {
            if (data) {
              res.send(data);
            } else {
              res.status(404).send({
                message: `Cannot find Permission with id=${id}.`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Error retrieving Permission with id=" + id
            });
          });
    };

  async createPermission(req, res) {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({
        message: "Name can not be empty!"
      });
      return;
    }
    // Create a Permission
    // const  { name, roleId, } = req.body
    const { assignedId, name } = req.body
    try {
      const newPermission = await Permission.create({ assignedId, name })

      res.status(201).json({
        message: "Permission created successfully",
        data: newPermission
      })

    }
    catch(error){
      res.status(500).send({
        error: "Some error occurred while creating the Permission."
      });
    }
    // Save Permission in the database

    
    
      
};



async findAllPermissions(req, res) {
    await Permission.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Permissions."
        });
      });
};

async updatePermission(req, res) {
    const id = req.params.id;
    await Permission.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Permission was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Permission with id=${id}. Maybe Permission was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Permission with id=" + id
        });
      });
};

async deletePermission(req, res) {
    const id = req.params.id;
    await Permission.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Permission was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Permission with id=${id}. Maybe Permission was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Permission with id=" + id
        });
      });
};

}
export {PermissionController as default}
 