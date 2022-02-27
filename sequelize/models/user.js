"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      dateofbirth: DataTypes.STRING,
      gender: DataTypes.STRING,
      address: DataTypes.STRING,
     
    },
    {
      sequelize,
      modelName: "User",
    });
    User.prototype.hasRole = async function hasRole(role) {
      if (!role || role === 'undefined') {
        return false;
      }
      const roles = await this.getRoles();
      return !!roles.map(({ name }) => name)
          .includes(role);
    };
  
    User.prototype.hasPermission = async function hasPermission(permission) {
      if (!permission || permission === 'undefined') {
        return false;
      }
      const permissions = await this.getPermissions();
      return !!permissions.map(({ name }) => name)
          .includes(permission.name);
    };
  
    User.prototype.hasPermissionThroughRole = async function hasPermissionThroughRole(permission) {
      if (!permission || permission === 'undefined') {
        return false;
      }
      const roles = await this.getRoles();
      for await (const item of permission.roles) {
        if (roles.filter(role => role.name === item.name).length > 0) {
          return true;
        }
      }
      return false;
    };
  
    User.prototype.hasPermissionTo = async function hasPermissionTo(permission) {
      if (!permission || permission === 'undefined') {
        return false;
      }
      return await this.hasPermissionThroughRole(permission) || this.hasPermission(permission);
    };
  
  return User;
};
