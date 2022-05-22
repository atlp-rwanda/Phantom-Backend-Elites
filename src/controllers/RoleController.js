import { Role } from '../../sequelize/models';


class RoleController {

  async createRole(req, res) {
    // Validate request
    const { name } = req.body;
    if (!name) {
      res.status(400).json({
        message: "Name can not be empty!"
      });
      return;
    }

    // IS ROLE EXISTS?
    const roleExist = await Role.findOne({ where: { name } });
    if (roleExist) return res.status(409).json({ message: 'Role already exists' });

    Role.create({ name })
      .then(data => {
        res.status(201).json({ data, message: 'Role created successfully!' });
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
        res.status(200).json({ data });
      }).catch(err => {
        res.status(500).json({
          message: err.message || "Error retrieving that Role"
        });
      });
  };

  async findAllRoles(req, res) {
    Role.findAll()
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(500).json({
          message:
            err.message || "Some error occurred while retrieving Roles."
        });
      });
  };

  async updateRole(req, res) {
    try {
      const id = req.params.id;
      const updatedRole = await Role.update(req.body, {
        where: { id: id },
        returning: true
      });
      if (updatedRole[1].length) {
        res.status(200).json({
          message: "Role updated successfully.",
          data: updatedRole[1][0]
        });
      } else {
        res.status(404).json({
          error: `Role with the ${id} does not exist`
        });
      }
    } catch (error) {
      res.status(500).json({
        error: "Oops, something went wrong"
      });
    }
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
export default RoleController;