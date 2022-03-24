const  {Model} = require("sequelize") 
module.exports = function (sequelize, DataTypes){
  class Role extends Model {
    static associate(models) {
      Role.hasMany(models.User, {
        foreignKey: 'roleId',
        as: 'role',
        onDelete: 'CASCADE',
    })
    Role.hasMany(models.Permission, {
      foreignKey: 'assignedId',
      as: 'assigned',
      onDelete: 'CASCADE',
  })
  }}
  Role.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Role',
    timestamps: false,
  });
  return Role;
};
