const  {Model} = require("sequelize") 
module.exports = function (sequelize, DataTypes){
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
