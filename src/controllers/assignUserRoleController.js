import AssignedRoles from '../../sequelize/models/UserRole'
import { development } from "../../sequelize/config/config.js";
import { Sequelize } from "sequelize";
import Roles from '../../sequelize/models/Role';
import Users from '../../sequelize/models/user';
let sequelize = new Sequelize(development);
let Role =Roles(sequelize, Sequelize)
let User =Users(sequelize, Sequelize)
let AssignRole = AssignedRoles(sequelize, Sequelize);

class AssignmentController{
    
    async assign(req, res) {
        // Validate request
        if (!req.body.role_id || !req.body.user_id) {
      res.status(400).send({
          message: "You must provide a role and user to be assigned"
        });
        return;
    }
    // Create a user
    const  { role_id, user_id} = req.body
    // Save user in the database
    let role_availability = await Role.findOne({where: {id: role_id}})
    let user_availability = await User.findOne({where: {id: user_id}})
  
    if(!role_availability || !role_availability.dataValues.id===role_id || !user_availability ||!user_availability.dataValues.id===user_id){
        res.status(404).send({
            message: "The Role or user provided are not available in our database!"
          });
          return;
    }else{
        const check_duplicates = await AssignRole.findAll({where: {role_id: role_id, user_id: user_id}})
        if(check_duplicates){
            res.status(404).send({
                message: "Duplicate user role assignment detected! We can't do that."
              });
              return;
        }else{
            
            await AssignRole.create({ role_id, user_id, })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                    err.message || "Some error occurred while creating the user Assignment."
                });
            });
        }
     
    }
};

async findOneAssignRole(req, res) {
    const id = req.params.id;
    await AssignRole.findOne({where: { id: id }})
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find AssignRole with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving AssignRole with id=" + id
        });
      });
};


async findAllAssignRoles(req, res) {
    await AssignRole.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving AssignRoles."
        });
      });
};

async updateAssignRole(req, res) {
    const id = req.params.id;
    await AssignRole.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "AssignRole was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update AssignRole with id=${id}. Maybe AssignRole was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating AssignRole with id=" + id
        });
      });
};

async deleteAssignRole(req, res) {
    const id = req.params.id;
    await AssignRole.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Role user was revoked successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete AssignRole with id=${id}. Maybe AssignRole was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete AssignRole with id=" + id
        });
      });
};

}
export {AssignmentController as default}
 