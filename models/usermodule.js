"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserModule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Module }) {
      // define association here
      this.belongsTo(User, {
        foreignKey: "userId",
        hooks: true,
      });
      this.belongsTo(Module, {
        foreignKey: "moduleId",
        as: 'module'
      });
    }
  }
  UserModule.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      moduleId: {
        type: DataTypes.UUID
      },
      userId: {
        type: DataTypes.UUID
      },
      dateCreated: {
        allowNull: false,
        type: DataTypes.DATE
      },
      dateUpdated: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      modelName: "UserModule",
      tableName: "userModules",
      updatedAt: "dateUpdated",
      createdAt: "dateCreated",
      schema: "wms",
      timestamps: true
    }
  );
  return UserModule;
};
