import {Permission, Role} from '../../sequelize/models'
class PermissionController{
    async findOnePermission(req, res) {
        const id = req.params.id;
        await Permission.findOne({where: { id: id }})
          .then(data => {
              res.status(201).json({message: 'Permission created successfully!',data}); })
          .catch(err => {
            res.status(500).json({
              message: "Error retrieving Permission with id=" + id
            });
          });
    };

  async createPermission(req, res) {
    console.log(req.body);
    try {
      const { assignedId, name } = req.body
      
      const permission = await Permission.findOne({where: {assignedId}})
      const role = await Role.findOne({where: {id: assignedId}})

      if(permission) return res.status(409).json({message: `This role (${role.dataValues.name}) is already asigned permissions`})
        
      const newPermission = await Permission.create({ assignedId, name })
        return res.status(201).json({
          message: "Permission created successfully",
          data: newPermission
        })
    } catch (error) {
      console.log(error);
    }
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
  try {
    const id = req.params.id;
    const updatedPermission = await Permission.update(req.body, {
      where: { id: id },
      returning: true
    });
    if (updatedPermission[1].length) {
      res.status(200).json({
        message: "Permission updated successfully.",
        data: updatedPermission[1][0]
      });
    } else {
      res.status(404).json({
        error: `Permission with the ${id} does not exist`
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Oops, something went wrong"
    });
  }
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
export default PermissionController 
 