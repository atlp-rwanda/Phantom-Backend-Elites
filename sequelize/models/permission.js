const { Model } = require('sequelize');

module.exports = function (sequelize, DataTypes) {
  class Permission extends Model {
    static associate(models) {
      Permission.belongsTo(models.Role, {
        foreignKey: 'assignedId',
        as: 'assigned',
        onDelete: 'CASCADE',
      });
    }
  }
  Permission.init({
    assignedId: DataTypes.INTEGER,
    name: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    roleName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Permission',
    timestamps: false,
  });
  return Permission;
};
