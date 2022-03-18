import {Permission} from '../../sequelize/models'
// import { development } from "../../sequelize/config/config.js";
// import { Sequelize } from "sequelize";
// let sequelize = new Sequelize(development);
// let Permission = Permissions(sequelize, Sequelize);

class PermissionController{
    async findOnePermission(req, res) {
        const id = req.params.id;
        await Permission.findOne({where: { id: id }})
          .then(data => {
            if (data) {
              res.json(data);
            } else {
              res.status(404).json({
                message: `Cannot find Permission with id=${id}.`
              });
            }
          })
          .catch(err => {
            res.status(500).json({
              message: "Error retrieving Permission with id=" + id
            });
          });
    };

  async createPermission(req, res) {
    // Validate request
    if (!req.body.name) {
      res.status(400).json({
        message: "Name can not be empty!"
      });
      return;
    }
    // Create a Permission
    // const  { name, roleId, } = req.body
    console.log(req.body)
    const { assignedId, name } = req.body
    try {
      const newPermission = await Permission.create({ assignedId, name })

      res.status(201).json({
        message: "Permission created successfully",
        data: newPermission
      })

    }
    catch(error){
      res.status(500).json({
        error: "Some error occurred while creating the Permission."
      });
    }
    // Save Permission in the database
     
};



async findAllPermissions(req, res) {
    await Permission.findAll()
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(500).json({
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
          res.json({
            message: "Permission was updated successfully."
          });
        } else {
          res.json({
            message: `Cannot update Permission with id=${id}. Maybe Permission was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).json({
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
          res.json({
            message: "Permission was deleted successfully!"
          });
        } else {
          res.json({
            message: `Cannot delete Permission with id=${id}. Maybe Permission was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          message: "Could not delete Permission with id=" + id
        });
      });
};

}
export {PermissionController as default}
 