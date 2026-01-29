"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ResearchReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ResearchReport.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      documentTitle: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      documentDesc: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      year: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      researchReportFileURL: {
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
      modelName: "ResearchReport",
      tableName: "researchReports",
      schema: "wms",
      timestamps: true
    }
  );
  return ResearchReport;
};
