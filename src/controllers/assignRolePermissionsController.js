import AssignedPermissions from '../../sequelize/models/RolePermission'
import { development } from "../../sequelize/config/config.js";
import { Sequelize } from "sequelize";
import Roles from '../../sequelize/models/Role';
import Permissions from '../../sequelize/models/Permission';
let sequelize = new Sequelize(development);
let Role =Roles(sequelize, Sequelize)
let Permission =Permissions(sequelize, Sequelize)
let AssignPerm = AssignedPermissions(sequelize, Sequelize);

class AssignmentController{
    
    async assign(req, res) {
        // Validate request
        if (!req.body.role_id || !req.body.permission_id) {
      res.status(400).send({
          message: "You must provide a role and permission to be assigned"
        });
        return;
    }
    // Create a Permission
    const  { role_id, permission_id} = req.body
    // Save Permission in the database
    let role_availability = await Role.findOne({where: {id: role_id}})
    let permission_availability = await Permission.findOne({where: {id: permission_id}})
  
    if(!role_availability || !role_availability.dataValues.id===role_id || !permission_availability ||!permission_availability.dataValues.id===permission_id){
        res.status(404).send({
            message: "The Role or Permission provided are not available in our database!"
          });
          return;
    }else{
        const check_duplicates = await AssignPerm.findAll({where: {role_id: role_id, permission_id: permission_id}})
        if(check_duplicates){
            res.status(404).send({
                message: "Duplicate permission assignment detected! We can't do that."
              });
              return;
        }else{
            
            await AssignPerm.create({ role_id, permission_id, })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                    err.message || "Some error occurred while creating the Permission Assignment."
                });
            });
        }
     
    }
};

async findOneAssignPerm(req, res) {
    const id = req.params.id;
    await AssignPerm.findOne({where: { id: id }})
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find AssignPerm with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving AssignPerm with id=" + id
        });
      });
};


async findAllAssignPerms(req, res) {
    await AssignPerm.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving AssignPerms."
        });
      });
};

async updateAssignPerm(req, res) {
    const id = req.params.id;
    await AssignPerm.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "AssignPerm was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update AssignPerm with id=${id}. Maybe AssignPerm was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating AssignPerm with id=" + id
        });
      });
};

async deleteAssignPerm(req, res) {
    const id = req.params.id;
    await AssignPerm.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Role permission was revoked successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete AssignPerm with id=${id}. Maybe AssignPerm was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete AssignPerm with id=" + id
        });
      });
};

}
export {AssignmentController as default}
 