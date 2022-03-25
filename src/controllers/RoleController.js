import {Role} from '../../sequelize/models'


class RoleController{

  async createRole(req, res) {
    // Validate request
    if (!req.body.name) {
      res.status(400).json({
        message: "Name can not be empty!"
      });
      return;
    }
    const  { name } = req.body
    Role.create({ name })
      .then(data => {
        res.status(201).json({data, message: 'Role created successfully!'});
      })
      .catch(err => {
        res.status(500).json({
          message:
            err.message || "Some error occurred while creating the Role."
        });
      });
};


async findOneRole(req, res) {
    const id = req.params.id;
    Role.findByPk(id)
      .then(data => {
          res.status(200).json({data});
        }).catch(err => {
        res.status(500).json({
          message: err.message || "Error retrieving that Role" 
        });
      });
};

async findAllRoles(req, res) {
    Role.findAll()
      .then(data => {
        res.status(200).json({message: 'List of all Roles',data});
      })
      .catch(err => {
        res.status(500).json({
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
          res.status(200).json({
            message: "Role was updated successfully."
          });
        } else {
          res.json({
            message: `Cannot update Role with id=${id}. Maybe Role was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).json({
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
          res.status(200).json({
            message: "Role was deleted successfully!"
          });
        } else {
          res.status(401).json({
            message: `Cannot delete Role with id=${id}. Maybe Role was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          message: "Could not delete Role with id=" + id
        });
      });
};

}
export default RoleController
 