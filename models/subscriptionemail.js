"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SubscriptionEmail extends Model {
    static associate(models) {
      // define association here (none currently)
    }
  }
  SubscriptionEmail.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      status: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "active"
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
      modelName: "SubscriptionEmail",
      schema: "wms",
      tableName: "subscibedEmails",
      timestamps: true
    }
  );
  return SubscriptionEmail;
};
