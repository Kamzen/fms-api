"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LLEvent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  LLEvent.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      serviceProvider: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      topic: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      trainingDates: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: []
      },
      registrationLink: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
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
      modelName: "LLEvent",
      schema: "wms",
      tableName: "llEvents",
      timestamps: true
    }
  );
  return LLEvent;
};
