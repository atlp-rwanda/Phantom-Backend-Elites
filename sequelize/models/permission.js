const  {Model} = require("sequelize") 
module.exports = function (sequelize, DataTypes){
  class Permission extends Model {
    static associate(models) {
      Permission.belongsTo(models.Role, {
        foreignKey: 'assignedId',
        as: 'assigned',
        onDelete: 'CASCADE',
      })
    }
  }
  Permission.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Permission already exists',
      },
    },
    assignedId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Permission',
    timestamps: false,
  });
  return Permission;
};
