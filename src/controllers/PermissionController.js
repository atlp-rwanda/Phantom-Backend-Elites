import Permission from '../../sequelize/models'
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
    const { assignedId, name } = req.body
   
      const newPermission = await Permission.create({ assignedId, name })
      console.log(newPermission)
      return res.status(201).json({
        message: "Permission created successfully",
        data: newPermission
      })
  
    // catch(error){
    //   res.status(500).json({
    //     error: "Some error occurred while creating the Permission."
    //   });
    // }
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
export default PermissionController 
 