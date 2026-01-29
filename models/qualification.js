"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Qualification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ PositionQualification }) {
      // define association here

      this.hasMany(PositionQualification, {
        foreignKey: "qualificationId"
      });
    }
  }
  Qualification.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      qualificationName: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      qualificationLevel: {
        type: DataTypes.TEXT,
        allowNull: false
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
      modelName: "Qualification",
      schema: "wms",
      tableName: "qualifications"
    }
  );
  return Qualification;
};
