const  {Model} = require("sequelize") 
module.exports = function (sequelize, DataTypes){
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
