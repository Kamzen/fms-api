"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GrantWindowApplication extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  GrantWindowApplication.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      grantType: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      closingDate: {
        allowNull: false,
        type: DataTypes.DATE
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
      modelName: "GrantWindowApplication",
      tableName: "grantWindowApplications",
      timestamps: true,
      schema: 'wms'
    }
  );
  return GrantWindowApplication;
};
