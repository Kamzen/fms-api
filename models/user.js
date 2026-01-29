"use strict";
const { Model, UUIDV4 } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Department, Role, UserModule }) {
      // define association here
      this.belongsTo(Department, {
        foreignKey: "departmentId",
        onDelete: "CASCADE",
        hooks: true,
        as: "department"
      });

      this.belongsTo(Role, {
        foreignKey: "roleId",
        onDelete: "CASCADE",
        hooks: true,
        as: "role"
      });

      this.hasMany(UserModule, {
        foreignKey: "userId",
        as: "userModules"
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      fullName: {
        type: DataTypes.STRING
      },
      userName: {
        type: DataTypes.STRING,
        unique: true
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          min: {
            args: [10],
            msg: "Minimum 10 characters required for password"
          }
        }
      },
      userType: {
        type: DataTypes.STRING
        // allowNull: false
      },
      departmentId: {
        type: DataTypes.UUID
        // allowNull: false,
      },
      roleId: {
        type: DataTypes.UUID
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      modelName: "User",
      schema: "wms",
      timestamps: true,
      tableName: "users"
    }
  );
  return User;
};
